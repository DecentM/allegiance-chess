import { Board } from '@decentm/allegiance-chess-core'
import { Ref, computed } from 'vue'

export const useGameover = (board: Ref<Board>) => {
  const gameOver = computed(() => {
    const validMoves = board.value.getValidMoves()

    if (validMoves.length !== 1) {
      return null
    }

    const move = validMoves[0]

    if (!move || move.kind !== 'game-over') {
      return null
    }

    return move
  })

  return { gameOver }
}
