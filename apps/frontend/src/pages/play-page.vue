<script setup lang="ts">
import { watch } from 'vue'
import { useChessRtcConnection } from '../hooks/chess-rtc-connection'
import { useRouter } from 'vue-router'

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
      type: 'afen-update',
      value: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 0',
    })
  }
})
</script>

<template>
  <router-view :connection="chessRtcConnection" />
</template>
