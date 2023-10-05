<script setup lang="ts">
import { ComputedRef, computed, ref } from 'vue'

import {
  Board,
  coordinatesEqual,
  isPromotion,
  PieceAllegiance,
  Notation,
  allegianceSide,
} from '@decentm/allegiance-chess-core'

import PromotionSelector from '../../promotion-selector.vue'
import CaptureSelector from '../../capture-selector.vue'

const props = defineProps<{
  board: Board
  squareSize: number
  ranks: number
  files: number
  perspective: 'white' | 'black'
  pieceFocus: Notation.Coordinates | null
}>()

const captureFocus = ref<Notation.Coordinates | null>(null)

const enPassantTarget = computed(() => {
  return props.board.enPassantTarget
})

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

const focusedSquare = computed(() => {
  return props.pieceFocus ? props.board.getSquare(props.pieceFocus) : null
})

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

const isOpponent = (coords: Notation.Coordinates) => {
  const square = props.board.getSquare(coords)

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
      enPassantTarget.value &&
      coordinatesEqual(enPassantTarget.value, coords)
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
      isPromotion(coords, props.board.activeColour) &&
      focusedSquare &&
      focusedSquare.value.piece === null
    ) {
      showPromotionPopup.value = coords

      const fromSquare = props.board.getSquare(props.pieceFocus)
      promotionAllegiance.value = fromSquare?.allegiance ?? null
    } else if (props.board.getSquare(coords)) {
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

  const square = props.board.getSquare(coords)

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

const indexToCoords = (
  fileIndex: number,
  rankIndex: number
): Notation.Coordinates => {
  const rawFile = fileIndex + 1
  const rawRank = rankIndex + 1

  if (props.perspective === 'white') {
    return {
      file: rawFile as Notation.File,
      rank: (9 - rawRank) as Notation.Rank,
    }
  }

  return {
    file: (9 - rawFile) as Notation.File,
    rank: rawRank as Notation.Rank,
  }
}

const coordsEmpty = (coords: Notation.Coordinates) => {
  return !props.board.getSquare(coords)
}

const canMove = (
  type: 'capture' | 'allegiance',
  from: Notation.Coordinates,
  to: Notation.Coordinates
) => {
  const moves = props.board.getValidMoves()

  return moves.some((move) => {
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
</script>

<style lang="scss" scoped>
.interaction-layer {
  z-index: 4;
}
</style>

<template>
  <div class="relative-position full-width full-height interaction-layer">
    <div
      class="col column row full-width"
      v-for="(_, rankIndex) in ranks"
      :key="rankIndex"
    >
      <div v-for="(_, fileIndex) in files" :key="fileIndex" class="full-height">
        <div
          v-ripple="
            !coordsEmpty(indexToCoords(fileIndex, rankIndex)) &&
            !isOpponent(indexToCoords(fileIndex, rankIndex))
          "
          class="absolute"
          @click="
            (event) =>
              handleCoordsClick(indexToCoords(fileIndex, rankIndex), event)
          "
          :class="{
            'cursor-pointer':
              !coordsEmpty(indexToCoords(fileIndex, rankIndex)) ||
              isHighlighted(indexToCoords(fileIndex, rankIndex)),
            'cursor-not-allowed':
              isOpponent(indexToCoords(fileIndex, rankIndex)) && !focusedSquare,
          }"
          :style="
            perspective === 'white'
              ? {
                  width: `${squareSize}px`,
                  height: `${squareSize}px`,
                  left: `${
                    (indexToCoords(fileIndex, rankIndex).file - 1) * squareSize
                  }px`,
                  bottom: `${
                    (indexToCoords(fileIndex, rankIndex).rank - 1) * squareSize
                  }px`,
                }
              : {
                  width: `${squareSize}px`,
                  height: `${squareSize}px`,
                  right: `${
                    (indexToCoords(fileIndex, rankIndex).file - 1) * squareSize
                  }px`,
                  top: `${
                    (indexToCoords(fileIndex, rankIndex).rank - 1) * squareSize
                  }px`,
                }
          "
        >
          <capture-selector
            v-if="
              captureFocus &&
              coordinatesEqual(
                captureFocus,
                indexToCoords(fileIndex, rankIndex)
              )
            "
            :moves="captureMoves"
            :model-value="
              coordinatesEqual(
                captureFocus,
                indexToCoords(fileIndex, rankIndex)
              ) ?? false
            "
            :size="squareSize"
            @click="handleCaptureClick"
            @dismiss="handleCaptureDismiss"
          />

          <promotion-selector
            v-if="
              promotionAllegiance !== null &&
              (isPromotion(indexToCoords(fileIndex, rankIndex), 'white') ||
                isPromotion(indexToCoords(fileIndex, rankIndex), 'black'))
            "
            :model-value="
              coordinatesEqual(
                showPromotionPopup,
                indexToCoords(fileIndex, rankIndex)
              ) ?? false
            "
            :allegiance="promotionAllegiance"
            :size="squareSize"
            @click="
              (piece) =>
                handlePromotion(indexToCoords(fileIndex, rankIndex), piece)
            "
            @dismiss="handlePromotionDismiss"
          />
        </div>
      </div>
    </div>
  </div>
</template>
