<script setup lang="ts">
import {
  Board,
  BoardSquare,
  coordinatesEqual,
  Coordinates,
  File,
  Rank,
} from '@decentm/allegiance-chess-core'
import { computed, ref } from 'vue'
import {
  Container as DndContainer,
  Draggable as DndDraggable,
} from 'vue3-smooth-dnd'

import ChessPiece from './chess-piece.vue'

const props = defineProps<{
  afen: string
  width: number
  draggable: boolean
}>()

const board = computed(() => {
  const result = new Board()

  result.importAFEN(props.afen)

  return result
})

const flatSquares = computed(() => {
  return board.value.getSquares()
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

const pieceFocus = ref<Coordinates | null>(null)

const handlePieceClick = (coords: Coordinates, event: MouseEvent) => {
  event.stopPropagation()

  const square = board.value.getSquare(coords)

  if (!square) {
    pieceFocus.value = null
    return
  }

  pieceFocus.value = coords
}

const highlightSquares = computed(() => {
  if (!pieceFocus.value) {
    return []
  }

  const moves = board.value.getValidMoves()

  const result = moves
    .filter((move) => {
      if (move.kind !== 'move') {
        return false
      }

      if (pieceFocus.value && coordinatesEqual(move.from, pieceFocus.value)) {
        return true
      }

      return false
    })
    .map((node) => {
      if (node.kind !== 'move') {
        return null
      }

      return node.to
    })
    .filter(Boolean)

  return result
})

const isHighlighted = (coords: Coordinates) =>
  highlightSquares.value.some(
    (coordinate) => coordinate && coordinatesEqual(coords, coordinate)
  )
</script>

<style lang="scss" scoped>
.rank {
  &:nth-child(odd) {
    > .file {
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
    > .file {
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

.highlighted {
  background: red !important;
}
</style>

<template>
  <div
    class="relative"
    :style="{ width: props.width + 'px', height: props.width + 'px' }"
  >
    <div class="absolute">
      <div
        class="rank row"
        v-for="(rank, rankIndex) in squares"
        :key="rankIndex"
      >
        <div
          v-for="(_, fileIndex) in rank"
          class="file col-1 text-center items-center"
          :class="{
            highlighted: isHighlighted({
              file: (fileIndex + 1) as File,
              rank: (rankIndex + 1) as Rank,
            }),
          }"
          :key="fileIndex"
          :style="{
            width: props.width / 8 + 'px',
            height: props.width / 8 + 'px',
          }"
          @click="
            (event) => handlePieceClick({
              file: (fileIndex + 1) as File,
              rank: (rankIndex + 1) as Rank,
            }, event)
          "
        />
      </div>
    </div>

    <template v-if="draggable">
      <dnd-container
        behaviour="copy"
        :auto-scroll-enabled="false"
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
    </template>

    <template v-else>
      <div
        class="absolute no-pointer-events"
        :style="{ width: props.width + 'px', height: props.width + 'px' }"
      >
        <div v-for="(square, index) in flatSquares" :key="index">
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
              @click="(event) => handlePieceClick(square, event)"
              :piece="square.piece"
              :allegiance="square.allegiance"
              :size="props.width / 8"
            />
          </div>
          <div v-else></div>
        </div>
      </div>
    </template>
  </div>
</template>
