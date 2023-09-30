<script setup lang="ts">
import { watch } from 'vue'
import { useRouter } from 'vue-router'

import { useChessRtcConnection } from '../../hooks/chess-rtc-connection'
import { FenPreset } from '../../lib/boards'

const router = useRouter()
const chessRtcConnection = await useChessRtcConnection()

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

    chessRtcConnection.sendMessage({
      type: 'afen-update',
      value: FenPreset.VanillaDefault,
    })
  }
})
</script>

<template>
  <router-view :connection="chessRtcConnection" />
</template>
