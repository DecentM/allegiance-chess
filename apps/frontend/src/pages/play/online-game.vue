<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, watch } from 'vue'
import { useQuasar } from 'quasar'

import ChessBoard from '../../components/chess-board.vue'
import GameSidebar from '../../components/game-sidebar.vue'
import GameOverDialog from '../../components/game-over-dialog.vue'

import { ChessRtcConnection } from '../../hooks/chess-rtc-connection'
import { useBoardSize } from '../../hooks/board-size'
import { useBoardWorker } from '../../hooks/board-worker'

const props = defineProps<{
  connection: ChessRtcConnection
}>()

onBeforeUnmount(() => {
  props.connection.disconnect()
})

const q = useQuasar()
const size = useBoardSize()

const perspective = computed(() => {
  if (!props.connection.serverSide.value) {
    return null
  }

  if (props.connection.mode.value === 'server') {
    return props.connection.serverSide.value
  }

  return props.connection.serverSide.value === 'white' ? 'black' : 'white'
})

const board = useBoardWorker({
  autoplayFor: [],
})

onMounted(() => board.reset())

const handleExecuteNodeIndex = (index: number) => {
  props.connection.sendMessage({
    type: 'execute-node-index',
    value: index,
  })
}

watch(props.connection.moveHistory, (newMoveHistory) => {
  const lastMoveIndex = newMoveHistory.at(-1)

  if (typeof lastMoveIndex !== 'number') {
    return
  }

  board.executeMoveIndex(lastMoveIndex)
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
          :model-value="board.afen.value"
          :valid-moves="board.validMoves.value"
          :width="size"
          @execute-node-index="handleExecuteNodeIndex"
          :board="board"
          :perspective="perspective ?? 'white'"
          :play-as="['white', 'black']"
          :rounded-borders="q.screen.gt.xs"
          :active-colour="board.activeColour.value"
          :check-moves="board.checkMoves.value"
          :en-passant-target="board.enPassantTarget.value"
          :move-history-ast="board.moveHistoryAst.value"
          :squares="board.squares.value"
        />
      </q-card-section>

      <q-card-section class="q-mb-md full-width">
        <game-sidebar
          :move-history="board.moveHistoryAst.value"
          :active-colour="board.activeColour.value"
          :own-colour="perspective ?? 'white'"
          :afen="board.afen.value"
          :game-over="board.gameOver.value"
        />
      </q-card-section>
    </q-card-section>

    <game-over-dialog
      v-if="board.gameOver.value"
      :node="board.gameOver.value"
    />
  </q-card>
</template>
