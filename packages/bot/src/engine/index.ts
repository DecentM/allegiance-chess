import {
  Board,
  BoardSquare,
  PieceAllegiance,
  allegianceSide,
} from '@decentm/allegiance-chess-core'

import seedrandom from 'seedrandom'

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

  return isPure ? points : points / 2
}

export const getBoardScore = (board: Board) => {
  const squares = board.getSquares().filter(Boolean)

  const piecesScore = squares.reduce((acc, cur) => {
    const finalPoints = getSquareScore(cur)
    const side = allegianceSide(cur.allegiance)

    return side === 'white' ? acc + finalPoints : acc - finalPoints
  }, 0)

  let finalScore = piecesScore

  if (board.castlingRights.white.includes('king')) finalScore += 4
  if (board.castlingRights.white.includes('queen')) finalScore += 5

  if (board.castlingRights.black.includes('king')) finalScore -= 4
  if (board.castlingRights.black.includes('queen')) finalScore -= 5

  if (board.activeColour === 'white') finalScore -= board.halfmoveClock / 10
  else finalScore += board.halfmoveClock / 10

  return finalScore
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
    const virtualBoard = board.clone()

    virtualBoard.executeNode(move)

    let score = 0
    const timeout = performance.now() - startTime > timeoutMs
    const maxDepth = depth <= 0

    if (timeout) {
      score = -getBoardScore(virtualBoard)
    } else if (!maxDepth) {
      const subResult = findBestMove(
        virtualBoard,
        timeoutMs,
        depth - 1,
        seed,
        startTime,
        rng
      )

      score = subResult.score
    }

    const existingIndexes = scores.get(score)
    scores.set(score, existingIndexes ? [...existingIndexes, i] : [i])
  }

  const scoresAsc = [...scores.entries()].sort()

  const [score, indexes] =
    board.activeColour === 'white' ? scoresAsc.at(-1) : scoresAsc.at(0)

  const index = indexes.at(Math.floor(rng() * indexes.length))

  return {
    score,
    index,
    seed,
  }
}
