<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'
import { Board, Node } from '@decentm/allegiance-chess-core'

import ChessBoard from '../../components/chess-board.vue'
import AfenInfo from '../../components/afen-info.vue'

import { ChessRtcConnection } from '../../hooks/chess-rtc-connection'
import { useQuasar } from 'quasar'

const props = defineProps<{
  connection: ChessRtcConnection
}>()

onBeforeUnmount(() => {
  props.connection.disconnect()
})

const board = computed(() => {
  const result = new Board()

  result.importAFEN(props.connection.boardAFEN.value)

  return result
})

const handleExecuteNode = (node: Partial<Node>) => {
  const index = board.value.findMoveIndex(node)

  if (index === -1) {
    return
  }

  board.value.executeMoveIndex(index)

  props.connection.sendMessage({
    type: 'afen-update',
    value: board.value.toAFEN(),
  })
}

const size = ref(800)

const q = useQuasar()

const handleResize = (newSize: { height: number; width: number }) => {
  if (q.screen.gt.md) {
    size.value = newSize.width - newSize.width / 8 - 200
    return
  }

  size.value = newSize.width - newSize.width / 8
}

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
  <q-card flat>
    <q-card-section class="row">
      <q-resize-observer @resize="handleResize" />

      <chess-board
        :model-value="connection.boardAFEN.value"
        :width="size"
        @execute-node="handleExecuteNode"
        :board="board"
        :perspective="perspective ?? 'white'"
        :play-as="['white', 'black']"
      />

      <div class="col-lg col-md-12 full-width">
        <q-card flat bordered class="full-height">
          <q-card-section class="bg-primary q-mb-md">
            <q-item-label>Board information</q-item-label>
          </q-card-section>

          <afen-info :model-value="connection.boardAFEN.value" />
        </q-card>
      </div>
    </q-card-section>
  </q-card>
</template>
