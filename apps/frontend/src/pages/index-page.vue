<script setup lang="ts">
import { ref } from 'vue'
import ChessBoard from '../components/chess-board.vue'

const afen = ref(
  'rn1qkb>n>r>/pbP2ppp>/8/4p3/3p4/8/P2PPPPP>/RNBQKB>N>R> w - - 9 17'
)
</script>

<template>
  <q-page class="row items-center justify-evenly">
    <q-card>
      <q-card-section class="col justify-center">
        <chess-board v-model="afen" :draggable="false" :width="800" />
        <q-input standout v-model="afen" label="AFEN" class="q-mt-md" />
      </q-card-section>
    </q-card>
  </q-page>
</template>
