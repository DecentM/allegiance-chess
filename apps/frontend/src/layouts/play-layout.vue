<script setup lang="ts">
import { onMounted, watch } from 'vue'

import { useChessRtcConnection } from '../hooks/chess-rtc-connection'
import { useRoute, useRouter } from 'vue-router'
import { useNotify } from '../hooks/notify'

const chessRtcConnection = useChessRtcConnection()
const router = useRouter()
const route = useRoute()
const { notify } = useNotify()

watch(chessRtcConnection.state, (newValue) => {
  if (newValue !== 'connected') {
    return
  }

  if (chessRtcConnection.isHost.value) {
    chessRtcConnection.sendMessage({
      type: 'side-assignment',
      value: Math.random() > 0.5 ? 'white' : 'black',
    })
  }

  router.push('/play/online')
})

onMounted(() => {
  if (
    chessRtcConnection.state.value !== 'connected' &&
    route.path === '/play/online'
  ) {
    router.push('/play')
    notify({
      type: 'warning',
      icon: 'link_off',
      message: 'Not connected, redirecting to game setup',
    })
  }
})
</script>

<template>
  <router-view :connection="chessRtcConnection" />
</template>
