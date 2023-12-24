import {
  Board,
  BoardSquare,
  Notation,
  PieceAllegiance,
} from '@decentm/allegiance-chess-core'

import seedrandom from 'seedrandom'

import * as Opening from './openings'

const getSquareScore = (square: BoardSquare): number => {
  let points = 0

  switch (square.piece) {
    case null:
      points = 1
      break

    case 'N':
    case 'B':
      points = 3
      break

    case 'R':
      points = 5
      break

    case 'Q':
      points = 9
      break
  }

  return points
}

export const getBoardScore = (board: Board) => {
  const squares = board.getSquares().filter(Boolean)
  let score = 0

  score += squares.reduce((acc, cur) => {
    const squareMaterial = getSquareScore(cur)

    let offset = 0

    if (cur.allegiance === PieceAllegiance.Black) offset -= 1.5
    if (cur.allegiance === PieceAllegiance.DarkGrey) offset -= 1
    if (cur.allegiance === PieceAllegiance.LightGrey) offset += 1
    if (cur.allegiance === PieceAllegiance.White) offset += 1.5

    return acc + squareMaterial * offset
  }, 0)

  if (board.castlingRights.white.includes('king')) score += 4
  if (board.castlingRights.white.includes('queen')) score += 5

  if (board.castlingRights.black.includes('king')) score -= 4
  if (board.castlingRights.black.includes('queen')) score -= 5

  if (board.activeColour === 'white') score -= board.halfmoveClock / 10
  else score += board.halfmoveClock / 10

  return score
}

type SearchResult = {
  score: number
  index: number
  seed: string
  path?: string
}

export type TranspositionTable = Map<string, SearchResult>

let transpositionTable: TranspositionTable = new Map()

const TRANSPOSITION_TABLE_LIMIT = 10240

const pruneTranspositionTable = () => {
  transpositionTable = new Map(
    [...transpositionTable].slice(-TRANSPOSITION_TABLE_LIMIT)
  )
}

export const findBestMove = (
  board: Board,
  depth: number,
  seed = String(Math.random()),
  rng = seedrandom(seed),
  maxDepth = depth
): SearchResult => {
  const moves = board.getValidMoves()

  // score, [index, path]
  const scores = new Map<number, [number, string]>()

  for (let i = 0; i < moves.length; i++) {
    const move = moves[i]

    if (depth !== maxDepth && move.kind === 'game-over') {
      if (move.outcome === 'black') {
        return {
          score: Number.NEGATIVE_INFINITY,
          index: -1,
          seed,
        }
      }

      if (move.outcome === 'white') {
        return {
          score: Number.POSITIVE_INFINITY,
          index: -1,
          seed,
        }
      }

      return {
        score:
          board.activeColour === 'white'
            ? Number.NEGATIVE_INFINITY
            : Number.POSITIVE_INFINITY,
        index: -1,
        seed,
      }
    }

    if (move.kind !== 'move') {
      continue
    }

    const virtualBoard = board.clone()

    virtualBoard.executeNode(move)

    // Default jitter to avoid playing the same moves every game
    let score = rng() - 0.5
    let path = Notation.writeNode(move)

    // Prefer to play known openings
    if (depth === maxDepth) {
      const openings = Opening.getNamesByFen(
        virtualBoard.toAFEN({ sections: ['positions'] })
      )

      if (openings.length > 0) {
        score += board.activeColour === 'white' ? score + 25 : score - 25

        scores.set(score, [i, path])
        break
      }
    }

    const reachedMaxDepth = depth <= 0

    if (reachedMaxDepth) {
      score += getBoardScore(virtualBoard)
    } else {
      const virtualBoardAFEN = virtualBoard.toAFEN({ sections: ['positions'] })

      let subResult = transpositionTable.get(virtualBoardAFEN)

      if (!subResult) {
        subResult = findBestMove(virtualBoard, depth - 1, seed, rng, maxDepth)

        transpositionTable.set(virtualBoardAFEN, subResult)
      }

      path = `${path},${subResult.path}`

      // If the score difference is large enough, we don't explore that path
      // anymore. This prevents some gambits, but it's much faster.
      const diff = Math.abs(score - subResult.score)

      if (diff > 10) {
        score = subResult.score
        continue
      }

      score = Math.max(score, subResult.score)
    }

    scores.set(score, [i, path])
  }

  const scoresAsc =
    board.activeColour === 'white'
      ? [...scores].sort((a, b) => b[0] - a[0])
      : [...scores].sort((a, b) => a[0] - b[0])

  const [score, [index, path]] = scoresAsc[0]

  const result: SearchResult = {
    score,
    index,
    seed,
    path,
  }

  transpositionTable.set(board.toAFEN({ sections: ['positions'] }), result)

  if (transpositionTable.size > TRANSPOSITION_TABLE_LIMIT) {
    pruneTranspositionTable()
  }

  return result
}
