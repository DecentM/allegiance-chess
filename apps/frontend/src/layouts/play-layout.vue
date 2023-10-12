<script setup lang="ts">
import { watch } from 'vue'

import { useChessRtcConnection } from '../hooks/chess-rtc-connection'
import { useRouter } from 'vue-router'

const chessRtcConnection = useChessRtcConnection()
const router = useRouter()

watch(chessRtcConnection.open, (newValue) => {
  if (!newValue) {
    return
  }

  if (chessRtcConnection.isHost.value) {
    chessRtcConnection.sendMessage({
      type: 'side-assignment',
      value: Math.random() > 0.5 ? 'white' : 'black',
    })
  } else {
    router.push(`/play/online/${chessRtcConnection.peerId.value}`)
  }
})
</script>

<template>
  <router-view :connection="chessRtcConnection" />
</template>
