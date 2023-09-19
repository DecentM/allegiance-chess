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

const squares = computed(() => {
  const board = new Board()

  board.importAFEN(props.afen)

  const flat = board.getSquares()

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
.file {
  overflow: hidden;
}

.row {
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
  <dnd-container>
    <q-card class="board col" :style="{ width: props.width + 'px' }">
      <div
        class="rank row"
        v-for="(rank, rankIndex) in squares"
        :key="rankIndex"
      >
        <q-card
          flat
          square
          class="file col-1 square text-center items-center"
          v-for="(square, fileIndex) in rank"
          :key="fileIndex"
          :style="{
            width: props.width / 8 + 'px',
            height: props.width / 8 + 'px',
          }"
        >
          <dnd-draggable>
            <chess-piece
              v-if="square"
              :piece="square.piece"
              :allegiance="square.allegiance"
            />

            <div v-else></div>
          </dnd-draggable>
        </q-card>
      </div>
    </q-card>
  </dnd-container>
</template>
