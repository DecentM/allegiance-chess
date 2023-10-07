<script setup lang="ts">
import { useQuasar } from 'quasar'
import { BoardSquare, Notation } from '@decentm/allegiance-chess-core'

import ChessPiece from '../../chess-piece.vue'

const props = defineProps<{
  modelValue: Array<Notation.Coordinates & BoardSquare>
  perspective: 'white' | 'black'
}>()

const q = useQuasar()

const getSquare = (index: number) => {
  if (props.perspective === 'white') {
    return props.modelValue[index]
  }

  return props.modelValue[63 - index]
}
</script>

<style lang="scss" scoped>
.pieces-layer {
  z-index: 3;
}

.piece-square {
  width: calc(100% / 8);
  height: calc(100% / 8);
}
</style>

<template>
  <div
    class="relative-position full-width full-height no-pointer-events pieces-layer row wrap"
  >
    <div v-for="(_, index) in 64" :key="index" class="piece-square">
      <chess-piece
        v-if="getSquare(index)"
        data-testid="piece"
        :class="{
          'q-pa-xs': q.screen.sm || q.screen.md,
          'q-pa-sm': q.screen.gt.sm,
        }"
        :piece="getSquare(index).piece"
        :allegiance="getSquare(index).allegiance"
      />
    </div>
  </div>
</template>
