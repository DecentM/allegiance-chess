<script setup lang="ts">
import { ref } from 'vue'

import ChessBoard from '../components/chess-board.vue'
import AfenSidebar from '../components/afen-sidebar.vue'

const afen = ref(
  'r3kb>n>r>/pppbq2p>/2n2p2/1P1pp1p1/6P1/2PP1N>1B>/P3PP1P>/RNBQK2R> b kqKQ - 7 14'
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
