<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { AfenPreset, Board, Notation } from '@decentm/allegiance-chess-core'

import ChessBoard from '../../components/chess-board.vue'
import GameSidebar from '../../components/game-sidebar.vue'
import GameOverDialog from '../../components/game-over-dialog.vue'

import { computed } from 'vue'
import { Hex } from '../../lib/hex'
import { useQuasar } from 'quasar'
import { useBoardAudio } from '../../hooks/board-audio'
import { useGameover } from '../../hooks/game-over'

const route = useRoute()
const router = useRouter()

const afen = computed(() => {
  const hex = Array.isArray(route.params.state)
    ? route.params.state[0]
    : route.params.state

  if (!hex) {
    return AfenPreset.VanillaDefault
  }

  return Hex.hexToUtf8(hex)
})

const moveHistory = computed(() => {
  const hex = Array.isArray(route.params.history)
    ? route.params.history[0]
    : route.params.history

  if (!hex) {
    return ''
  }

  return Hex.hexToUtf8(hex)
})

const board = computed(() => {
  const b = new Board()

  if (afen.value) b.importAFEN(afen.value)
  if (moveHistory.value) b.importMoveHistory(moveHistory.value)

  return b
})

const audio = useBoardAudio()

const handleExecuteNode = (node: Partial<Notation.Node>) => {
  const index = board.value.findMoveIndex(node)

  if (index === -1) {
    return
  }

  board.value.executeMoveIndex(index)

  audio?.playNode(node)

  router.push({
    path: `/play/pen-pal/${Hex.utf8ToHex(board.value.toAFEN())}/${Hex.utf8ToHex(
      board.value.getMoveHistory()
    )}`,
  })
}

const { gameOver } = useGameover(board)

const q = useQuasar()

const size = computed(() => {
  let result = q.screen.width

  if (q.screen.gt.xs) {
    result = q.screen.width - 65
  }

  if (q.screen.gt.sm) {
    result = q.screen.sizes.sm
  }

  if (q.screen.gt.md) {
    result = q.screen.sizes.md - 265
  }

  if (q.screen.gt.lg) {
    result = q.screen.sizes.lg - 265
  }

  return Math.min(result, q.screen.height)
})
</script>

<template>
  <q-card flat class="full-width">
    <q-card-section
      :horizontal="q.screen.gt.sm"
      :class="{ 'q-px-none': q.screen.lt.sm }"
    >
      <q-card-section
        :style="{ width: `${size}px` }"
        :class="{ 'q-px-none': q.screen.lt.sm }"
      >
        <chess-board
          @execute-node="handleExecuteNode"
          :board="board"
          :perspective="board.activeColour"
          :play-as="['white', 'black']"
          :width="size"
          :rounded-borders="q.screen.gt.xs"
        />
      </q-card-section>

      <q-card-section class="q-mb-md full-width">
        <game-sidebar
          :move-history="board.getMoveHistoryAst()"
          :active-colour="board.activeColour"
          :own-colour="board.activeColour"
          :afen="board.toAFEN()"
        />
      </q-card-section>
    </q-card-section>

    <game-over-dialog v-if="gameOver" :node="gameOver" />
  </q-card>
</template>
