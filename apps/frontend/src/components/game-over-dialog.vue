<script setup lang="ts">
import { PieceAllegiance, Notation } from '@decentm/allegiance-chess-core'
import ChessPiece from './chess-piece.vue'

defineProps<{
  node: Notation.GameOverNode
}>()
</script>

<style lang="scss" scoped>
.game-over-dialog {
  max-width: 100vw;
  width: 512px;
}
</style>

<template>
  <q-dialog :model-value="true" persistent position="bottom">
    <q-card class="my-card game-over-dialog">
      <q-card-section class="bg-primary text-h5 row justify-between">
        <span v-if="node.outcome === 'white'">White wins!</span>
        <span v-if="node.outcome === 'black'">Black wins!</span>
        <span v-if="node.outcome === 'draw'">Draw!</span>

        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section class="row justify-center">
        <chess-piece
          v-if="node.outcome === 'white'"
          :allegiance="PieceAllegiance.White"
          piece="K"
          :size="96"
        />
        <chess-piece
          v-if="node.outcome === 'black'"
          :allegiance="PieceAllegiance.Black"
          piece="K"
          :size="96"
        />
        <q-icon
          v-if="node.outcome === 'draw'"
          name="balance"
          size="96px"
          color="grey"
        />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div v-if="node.reason" class="text-subtitle1 text-center">
          {{ node.reason }}
        </div>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn
          color="secondary"
          text-color="primary"
          label="New game"
          to="/play"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
