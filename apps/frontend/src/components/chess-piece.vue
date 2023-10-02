<script setup lang="ts">
import { Notation, PieceAllegiance } from '@decentm/allegiance-chess-core'

import PieceSvg from './piece-svg.vue'

import BishopIcon from './pieces/bishop-icon.vue'
import KingIcon from './pieces/king-icon.vue'
import KnightIcon from './pieces/knight-icon.vue'
import PawnIcon from './pieces/pawn-icon.vue'
import QueenIcon from './pieces/queen-icon.vue'
import RookIcon from './pieces/rook-icon.vue'

defineProps<{
  piece: Notation.Piece | null
  allegiance: PieceAllegiance
  size: number
}>()

const emit = defineEmits<{ (event: 'click', e: MouseEvent): void }>()
</script>

<style lang="scss" scoped>
.chess-piece-svg {
  overflow: hidden;
}
</style>

<template>
  <div
    class="chess-piece-svg"
    @click="(event) => emit('click', event)"
    :style="{ height: `${size}px`, width: `${size}px` }"
  >
    <piece-svg class="piece" :allegiance="allegiance" v-if="piece === null">
      <pawn-icon />
    </piece-svg>

    <piece-svg
      class="piece"
      :allegiance="allegiance"
      :size="size"
      v-if="piece === 'B'"
    >
      <bishop-icon />
    </piece-svg>

    <piece-svg :allegiance="allegiance" v-if="piece === 'K'" class="piece">
      <king-icon />
    </piece-svg>

    <piece-svg class="piece" :allegiance="allegiance" v-if="piece === 'N'">
      <knight-icon />
    </piece-svg>

    <piece-svg class="piece" :allegiance="allegiance" v-if="piece === 'Q'">
      <queen-icon />
    </piece-svg>

    <piece-svg class="piece" :allegiance="allegiance" v-if="piece === 'R'">
      <rook-icon />
    </piece-svg>
  </div>
</template>
