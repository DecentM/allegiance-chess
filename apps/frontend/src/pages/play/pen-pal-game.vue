<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { computed, onMounted, watch } from 'vue'
import { useQuasar } from 'quasar'

import GameLayout from '../../components/game-layout.vue'

import ChessBoard from '../../components/chess-board.vue'
import GameSidebar from '../../components/game-sidebar.vue'
import GameOverDialog from '../../components/game-over-dialog.vue'

import { Hex } from '../../lib/hex'
import { useBoardWorker } from '../../hooks/board-worker'

const route = useRoute()
const router = useRouter()

const board = useBoardWorker({
  autoplayFor: [],
})

const state = computed<{ afen: string; history: string }>(() => {
  try {
    const result = Array.isArray(route.params.state)
      ? route.params.state[0]
      : route.params.state

    return JSON.parse(Hex.hexToUtf8(result))
  } catch {
    return {
      afen: '',
      history: '',
    }
  }
})

onMounted(() => {
  board.reset()

  if (state.value.afen) board.importAfen(state.value.afen)
  if (state.value.history) board.importMoveHistory(state.value.history)
})

const handleExecuteNodeIndex = (index: number) => {
  board.executeMoveIndex(index)
}

watch(board.loading, (newLoading) => {
  if (newLoading) {
    return
  }

  router.push({
    path: `/play/pen-pal/${Hex.utf8ToHex(
      JSON.stringify({
        afen: board.afen.value,
        history: board.moveHistory.value,
      })
    )}`,
  })
})

const q = useQuasar()
</script>

<template>
  <game-layout>
    <template #board>
      <chess-board
        @execute-node-index="handleExecuteNodeIndex"
        :board="board"
        :perspective="board.activeColour.value"
        :active-colour="board.activeColour.value"
        :check-moves="board.checkMoves.value"
        :en-passant-target="board.enPassantTarget.value"
        :move-history-ast="board.moveHistoryAst.value"
        :squares="board.squares.value"
        :valid-moves="board.validMoves.value"
        :play-as="['white', 'black']"
        :rounded-borders="q.screen.gt.xs"
        :loading="board.loading.value"
      />
    </template>

    <template #sidebar>
      <game-sidebar
        :move-history="board.moveHistoryAst.value"
        :active-colour="board.activeColour.value"
        :own-colour="board.activeColour.value"
        :afen="board.afen.value"
        :game-over="board.gameOver.value"
      />
    </template>

    <template #default>
      <game-over-dialog
        v-if="board.gameOver.value"
        :node="board.gameOver.value"
      />
    </template>
  </game-layout>
</template>
