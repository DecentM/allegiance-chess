import { Board } from '@decentm/allegiance-chess-core'

export const findBestMove = (board: Board, maxDepth: number) => {
  if (maxDepth <= 0) {
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

    const subResult = findBestMove(virtualBoard, maxDepth - 1)

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
