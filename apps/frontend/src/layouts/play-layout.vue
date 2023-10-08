<script setup lang="ts">
import { watch } from 'vue'

import { useChessRtcConnection } from '../hooks/chess-rtc-connection'

const chessRtcConnection = useChessRtcConnection()

watch(chessRtcConnection.open, (newValue) => {
  if (!newValue) {
    return
  }

  if (chessRtcConnection.isHost.value) {
    chessRtcConnection.sendMessage({
      type: 'side-assignment',
      value: Math.random() > 0.5 ? 'white' : 'black',
    })
  }
})
</script>

<template>
  <router-view :connection="chessRtcConnection" />
</template>
