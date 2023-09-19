<script setup lang="ts">
import { Board, BoardSquare } from '@decentm/allegiance-chess-core'
import { computed } from 'vue'
import {
  Container as DndContainer,
  Draggable as DndDraggable,
} from 'vue3-smooth-dnd'

import ChessPiece from './chess-piece.vue'

const props = defineProps<{
  afen: string
  width: number
}>()

const flatSquares = computed(() => {
  const board = new Board()

  board.importAFEN(props.afen)

  return board.getSquares()
})

const squares = computed(() => {
  const flat = flatSquares.value

  const result: Array<Array<BoardSquare | null>> = Array.from({
    length: 8,
  })

  result.forEach((_, index) => {
    result[index] = Array.from({ length: 8 }).fill(null) as null[]
  })

  flat.filter(Boolean).forEach((square) => {
    result[square.rank - 1][square.file - 1] = square
  })

  result.reverse()

  return result
})
</script>

<style lang="scss" scoped>
.rank {
  &:nth-child(odd) {
    > .square {
      &:nth-child(odd) {
        background-color: $white;
        color: $black;
      }

      &:nth-child(even) {
        background-color: $black;
        color: $white;
      }
    }
  }

  &:nth-child(even) {
    > .square {
      &:nth-child(even) {
        background-color: $white;
        color: $black;
      }

      &:nth-child(odd) {
        background-color: $black;
        color: $white;
      }
    }
  }
}
</style>

<template>
  <div class="relative" :style="{ width: props.width + 'px' }">
    <div class="absolute">
      <div
        class="rank row"
        v-for="(rank, rankIndex) in squares"
        :key="rankIndex"
      >
        <q-card
          flat
          square
          class="file col-1 square text-center items-center"
          v-for="(_, fileIndex) in rank"
          :key="fileIndex"
          :style="{
            width: props.width / 8 + 'px',
            height: props.width / 8 + 'px',
          }"
        />
      </div>
    </div>

    <dnd-container
      class="absolute"
      :style="{ width: props.width + 'px', height: props.width + 'px' }"
    >
      <dnd-draggable v-for="(square, index) in flatSquares" :key="index">
        <div
          v-if="square"
          class="absolute"
          :style="{
            left: (square.file - 1) * (props.width / 8) + 'px',
            top: (square.rank - 1) * (props.width / 8) + 'px',
            width: props.width / 8 + 'px',
            height: props.width / 8 + 'px',
          }"
        >
          <chess-piece
            :piece="square.piece"
            :allegiance="square.allegiance"
            :size="props.width / 8"
          />
        </div>
        <div v-else></div>
      </dnd-draggable>
    </dnd-container>
  </div>
</template>
