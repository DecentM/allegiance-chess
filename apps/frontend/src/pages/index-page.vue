<template>
  <q-page class="row items-center justify-evenly">
    <chess-board
      afen="r1bk3r/p2pBpNp/n4n2/1p1NP2P/6P1/3P4/P1P1K3/q5b1"
      :width="800"
    />
  </q-page>
</template>

<script setup lang="ts">
import ChessBoard from '../components/chess-board.vue'
</script>
