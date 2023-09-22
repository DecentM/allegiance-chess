<script setup lang="ts">
import { ref } from 'vue'

import ChessBoard from '../components/chess-board.vue'
import AfenSidebar from '../components/afen-sidebar.vue'

const afen = ref(
  'rnbqkb>n>r>/pppppppp>/8/8/8/8/PPPPPPPP>/RNBQKB>N>R> w KQkq - 0 0'
)
</script>

<template>
  <q-page class="row items-center justify-evenly">
    <q-card>
      <q-card-section horizontal>
        <chess-board v-model="afen" :draggable="false" :width="800" />
        <afen-sidebar :model-value="afen" />
      </q-card-section>
    </q-card>
  </q-page>
</template>
