import {
  AfenPreset,
  Board,
  BoardSquare,
  Notation,
  PieceAllegiance,
} from '@decentm/allegiance-chess-core'

import seedrandom from 'seedrandom'

// import * as Opening from './openings'

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

type TranspositionTable = Map<string, SearchResult>

const TRANSPOSITION_TABLE_LIMIT = 10240

export class Bot {
  private transpositionTable: TranspositionTable = new Map()

  public readonly board: Board

  constructor() {
    this.board = new Board()
    this.board.importAFEN(AfenPreset.VanillaDefault)
  }

  private pruneTranspositionTable() {
    this.transpositionTable = new Map(
      [...this.transpositionTable].slice(-TRANSPOSITION_TABLE_LIMIT)
    )
  }

  public findBestMove(
    depth: number,
    seed = String(Math.random()),
    rng = seedrandom(seed),
    maxDepth = depth
  ) {
    return this._findBestMove(this.board, depth, seed, rng, maxDepth)
  }

  private _findBestMove = (
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
      let path = Notation.writeNode(move)

      // if (depth !== maxDepth && move.kind === 'game-over') {
      //   if (move.outcome === 'black') {
      //     scores.set(Number.NEGATIVE_INFINITY, [i, path])
      //     break
      //   }

      //   if (move.outcome === 'white') {
      //     scores.set(Number.POSITIVE_INFINITY, [i, path])
      //     break
      //   }

      //   scores.set(
      //     board.activeColour === 'white'
      //       ? Number.NEGATIVE_INFINITY
      //       : Number.POSITIVE_INFINITY,
      //     [i, path]
      //   )
      //   break
      // }

      if (move.kind !== 'move') {
        continue
      }

      const virtualBoard = board.clone()

      virtualBoard.executeNode(move)

      // Default jitter to avoid playing the same moves every game
      let score = rng() - 0.5

      // Prefer to play known openings
      // if (depth === maxDepth) {
      //   const openings = Opening.getNamesByFen(
      //     virtualBoard.toAFEN({ sections: ['positions'] })
      //   )

      //   if (openings.length > 0) {
      //     score += board.activeColour === 'white' ? score + 25 : score - 25

      //     // scores.set(score, [i, path])

      //     return {
      //       score,
      //       index: i,
      //       seed,
      //       path,
      //     }

      //     break
      //   }
      // }

      const reachedMaxDepth = depth <= 0

      // If we're at max depth, take the evaluation of the board as is
      if (reachedMaxDepth) {
        score = Math.max(score, getBoardScore(virtualBoard))
      } else {
        const virtualBoardAFEN = virtualBoard.toAFEN({
          sections: ['positions'],
        })

        let subResult = this.transpositionTable.get(virtualBoardAFEN)

        if (!subResult) {
          subResult = this._findBestMove(
            virtualBoard,
            depth - 1,
            seed,
            rng,
            maxDepth
          )

          this.transpositionTable.set(virtualBoardAFEN, subResult)
        }

        path = `${path},${subResult.path}`

        score = Math.max(score, subResult.score)
      }

      scores.set(score, [i, path])
    }

    const scoresAsc = [...scores].sort((a, b) => a[0] - b[0])

    if (scoresAsc.length === 0) {
      throw new Error('No moves found!')
    }

    try {
      const [score, [index, path]] = scoresAsc.at(
        board.activeColour === 'white' ? -1 : 0
      )

      const result: SearchResult = {
        score,
        index,
        seed,
        path,
      }

      this.transpositionTable.set(
        board.toAFEN({ sections: ['positions'] }),
        result
      )

      if (this.transpositionTable.size > TRANSPOSITION_TABLE_LIMIT) {
        this.pruneTranspositionTable()
      }

      return result
    } catch (error) {
      console.log(scoresAsc)
      console.error(error)
      return
    }
  }
}
