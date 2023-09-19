<script setup lang="ts">
import {
  Piece,
  PieceAllegiance,
  allegianceSide,
} from '@decentm/allegiance-chess-core'

import BishopIcon from './pieces/bishop-icon.vue'
import KingIcon from './pieces/king-icon.vue'
import KnightIcon from './pieces/knight-icon.vue'
import PawnIcon from './pieces/pawn-icon.vue'
import QueenIcon from './pieces/queen-icon.vue'
import RookIcon from './pieces/rook-icon.vue'
import { computed } from 'vue'

const props = defineProps<{
  piece: Piece | null
  allegiance: PieceAllegiance
  size: number
}>()

const side = computed(() => {
  return allegianceSide(props.allegiance)
})

const colour = computed(() => {
  switch (props.allegiance) {
    case PieceAllegiance.Black:
      return '#000'
    case PieceAllegiance.DarkGrey:
      return '#444'
    case PieceAllegiance.LightGrey:
      return '#999'
    case PieceAllegiance.White:
      return '#FFF'
    default:
      return ''
  }
})

const emit = defineEmits<{ (event: 'click', e: MouseEvent): void }>()
</script>

<style lang="scss" scoped></style>

<template>
  <div @click="(event) => emit('click', event)">
    <pawn-icon
      class="piece"
      :variant="side"
      :colour="colour"
      v-if="piece === null"
    />

    <bishop-icon
      class="piece"
      :variant="side"
      :colour="colour"
      :size="size"
      v-if="piece === 'B'"
    />
    <king-icon
      class="piece"
      :variant="side"
      :colour="colour"
      v-if="piece === 'K'"
    />
    <knight-icon
      class="piece"
      :variant="side"
      :colour="colour"
      v-if="piece === 'N'"
    />
    <queen-icon
      class="piece"
      :variant="side"
      :colour="colour"
      v-if="piece === 'Q'"
    />
    <rook-icon
      class="piece"
      :variant="side"
      :colour="colour"
      v-if="piece === 'R'"
    />
  </div>
</template>
