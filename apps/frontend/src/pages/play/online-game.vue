<script setup lang="ts">
import { computed, onBeforeUnmount } from 'vue'
import { Board } from '@decentm/allegiance-chess-core'
import { useQuasar } from 'quasar'

import ChessBoard from '../../components/chess-board.vue'
import GameSidebar from '../../components/game-sidebar.vue'
import GameOverDialog from '../../components/game-over-dialog.vue'

import { ChessRtcConnection } from '../../hooks/chess-rtc-connection'
import { useBoardSize } from '../../hooks/board-size'
import { useGameover } from '../../hooks/game-over'

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

const handleExecuteNodeIndex = (index: number) => {
  props.connection.sendMessage({
    type: 'execute-node-index',
    value: index,
  })
}

const q = useQuasar()
const size = useBoardSize()
const { gameOver } = useGameover(board)

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
    <q-card-section
      :horizontal="q.screen.gt.sm"
      :class="{ 'q-px-none': q.screen.lt.sm }"
    >
      <q-card-section
        :style="{ width: `${size}px` }"
        :class="{ 'q-px-none': q.screen.lt.sm }"
      >
        <chess-board
          :model-value="connection.boardAFEN.value"
          :width="size"
          @execute-node-index="handleExecuteNodeIndex"
          :board="board"
          :perspective="perspective ?? 'white'"
          :play-as="['white', 'black']"
          :rounded-borders="q.screen.gt.xs"
        />
      </q-card-section>

      <q-card-section class="q-mb-md full-width">
        <game-sidebar
          :move-history="board.getMoveHistoryAst()"
          :active-colour="board.activeColour"
          :own-colour="perspective ?? 'white'"
          :afen="connection.boardAFEN.value"
          :game-over="gameOver"
        />
      </q-card-section>
    </q-card-section>

    <game-over-dialog
      v-if="connection.gameOver.value"
      :node="connection.gameOver.value"
    />
  </q-card>
</template>
