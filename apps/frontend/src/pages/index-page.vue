<script setup lang="ts">
import { ref } from 'vue'

import ChessBoard from '../components/chess-board.vue'
import AfenSidebar from '../components/afen-sidebar.vue'

const afen = ref(
  'rnbqkb>n>r>/pppp3p>/5p2/4p1p1/6P1/5N>1B>/PPPPPP1P>/RNBQK2R> w kqKQ e6 3 6'
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
