<script setup lang="ts">
import { ComputedRef, computed, ref } from 'vue'

import {
  Board,
  coordinatesEqual,
  isPromotion,
  PieceAllegiance,
  Notation,
  allegianceSide,
  BoardSquare,
  getCoordsForIndex,
} from '@decentm/allegiance-chess-core'

import PromotionSelector from '../../promotion-selector.vue'
import CaptureSelector from '../../capture-selector.vue'

const props = defineProps<{
  enPassantTarget: Notation.Coordinates | null
  squares: Array<Notation.Coordinates & BoardSquare>
  ranks: number
  files: number
  perspective: 'white' | 'black'
  pieceFocus: Notation.Coordinates | null
  validMoves: Notation.Node[]
  activeColour: 'white' | 'black'
}>()

const captureFocus = ref<Notation.Coordinates | null>(null)

const showPromotionPopup = ref<Notation.Coordinates | null>(null)
const promotionAllegiance = ref<PieceAllegiance | null>(null)

const emit = defineEmits<{
  (event: 'execute-node-index', index: number): void
  (event: 'update-piece-focus', coords: Notation.Coordinates | null): void
  (
    event: 'update-highlights',
    targets: Notation.Coordinates[],
    captures: Notation.Coordinates[]
  ): void
}>()

const getSquare = (coords: Notation.Coordinates) => {
  return props.squares.find((square) => coordinatesEqual(square, coords))
}

const focusedSquare = computed(() => {
  if (!props.pieceFocus) {
    return null
  }

  return getSquare(props.pieceFocus)
})

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

const isOpponent = (coords: Notation.Coordinates) => {
  const square = props.squares.find((square) =>
    coordinatesEqual(square, coords)
  )

  if (!square) {
    return false
  }

  return allegianceSide(square.allegiance) !== props.perspective
}

const isHighlighted = (coords: Notation.Coordinates) =>
  highlightSquares.value.some(
    (coordinate) => coordinate && coordinatesEqual(coords, coordinate)
  )

const handleCoordsClick = (coords: Notation.Coordinates, event: MouseEvent) => {
  event.stopPropagation()
  event.preventDefault()

  if (isHighlighted(coords) && props.pieceFocus && focusedSquare.value) {
    if (
      props.enPassantTarget &&
      coordinatesEqual(props.enPassantTarget, coords)
    ) {
      emit(
        'execute-node-index',
        Board.findMoveIndex(props.validMoves, {
          kind: 'move',
          type: 'en-passant',
          from: props.pieceFocus,
          to: coords,
        })
      )

      emit('update-piece-focus', null)
    } else if (
      isPromotion(coords, props.activeColour) &&
      focusedSquare &&
      focusedSquare.value.piece === null
    ) {
      showPromotionPopup.value = coords

      const fromSquare = getSquare(props.pieceFocus)
      promotionAllegiance.value = fromSquare?.allegiance ?? null
    } else if (getSquare(coords)) {
      captureFocus.value = coords
    } else if (
      focusedSquare.value?.piece === 'K' &&
      Math.abs(props.pieceFocus.file - coords.file) > 1
    ) {
      emit(
        'execute-node-index',
        Board.findMoveIndex(props.validMoves, {
          kind: 'move',
          type: 'castle',
          side: coords.file === 7 ? 'king' : 'queen',
          from: props.pieceFocus,
          to: coords,
        })
      )
    } else {
      emit(
        'execute-node-index',
        Board.findMoveIndex(props.validMoves, {
          kind: 'move',
          from: props.pieceFocus,
          to: coords,
        })
      )
    }

    return
  }

  if (isOpponent(coords)) {
    return
  }

  const square = getSquare(coords)

  emit('update-piece-focus', square ? coords : null)
}

const handlePromotion = (
  coords: Notation.Coordinates,
  piece: Notation.Piece
) => {
  if (!props.pieceFocus) {
    return
  }

  showPromotionPopup.value = null

  const index = Board.findMoveIndex(props.validMoves, {
    kind: 'move',
    type: 'promotion',
    from: props.pieceFocus,
    to: coords,
    promotionTo: piece,
  })

  emit('execute-node-index', index)

  emit('update-piece-focus', null)
}

const handlePromotionDismiss = () => {
  showPromotionPopup.value = null
  promotionAllegiance.value = null
}

const handleCaptureDismiss = () => {
  captureFocus.value = null
}

const handleCaptureClick = (decision: 'capture' | 'challenge') => {
  if (!props.pieceFocus || !captureFocus.value) {
    return
  }

  const index = Board.findMoveIndex(props.validMoves, {
    kind: 'move',
    type: decision === 'capture' ? 'capture' : 'allegiance',
    from: props.pieceFocus,
    to: captureFocus.value,
  })

  emit('execute-node-index', index)

  captureFocus.value = null

  emit('update-piece-focus', null)
}

const coordsEmpty = (coords: Notation.Coordinates) => {
  return !getSquare(coords)
}

const canMove = (
  type: 'capture' | 'allegiance',
  from: Notation.Coordinates,
  to: Notation.Coordinates
) => {
  return props.validMoves.some((move) => {
    return (
      move.kind === 'move' &&
      coordinatesEqual(move.to, to) &&
      coordinatesEqual(move.from, from) &&
      move.type === type
    )
  })
}

const captureMoves: ComputedRef<Array<'x' | '>'>> = computed(() => {
  const result: Array<'x' | '>'> = []

  if (!props.pieceFocus || !captureFocus.value) {
    return result
  }

  if (canMove('allegiance', props.pieceFocus, captureFocus.value)) {
    result.push('>')
  }

  if (canMove('capture', props.pieceFocus, captureFocus.value)) {
    result.push('x')
  }

  return result
})

const getCoords = (index: number) => {
  if (props.perspective === 'white') {
    return getCoordsForIndex(index)
  }

  return getCoordsForIndex(63 - index)
}
</script>

<style lang="scss" scoped>
.interaction-layer {
  z-index: 4;
}

.interaction-square {
  width: calc(100% / 8);
  height: calc(100% / 8);
}
</style>

<template>
  <div
    class="relative-position full-width full-height interaction-layer row wrap"
  >
    <div
      v-for="(_, index) in 64"
      :key="index"
      v-ripple="!coordsEmpty(getCoords(index)) && !isOpponent(getCoords(index))"
      class="relative-position interaction-square"
      @click="(event) => handleCoordsClick(getCoords(index), event)"
      :class="{
        'cursor-pointer':
          !coordsEmpty(getCoords(index)) || isHighlighted(getCoords(index)),
        'cursor-not-allowed': isOpponent(getCoords(index)) && !focusedSquare,
      }"
    >
      <capture-selector
        v-if="captureFocus && coordinatesEqual(captureFocus, getCoords(index))"
        :moves="captureMoves"
        :model-value="coordinatesEqual(captureFocus, getCoords(index)) ?? false"
        @click="handleCaptureClick"
        @dismiss="handleCaptureDismiss"
      />

      <promotion-selector
        v-if="
          promotionAllegiance !== null &&
          (isPromotion(getCoords(index), 'white') ||
            isPromotion(getCoords(index), 'black'))
        "
        :model-value="
          coordinatesEqual(showPromotionPopup, getCoords(index)) ?? false
        "
        :allegiance="promotionAllegiance"
        @click="(piece) => handlePromotion(getCoords(index), piece)"
        @dismiss="handlePromotionDismiss"
      />
    </div>
  </div>
</template>
