<script setup lang="ts">
import { computed, onBeforeUnmount } from 'vue'
import { Board, Notation } from '@decentm/allegiance-chess-core'
import { useQuasar } from 'quasar'

import ChessBoard from '../../components/chess-board.vue'
import GameSidebar from '../../components/game-sidebar.vue'

import { ChessRtcConnection } from '../../hooks/chess-rtc-connection'

const props = defineProps<{
  connection: ChessRtcConnection
}>()

onBeforeUnmount(() => {
  props.connection.disconnect()
})

const board = computed(() => {
  const result = new Board()

  result.importAFEN(props.connection.boardAFEN.value)
  result.importMoveHistory(props.connection.moveHistory.value)

  return result
})

const handleExecuteNode = (node: Partial<Notation.Node>) => {
  const index = board.value.findMoveIndex(node)

  if (index === -1) {
    return
  }

  props.connection.sendMessage({
    type: 'execute-node-index',
    value: index,
  })
}

const q = useQuasar()

const padding = 200

const size = computed(() => {
  let result = q.screen.width

  if (q.screen.gt.sm) {
    result = q.screen.sizes.sm
  }

  if (q.screen.gt.md) {
    result = q.screen.sizes.md - padding
  }

  if (q.screen.gt.lg) {
    result = q.screen.sizes.lg - padding
  }

  return Math.min(result - 75, q.screen.height - 75)
})

const perspective = computed(() => {
  if (!props.connection.serverSide.value) {
    return null
  }

  if (props.connection.mode.value === 'server') {
    return props.connection.serverSide.value
  }

  return props.connection.serverSide.value === 'white' ? 'black' : 'white'
})
</script>

<template>
  <q-card flat class="full-width">
    <q-card-section :horizontal="q.screen.gt.sm">
      <q-card-section :style="{ width: `${size}px` }">
        <chess-board
          :model-value="connection.boardAFEN.value"
          :width="size"
          @execute-node="handleExecuteNode"
          :board="board"
          :perspective="perspective ?? 'white'"
          :play-as="['white', 'black']"
        />
      </q-card-section>

      <q-card-section class="q-mb-md full-width">
        <game-sidebar
          :move-history="board.getMoveHistoryAst()"
          :active-colour="board.activeColour"
          :own-colour="perspective ?? 'white'"
          :afen="connection.boardAFEN.value"
        />
      </q-card-section>
    </q-card-section>
  </q-card>
</template>
