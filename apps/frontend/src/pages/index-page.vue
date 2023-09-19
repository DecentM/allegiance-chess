<script setup lang="ts">
import ChessBoard from '../components/chess-board.vue'
</script>

<template>
  <q-page class="row items-center justify-evenly">
    <chess-board
      afen="rnbqkb+n+r+/pppppppp+/8/8/8/8/PPPPPPPP+/RNBQKB+N+R+ "
      :width="800"
    />
  </q-page>
</template>
