<script setup lang="ts">
import { computed } from 'vue'
import {
  BoardSquare,
  Notation,
  coordinatesEqual,
  getCoordsForIndex,
} from '@decentm/allegiance-chess-core'

const props = defineProps<{
  squares: Array<Notation.Coordinates & BoardSquare>
  checkMoves: Notation.MoveNode[]
  validMoves: Notation.Node[]
  ranks: number
  files: number
  perspective: 'white' | 'black'
  pieceFocus: Notation.Coordinates | null
  lastMove: Notation.Node | null
}>()

const highlightSquares = computed(() => {
  if (!props.pieceFocus) {
    return []
  }

  const moves = props.validMoves.filter(
    (move) =>
      move.kind === 'move' && coordinatesEqual(props.pieceFocus, move.from)
  )

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

const show = (coords: Notation.Coordinates) =>
  highlightSquares.value.some(
    (coordinate) => coordinate && coordinatesEqual(coords, coordinate)
  )

const coordsEmpty = (coords: Notation.Coordinates) => {
  return !props.squares.find((square) => coordinatesEqual(coords, square))
}

const isChecked = (coords: Notation.Coordinates) => {
  return props.checkMoves.some(
    (move) => move.kind === 'move' && coordinatesEqual(move.to, coords)
  )
}

const getCoords = (index: number) => {
  if (props.perspective === 'white') {
    return getCoordsForIndex(index)
  }

  return getCoordsForIndex(63 - index)
}
</script>

<style lang="scss" scoped>
.indicators-layer {
  z-index: 2;
}

.move-placeholder {
  position: relative;

  transition-property: outline-color;
  transition-duration: 0.1s;
  transition-timing-function: linear;
  transition-delay: inherit;

  outline-color: transparent;

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
    transition-duration: inherit;
    transition-timing-function: inherit;
    transition-delay: inherit;
  }

  &.checked {
    &::before {
      background-color: $negative;
      opacity: 0.8;
      filter: blur(15px);
    }
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

  &.last {
    &-from {
      background-color: rgba($chess-highlight, 0.5);
    }

    &-to {
      background-color: rgba($chess-highlight, 0.7);
    }
  }
}

.indicator-square {
  width: calc(100% / 8);
  height: calc(100% / 8);
}
</style>

<template>
  <div
    class="relative-position full-width full-height row no-pointer-events indicators-layer"
  >
    <div
      v-for="(_, index) in 64"
      :key="index"
      class="indicator-square move-placeholder"
      :class="{
        even: (getCoords(index).file + getCoords(index).rank) % 2 !== 0,
        focus: coordinatesEqual(pieceFocus, getCoords(index)),
        show: show(getCoords(index)),
        capture: !coordsEmpty(getCoords(index)),
        target: coordsEmpty(getCoords(index)),
        checked: isChecked(getCoords(index)),
        'last-from':
          lastMove?.kind === 'move' &&
          coordinatesEqual(lastMove.from, getCoords(index)),
        'last-to':
          lastMove?.kind === 'move' &&
          coordinatesEqual(lastMove.to, getCoords(index)),
      }"
    ></div>
  </div>
</template>
