import { Board } from '@decentm/allegiance-chess-core'

export const MAX_DEPTH = 2

export const findBestMove = (board: Board, level = 0) => {
  if (level > MAX_DEPTH) {
    return null
  }

  const moves = board.getValidMoves()

  // score, index
  const scores = new Map<number, number>()

  for (let i = 0; i < moves.length; i++) {
    const move = moves[i]
    const virtualBoard = board.clone()

    virtualBoard.executeNode(move)

    let score = virtualBoard.getScore()
    const subResult = findBestMove(virtualBoard, level + 1)

    if (subResult) score -= subResult.score

    scores.set(score, i)
  }

  const scoresAsc = [...scores.entries()].sort()

  const [score, index] = scoresAsc.at(-1)

  return {
    score,
    index,
  }
}
