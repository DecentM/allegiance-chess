import {
  Board,
  BoardSquare,
  Notation,
  PieceAllegiance,
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

  return isPure ? points * 1.5 : points
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

export const findBestMove = (
  board: Board,
  depth: number,
  seed = String(Math.random()),
  startTime = performance.now(),
  rng = seedrandom(seed),
  maxDepth = depth
) => {
  const moves = board.getValidMoves()

  // score, [index, path]
  const scores = new Map<number, [number, string]>()

  for (let i = 0; i < moves.length; i++) {
    const move = moves[i]

    if (move.kind !== 'move') {
      continue
    }

    const virtualBoard = board.clone()

    virtualBoard.executeNode(move)

    let score = rng() - 0.5

    let path = Notation.writeNode(move)

    if (depth === maxDepth) {
      const openings = Opening.getNamesByFen(
        virtualBoard.toAFEN({ sections: ['positions'] })
      )

      if (openings.length > 0) {
        score -=
          (virtualBoard.activeColour === 'white'
            ? openings.length
            : -openings.length) * 25

        scores.set(score, [i, path])
        break
      }
    }

    // const timeout = performance.now() - startTime > timeoutMs
    const reachedMaxDepth = depth <= 0

    if (reachedMaxDepth) {
      score -= getBoardScore(virtualBoard)
    } else {
      const subResult = findBestMove(
        virtualBoard,
        depth - 1,
        seed,
        startTime,
        rng,
        maxDepth
      )

      score -= subResult.score
      path = `${path} > ${subResult.path}`
    }

    scores.set(score, [i, path])
  }

  const scoresAsc = [...scores].sort((a, b) => a[0] - b[0])

  if (depth === 3) {
    console.clear()
    console.log(
      scoresAsc
        .map(([score, [index, path]]) => {
          const move = moves[index]

          return `${Notation.writeNode(move)} ${score.toPrecision(4)} - ${path}`
        })
        .join('\n')
    )
  }

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

  const [score, [index, path]] = scoresAsc[0]

  return {
    score,
    index,
    seed,
    path,
  }
}
