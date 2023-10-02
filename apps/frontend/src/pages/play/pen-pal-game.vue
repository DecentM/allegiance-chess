<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { Board, Notation } from '@decentm/allegiance-chess-core'

import ChessBoard from '../../components/chess-board.vue'
import GameSidebar from '../../components/game-sidebar.vue'

import { computed } from 'vue'
import { Hex } from '../../lib/hex'
import { FenPreset } from '../../lib/boards'
import { useQuasar } from 'quasar'
import { useBoardAudio } from '../../hooks/board-audio'

const route = useRoute()
const router = useRouter()

const afen = computed(() => {
  const hex = Array.isArray(route.params.state)
    ? route.params.state[0]
    : route.params.state

  if (!hex) {
    return FenPreset.VanillaDefault
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

  b.importAFEN(afen.value)
  b.importMoveHistory(moveHistory.value)

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

const q = useQuasar()

const padding = 200

const size = computed(() => {
  if (q.screen.gt.lg) {
    return q.screen.sizes.lg - padding
  }

  if (q.screen.gt.md) {
    return q.screen.sizes.md - padding
  }

  if (q.screen.gt.sm) {
    return q.screen.sizes.sm - padding
  }

  return q.screen.width - padding - 150
})
</script>

<template>
  <q-card flat class="full-width">
    <q-card-section :horizontal="q.screen.gt.sm">
      <q-card-section :style="{ width: `${size}px` }">
        <chess-board
          @execute-node="handleExecuteNode"
          :board="board"
          :perspective="board.activeColour"
          :play-as="['white', 'black']"
          :width="size"
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
  </q-card>
</template>
