<script setup lang="ts">
import { computed } from 'vue'
import {
  Board,
  Coordinates,
  File,
  Rank,
  coordinatesEqual,
} from '@decentm/allegiance-chess-core'

const props = defineProps<{
  board: Board
  ranks: number
  files: number
  squareSize: number
  perspective: 'white' | 'black'
  pieceFocus: Coordinates | null
}>()

const emit = defineEmits<{
  (event: 'click', coords: Coordinates): void
}>()

const highlightSquares = computed(() => {
  if (!props.pieceFocus) {
    return []
  }

  const moves = props.board.getValidMoves(props.pieceFocus)

  const result = moves
    .map((node) => {
      if (node.kind !== 'move') {
        return null
      }

      return node.to
    })
    .filter(Boolean)

  return result
})

const show = (coords: Coordinates) =>
  highlightSquares.value.some(
    (coordinate) => coordinate && coordinatesEqual(coords, coordinate)
  )

const coordsEmpty = (coords: Coordinates) => {
  return !props.board.getSquare(coords)
}

const handlePieceClick = (coords: Coordinates, event: MouseEvent) => {
  event.stopPropagation()
  event.preventDefault()

  if (props.perspective === 'black') {
    emit('click', coords)
  } else {
    emit('click', {
      file: (props.files + 1 - coords.file) as File,
      rank: (props.ranks + 1 - coords.rank) as Rank,
    })
  }
}

const indexToCoords = (fileIndex: number, rankIndex: number): Coordinates => {
  const rawFile = fileIndex + 1
  const rawRank = rankIndex + 1

  if (props.perspective === 'white') {
    return {
      file: rawFile as File,
      rank: (9 - rawRank) as Rank,
    }
  }

  return {
    file: (9 - rawFile) as File,
    rank: rawRank as Rank,
  }
}
</script>

<style lang="scss" scoped>
.indicators-layer {
  z-index: 3;
}

.move-placeholder {
  position: relative;

  &::before {
    filter: blur(1px);

    display: block;
    position: absolute;
    content: '';
    border-radius: 50%;
    z-index: 2;

    background-color: rgba(0, 0, 0, 0);
    border-color: rgba(0, 0, 0, 0);

    transition-property: background-color, border-color;
    transition-duration: 0.1s;
    transition-timing-function: linear;
    transition-delay: inherit;
  }

  &.focus {
    border-radius: 1rem;

    outline-width: 0.25rem;
    outline-style: dashed;
    outline-offset: -0.5rem;

    &.even {
      outline-color: $chess-black;
    }

    &:not(.even) {
      outline-color: $chess-white;
    }
  }

  &.target {
    &::before {
      height: 33%;
      width: 33%;
      left: 33%;
      top: 33%;
    }
  }

  &.capture {
    &::before {
      height: 90%;
      width: 90%;
      left: 5%;
      top: 5%;

      border-width: 1rem;
      border-style: solid;
    }
  }

  &.show {
    &::before {
      pointer-events: all;
    }

    &.target {
      &::before {
        background-color: rgba(0, 0, 0, 0.2);
      }
    }

    &.capture {
      &::before {
        border-color: rgba(0, 0, 0, 0.2);
      }
    }
  }
}
</style>

<template>
  <div
    class="relative-position full-width full-height column no-pointer-events indicators-layer"
  >
    <div
      class="col column row full-width"
      v-for="(_, rankIndex) in ranks"
      :key="rankIndex"
    >
      <div
        v-for="(_, fileIndex) in files"
        :key="fileIndex"
        class="full-height move-placeholder"
        :class="{
          even: rankIndex % 2 === 0 ? fileIndex % 2 === 0 : fileIndex % 2 !== 0,
          focus: coordinatesEqual(
            pieceFocus,
            indexToCoords(fileIndex, rankIndex)
          ),
          show: show(indexToCoords(fileIndex, rankIndex)),
          capture: !coordsEmpty(indexToCoords(fileIndex, rankIndex)),
          target: coordsEmpty(indexToCoords(fileIndex, rankIndex)),
        }"
        @click="
          (event) =>
            handlePieceClick(indexToCoords(fileIndex, rankIndex), event)
        "
      />
    </div>
  </div>
</template>
