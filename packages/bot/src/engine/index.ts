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

const getBoardScore = (board: Board) => {
  const squares = board.getSquares()

  return squares.reduce((acc, cur) => {
    if (!cur) {
      return acc
    }

    const finalPoints = getSquareScore(cur)
    const side = allegianceSide(cur.allegiance)

    return side === board.activeColour ? acc + finalPoints : acc - finalPoints
  }, 0)
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

    const subResult = findBestMove(virtualBoard, maxDepth - 1, seed)

    if (subResult) score -= subResult.score

    if (move.kind === 'game-over') {
      if (move.outcome === 'draw') score = Number.NEGATIVE_INFINITY
      if (move.outcome === 'white' && virtualBoard.activeColour === 'white')
        score = Number.POSITIVE_INFINITY
      if (move.outcome === 'black' && virtualBoard.activeColour === 'black')
        score = Number.POSITIVE_INFINITY
    }

    if (move.kind === 'move') {
      const toSquare = virtualBoard.getSquare(move.to)
      const fromSquare = virtualBoard.getSquare(move.to)

      if (move.type === 'allegiance' || move.type === 'capture') {
        score += getSquareScore(toSquare)
      }

      if (move.type === 'promotion') {
        score +=
          getSquareScore({
            allegiance: fromSquare.allegiance,
            piece: move.promotionTo,
          }) - getSquareScore(fromSquare)
      }
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
