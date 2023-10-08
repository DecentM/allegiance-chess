import {
  Board,
  BoardSquare,
  PieceAllegiance,
  allegianceSide,
} from '@decentm/allegiance-chess-core'

import seedrandom from 'seedrandom'

import * as Opening from './openings'

const getSquareScore = (square: BoardSquare): number => {
  const isPure =
    square.allegiance === PieceAllegiance.Black ||
    square.allegiance === PieceAllegiance.White

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

  return isPure ? points : points / 1.5
}

export const getBoardScore = (board: Board) => {
  const squares = board.getSquares().filter(Boolean)
  let score = 0

  score += squares.reduce((acc, cur) => {
    const squareMaterial = getSquareScore(cur)
    const side = allegianceSide(cur.allegiance)

    return side === 'white' ? acc + squareMaterial : acc - squareMaterial
  }, 0)

  score += squares.reduce((acc, cur) => {
    const isCentered =
      cur.file > 2 && cur.file < 7 && cur.rank > 2 && cur.rank < 7

    if (!isCentered) {
      return acc
    }

    const side = allegianceSide(cur.allegiance)

    return side === 'white' ? acc + 1 : acc - 1
  }, 0)

  if (board.castlingRights.white.includes('king')) score += 4
  if (board.castlingRights.white.includes('queen')) score += 5

  if (board.castlingRights.black.includes('king')) score -= 4
  if (board.castlingRights.black.includes('queen')) score -= 5

  if (board.activeColour === 'white') score -= board.halfmoveClock / 10
  else score += board.halfmoveClock / 10

  // Kings should prefer to be on their initial rank
  const whiteKing = squares.find(
    (square) =>
      square.piece === 'K' && allegianceSide(square.allegiance) === 'white'
  )
  const blackKing = squares.find(
    (square) =>
      square.piece === 'K' && allegianceSide(square.allegiance) === 'black'
  )

  if (whiteKing && whiteKing.rank === 1) score += 15
  if (blackKing && blackKing.rank === 1) score -= 15

  return score
}

const SCORE_PRUNE_LIMIT = -1

export const findBestMove = (
  board: Board,
  timeoutMs: number,
  depth: number,
  seed = String(Math.random()),
  startTime = performance.now(),
  rng = seedrandom(seed)
) => {
  const moves = board.getValidMoves()

  // score, index
  const scores = new Map<number, number[]>()

  for (let i = 0; i < moves.length; i++) {
    const move = moves[i]

    if (move.kind !== 'move') {
      continue
    }

    const virtualBoard = board.clone()

    virtualBoard.executeNode(move)

    let score = 0

    const isOpening = Opening.fenExists(
      virtualBoard.toAFEN({ sections: ['positions'] })
    )

    if (isOpening) {
      score =
        virtualBoard.activeColour === 'white'
          ? Number.NEGATIVE_INFINITY
          : Number.POSITIVE_INFINITY

      const existingIndexes = scores.get(score)
      scores.set(score, existingIndexes ? [...existingIndexes, i] : [i])
      break
    }

    const timeout = performance.now() - startTime > timeoutMs
    const maxDepth = depth <= 0

    if (maxDepth && !timeout) {
      score =
        virtualBoard.activeColour === 'white'
          ? -getBoardScore(virtualBoard)
          : getBoardScore(virtualBoard)
    } else if (!timeout) {
      const subResult = findBestMove(
        virtualBoard,
        timeoutMs,
        depth - 1,
        seed,
        startTime,
        rng
      )

      score =
        virtualBoard.activeColour === 'white'
          ? score + subResult.score
          : score - subResult.score
    }

    const existingIndexes = scores.get(score)
    scores.set(score, existingIndexes ? [...existingIndexes, i] : [i])
  }

  const scoresAsc = [...scores.entries()].sort()

  if (scoresAsc.length === 0) {
    return {
      score:
        board.activeColour === 'white'
          ? Number.NEGATIVE_INFINITY
          : Number.POSITIVE_INFINITY,
      index: -1,
      seed,
    }
  }

  const [score, indexes] =
    board.activeColour === 'white'
      ? scoresAsc[scoresAsc.length - 1]
      : scoresAsc[0]

  const index = indexes[Math.floor(rng() * indexes.length)]

  return {
    score,
    index,
    seed,
  }
}
