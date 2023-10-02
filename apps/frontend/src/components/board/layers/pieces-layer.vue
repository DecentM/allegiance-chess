<script setup lang="ts">
import { BoardSquare, Notation } from '@decentm/allegiance-chess-core'

import ChessPiece from '../../chess-piece.vue'

defineProps<{
  modelValue: Array<Notation.Coordinates & BoardSquare>
  squareSize: number
  perspective: 'white' | 'black'
}>()
</script>

<style lang="scss" scoped>
.pieces-layer {
  z-index: 3;
}
</style>

<template>
  <div
    class="relative-position full-width full-height no-pointer-events pieces-layer"
  >
    <div v-for="(square, index) in modelValue" :key="index">
      <chess-piece
        v-if="square"
        data-testid="piece"
        class="absolute"
        :piece="square.piece"
        :allegiance="square.allegiance"
        :size="squareSize"
        :style="
          perspective === 'white'
            ? {
                left: `${(square.file - 1) * squareSize}px`,
                bottom: `${(square.rank - 1) * squareSize}px`,
              }
            : {
                right: `${(square.file - 1) * squareSize}px`,
                top: `${(square.rank - 1) * squareSize}px`,
              }
        "
      />

      <div
        v-else
        :style="{ width: `${squareSize}px`, height: `${squareSize}px` }"
      ></div>
    </div>
  </div>
</template>
