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

  return isPure ? points * 2 : points
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

  if (board.halfmoveClock > 50) {
    finalScore -= 10
  }

  return finalScore
}

export const findBestMove = (
  board: Board,
  maxDepth: number,
  seed = String(Math.random())
) => {
  if (maxDepth <= 0) {
    return null
  }

  const moves = board.getValidMoves()
  const rng = seedrandom(seed)

  // score, index
  const scores = new Map<number, number[]>()

  for (let i = 0; i < moves.length; i++) {
    const move = moves[i]
    const virtualBoard = board.clone()

    virtualBoard.executeNode(move)

    let score = getBoardScore(virtualBoard)

    if (score > 0) {
      const subResult = findBestMove(virtualBoard, maxDepth - 1, seed)

      if (subResult) score -= subResult.score
    }

    const existingIndexes = scores.get(score)
    scores.set(score, existingIndexes ? [...existingIndexes, i] : [i])
  }

  const scoresAsc = [...scores.entries()].sort()

  const [score, indexes] = scoresAsc.at(-1)

  const index = indexes.at(Math.floor(rng() * indexes.length))

  return {
    score,
    index,
    seed,
  }
}
