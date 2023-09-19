<script setup lang="ts">
import { Board, BoardSquare } from '@decentm/allegiance-chess-core'
import { computed } from 'vue'

const props = defineProps<{
  afen: string
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
.row {
  > .square {
    width: 16px;
    height: 16px;
  }

  &:nth-child(odd) {
    > .square {
      &:nth-child(odd) {
        background-color: white;
        color: black;
      }

      &:nth-child(even) {
        background-color: black;
        color: white;
      }
    }
  }

  &:nth-child(even) {
    > .square {
      &:nth-child(even) {
        background-color: white;
        color: black;
      }

      &:nth-child(odd) {
        background-color: black;
        color: white;
      }
    }
  }
}
</style>

<template>
  <q-card class="board col">
    <div class="rank row" v-for="(rank, rankIndex) in squares" :key="rankIndex">
      <q-card
        class="file col-1 square"
        v-for="(square, fileIndex) in rank"
        :key="fileIndex"
      >
        <span v-if="square">
          {{ square.piece || 'p' }}
        </span>

        <span v-else>.</span>
      </q-card>
    </div>
  </q-card>
</template>
