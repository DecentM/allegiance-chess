<script setup lang="ts">
import { computed, ref } from 'vue'

import {
  Board,
  coordinatesEqual,
  isPromotion,
  Coordinates,
  Piece,
  PieceAllegiance,
  Node,
  File,
  Rank,
} from '@decentm/allegiance-chess-core'

import PromotionSelector from '../../promotion-selector.vue'
import CaptureSelector from '../../capture-selector.vue'

const props = defineProps<{
  board: Board
  squareSize: number
  ranks: number
  files: number
  perspective: 'white' | 'black'
  pieceFocus: Coordinates | null
}>()

const captureFocus = ref<Coordinates | null>(null)

const enPassantTarget = computed(() => {
  return props.board.enPassantTarget
})

const showPromotionPopup = ref<Coordinates | null>(null)
const promotionAllegiance = ref<PieceAllegiance | null>(null)

const emit = defineEmits<{
  (event: 'execute-node', node: Partial<Node>): void
  (event: 'update-piece-focus', coords: Coordinates | null): void
  (
    event: 'update-highlights',
    targets: Coordinates[],
    captures: Coordinates[]
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

const isHighlighted = (coords: Coordinates) =>
  highlightSquares.value.some(
    (coordinate) => coordinate && coordinatesEqual(coords, coordinate)
  )

const handleCoordsClick = (coords: Coordinates, event: MouseEvent) => {
  event.stopPropagation()
  event.preventDefault()

  if (isHighlighted(coords) && props.pieceFocus && focusedSquare.value) {
    if (
      enPassantTarget.value &&
      coordinatesEqual(enPassantTarget.value, coords)
    ) {
      emit('execute-node', {
        kind: 'move',
        type: 'en-passant',
        from: props.pieceFocus,
        to: coords,
      })
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
      emit('execute-node', {
        kind: 'move',
        type: 'castle',
        side: coords.file === 7 ? 'king' : 'queen',
        from: props.pieceFocus,
        to: coords,
      })
    } else {
      emit('execute-node', {
        kind: 'move',
        from: props.pieceFocus,
        to: coords,
      })
    }

    return
  }

  const square = props.board.getSquare(coords)

  emit('update-piece-focus', square ? coords : null)
}

const handlePromotion = (coords: Coordinates, piece: Piece) => {
  if (!props.pieceFocus) {
    return
  }

  showPromotionPopup.value = null

  emit('execute-node', {
    kind: 'move',
    type: 'promotion',
    from: props.pieceFocus,
    to: coords,
    promotionTo: piece,
  })

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

  if (decision === 'capture') {
    emit('execute-node', {
      kind: 'move',
      type: 'capture',
      from: props.pieceFocus,
      to: captureFocus.value,
    })
  } else {
    emit('execute-node', {
      kind: 'move',
      type: 'allegiance',
      from: props.pieceFocus,
      to: captureFocus.value,
    })
  }

  captureFocus.value = null

  emit('update-piece-focus', null)
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
          class="absolute"
          @click="
            (event) =>
              handleCoordsClick(indexToCoords(fileIndex, rankIndex), event)
          "
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
            v-if="captureFocus"
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
        </div>

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
</template>
