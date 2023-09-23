<script setup lang="ts">
import ChessBoard from '../../components/chess-board.vue'
import AfenSidebar from '../../components/afen-sidebar.vue'

import { ChessRtcConnection } from '../../hooks/chess-rtc-connection'
import { onBeforeUnmount } from 'vue'

const props = defineProps<{
  connection: ChessRtcConnection
}>()

const handleUpdate = (newValue: string) => {
  if (props.connection.mode.value === 'initial') {
    return
  }

  props.connection.sendMessage({
    type: 'afen-update',
    value: newValue,
  })
}

onBeforeUnmount(() => {
  props.connection.disconnect()
})
</script>

<template>
  <q-card flat>
    <q-card-section horizontal>
      <chess-board
        :model-value="connection.boardAFEN.value"
        @update:model-value="handleUpdate"
        :width="800"
      />

      <div class="col q-ml-md">
        <q-card flat bordered class="full-height">
          <q-card-section class="bg-primary q-mb-md">
            <q-item-label>Board information</q-item-label>
          </q-card-section>

          <afen-sidebar :model-value="connection.boardAFEN.value" />
        </q-card>
      </div>
    </q-card-section>
  </q-card>
</template>
