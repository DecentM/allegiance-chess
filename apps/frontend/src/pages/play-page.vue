<script setup lang="ts">
import { watch } from 'vue'
import { useRouter } from 'vue-router'

import { useChessRtcConnection } from '../hooks/chess-rtc-connection'

const router = useRouter()
const chessRtcConnection = useChessRtcConnection()

watch(chessRtcConnection.mode, (newValue) => {
  if (newValue === 'initial') {
    router.push('/play')
  }
})

watch(chessRtcConnection.open, (newValue) => {
  if (!newValue) {
    return
  }

  router.push(`/play/online/${chessRtcConnection.peerId.value}`)

  if (chessRtcConnection.mode.value === 'server') {
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
