<script setup lang="ts">
import { ref } from 'vue'
import ChessBoard from '../components/chess-board.vue'

const afen = ref('rnbqkb+n+r+/pppppppp+/8/8/8/8/PPPPPPPP+/RNBQKB+N+R+ ')
</script>

<template>
  <q-page class="row items-center justify-evenly">
    <chess-board v-model="afen" :draggable="false" :width="800" />
  </q-page>
</template>
