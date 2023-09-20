<script setup lang="ts">
import {
  Board,
  coordinatesEqual,
  fileToLetter,
  Coordinates,
  File,
  Rank,
} from '@decentm/allegiance-chess-core'
import { computed, ref } from 'vue'

import ChessPiece from './chess-piece.vue'

const props = defineProps<{
  modelValue: string
  width: number
}>()

const board = computed(() => {
  const result = new Board()

  result.importAFEN(props.modelValue)

  return result
})

const squares = computed(() => {
  return board.value.getSquares()
})

const pieceFocus = ref<Coordinates | null>(null)

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

const enPassantTarget = computed(() => {
  return board.value.enPassantTarget
})

const isHighlighted = (coords: Coordinates) =>
  highlightSquares.value.some(
    (coordinate) => coordinate && coordinatesEqual(coords, coordinate)
  )

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void
}>()

const handlePieceClick = (coords: Coordinates, event: MouseEvent) => {
  event.stopPropagation()

  if (isHighlighted(coords) && pieceFocus.value) {
    if (
      enPassantTarget.value &&
      coordinatesEqual(enPassantTarget.value, coords)
    ) {
      board.value.executeNode({
        kind: 'move',
        type: 'en-passant',
        from: pieceFocus.value,
        to: coords,
      })
    } else {
      board.value.executeNode({
        kind: 'move',
        from: pieceFocus.value,
        to: coords,
      })
    }

    emit('update:modelValue', board.value.toAFEN())
    pieceFocus.value = null

    return
  }

  const square = board.value.getSquare(coords)

  if (!square) {
    pieceFocus.value = null
    return
  }

  pieceFocus.value = coords
}
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

.move-placeholder {
  &::before {
    display: block;
    position: absolute;
    content: '';
    height: 33%;
    width: 33%;
    backdrop-filter: invert(0.5);
    left: 33%;
    top: 33%;
    border-radius: 50%;
    z-index: 2;
  }
}
</style>

<template>
  <div
    data-testid="chess-board"
    class="relative"
    :style="{ width: props.width + 'px', height: props.width + 'px' }"
  >
    <div class="absolute" data-testid="background">
      <div class="rank row" v-for="(_, rankIndex) in 8" :key="rankIndex">
        <div
          v-for="(_, fileIndex) in 8"
          class="file col-1 text-center items-center relative-position"
          :class="{
            'move-placeholder': isHighlighted({
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
        >
          <div class="absolute absolute-bottom-left q-ml-xs">
            {{ fileToLetter((fileIndex + 1) as File) }}{{ rankIndex + 1 }}
          </div>
        </div>
      </div>
    </div>

    <div
      data-testid="pieces"
      class="absolute no-pointer-events"
      :style="{ width: props.width + 'px', height: props.width + 'px' }"
    >
      <div
        v-for="(square, index) in squares"
        :key="
          square
            ? `${square.file}${square.rank}${square.piece}${square.allegiance}`
            : index
        "
      >
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
            data-testid="piece"
            @click="(event) => handlePieceClick(square, event)"
            :piece="square.piece"
            :allegiance="square.allegiance"
            :size="props.width / 8"
          />
        </div>
        <div v-else></div>
      </div>
    </div>
  </div>
</template>
