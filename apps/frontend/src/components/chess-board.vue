<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

import {
  Board,
  coordinatesEqual,
  fileToLetter,
  isPromotion,
  Coordinates,
  File,
  Rank,
  Piece,
  PieceAllegiance,
} from '@decentm/allegiance-chess-core'

import ChessPiece from './chess-piece.vue'
import PromotionSelector from './promotion-selector.vue'
import CaptureSelector from './capture-selector.vue'

import GameStartSound from '../assets/686544__troube__wooden-button-out.ogg'
import GameEndSound from '../assets/686544__troube__wooden-button-in.ogg'
import MoveSound from '../assets/270148__theriavirra__drumsticks-stagg-maple-7an-click-no3.wav'
import CheckSound from '../assets/85590__jankoehl__hit-wood09.wav'
import ChallengeSound from '../assets/342200__christopherderp__videogame-menu-button-click.wav'
import CaptureSound from '../assets/321083__benjaminnelan__wooden-click.wav'

const gameStartAudio = new Audio(GameStartSound)
const gameEndAudio = new Audio(GameEndSound)
const moveAudio = new Audio(MoveSound)
const checkAudio = new Audio(CheckSound)
const challengeAudio = new Audio(ChallengeSound)
const captureAudio = new Audio(CaptureSound)

moveAudio.volume = 0.2
captureAudio.volume = 0.3
challengeAudio.volume = 0.3

const props = defineProps<{
  modelValue: string
  width: number
}>()

onMounted(async () => {
  try {
    await gameStartAudio.play()
  } catch {
    // Will not work if there was no user interaction on the page yet
  }
})

const board = computed(() => {
  const result = new Board()

  result.importAFEN(props.modelValue)

  return result
})

const squares = computed(() => {
  return board.value.getSquares()
})

const pieceFocus = ref<Coordinates | null>(null)
const captureFocus = ref<Coordinates | null>(null)

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

const showPromotionPopup = ref<Coordinates | null>(null)
const promotionAllegiance = ref<PieceAllegiance | null>(null)

const handlePieceClick = (coords: Coordinates, event: MouseEvent) => {
  event.stopPropagation()

  const focusedSquare = pieceFocus.value
    ? board.value.getSquare(pieceFocus.value)
    : null

  if (isHighlighted(coords) && pieceFocus.value) {
    if (
      enPassantTarget.value &&
      coordinatesEqual(enPassantTarget.value, coords)
    ) {
      captureAudio.play()

      board.value.executeNode({
        kind: 'move',
        type: 'en-passant',
        from: pieceFocus.value,
        to: coords,
      })
      pieceFocus.value = null
    } else if (
      isPromotion(coords, board.value.activeColour) &&
      focusedSquare &&
      focusedSquare.piece === null
    ) {
      showPromotionPopup.value = coords

      const fromSquare = board.value.getSquare(pieceFocus.value)
      promotionAllegiance.value = fromSquare?.allegiance ?? null
    } else if (board.value.getSquare(coords)) {
      captureFocus.value = coords
    } else if (
      focusedSquare?.piece === 'K' &&
      Math.abs(pieceFocus.value.file - coords.file) > 1
    ) {
      board.value.executeNode({
        kind: 'move',
        type: 'castle',
        side: coords.file === 7 ? 'king' : 'queen',
        from: pieceFocus.value,
        to: coords,
      })
    } else {
      moveAudio.play()

      board.value.executeNode({
        kind: 'move',
        from: pieceFocus.value,
        to: coords,
      })
    }

    emit('update:modelValue', board.value.toAFEN())

    return
  }

  const square = board.value.getSquare(coords)

  if (!square) {
    pieceFocus.value = null
    return
  }

  pieceFocus.value = coords
}

const handlePromotion = (coords: Coordinates, piece: Piece) => {
  if (!pieceFocus.value) {
    return
  }

  showPromotionPopup.value = null

  board.value.executeNode({
    kind: 'move',
    type: 'promotion',
    from: pieceFocus.value,
    to: coords,
    promotionTo: piece,
  })

  emit('update:modelValue', board.value.toAFEN())
  pieceFocus.value = null
}

const handlePromotionDismiss = () => {
  showPromotionPopup.value = null
  promotionAllegiance.value = null
}

const handleCaptureDismiss = () => {
  captureFocus.value = null
}

const handleCaptureClick = (decision: 'capture' | 'challenge') => {
  if (!pieceFocus.value || !captureFocus.value) {
    return
  }

  if (decision === 'capture') {
    captureAudio.play()
    board.value.executeNode({
      kind: 'move',
      type: 'capture',
      from: pieceFocus.value,
      to: captureFocus.value,
    })
  } else {
    challengeAudio.play()
    board.value.executeNode({
      kind: 'move',
      type: 'allegiance',
      from: pieceFocus.value,
      to: captureFocus.value,
    })
  }

  captureFocus.value = null
  pieceFocus.value = null

  emit('update:modelValue', board.value.toAFEN())
}
</script>

<style lang="scss" scoped>
.rank {
  &:nth-child(odd) {
    > .file {
      &:nth-child(odd) {
        background-color: $chess-white;
        color: $chess-black;
      }

      &:nth-child(even) {
        background-color: $chess-black;
        color: $chess-white;
      }
    }
  }

  &:nth-child(even) {
    > .file {
      &:nth-child(even) {
        background-color: $chess-white;
        color: $chess-black;
      }

      &:nth-child(odd) {
        background-color: $chess-black;
        color: $chess-white;
      }
    }
  }
}

.move-placeholder {
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

  &.empty {
    &::before {
      height: 33%;
      width: 33%;
      left: 33%;
      top: 33%;
    }
  }

  &.target {
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
    &.empty {
      &::before {
        background-color: rgba(0, 0, 0, 0.2);
      }
    }

    &.target {
      &::before {
        border-color: rgba(0, 0, 0, 0.2);
      }
    }
  }
}
</style>

<template>
  <div
    data-testid="chess-board"
    class="relative"
    :style="{ width: props.width + 'px', height: props.width + 'px' }"
  >
    <div
      class="absolute overflow-hidden rounded-borders"
      data-testid="background"
    >
      <div class="rank row" v-for="(_, rankIndex) in 8" :key="rankIndex">
        <div
          v-for="(_, fileIndex) in 8"
          class="file col-1 text-center items-center relative-position move-placeholder"
          :class="{
            show: isHighlighted({
              file: (fileIndex + 1) as File,
              rank: (rankIndex + 1) as Rank,
            }),
            empty: !squares.find((coord) => coordinatesEqual(coord, {
              file: (fileIndex + 1) as File,
              rank: (rankIndex + 1) as Rank,
            })),
            target: squares.find((coord) => coordinatesEqual(coord, {
              file: (fileIndex + 1) as File,
              rank: (rankIndex + 1) as Rank,
            }))
          }"
          :key="fileIndex"
          :style="{
            width: props.width / 8 + 'px',
            height: props.width / 8 + 'px',
            transitionDelay: pieceFocus
              ? `${
                  Math.abs(pieceFocus.file - fileIndex) *
                  Math.abs(pieceFocus.rank - rankIndex) *
                  5
                }ms`
              : '0ms',
          }"
          @click="
            (event) => handlePieceClick({
              file: (fileIndex + 1) as File,
              rank: (rankIndex + 1) as Rank,
            }, event)
          "
        >
          <div
            class="absolute absolute-bottom-left q-ml-xs no-pointer-events non-selectable"
          >
            {{ fileToLetter((fileIndex + 1) as File) }}{{ rankIndex + 1 }}
          </div>

          <promotion-selector
            v-if="
              promotionAllegiance !== null &&
              (isPromotion({
                file: (fileIndex + 1) as File,
                rank: (rankIndex + 1) as Rank,
              }, 'white')
              || isPromotion({
                file: (fileIndex + 1) as File,
                rank: (rankIndex + 1) as Rank,
              }, 'black'))
            "
            :model-value="coordinatesEqual(showPromotionPopup, {
              file: (fileIndex + 1) as File,
              rank: (rankIndex + 1) as Rank,
            }) ?? false"
            :allegiance="promotionAllegiance"
            :size="props.width / 8"
            @click="(piece) => handlePromotion({
              file: (fileIndex + 1) as File,
              rank: (rankIndex + 1) as Rank,
            }, piece)"
            @dismiss="handlePromotionDismiss"
          />
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
            :data-testid="`piece-${fileToLetter(square.file)}${square.rank}`"
            @click="(event) => handlePieceClick(square, event)"
            :piece="square.piece"
            :allegiance="square.allegiance"
            :size="props.width / 8"
          />

          <capture-selector
            v-if="captureFocus"
            :model-value="coordinatesEqual(captureFocus, square) ?? false"
            :size="props.width / 8"
            @click="handleCaptureClick"
            @dismiss="handleCaptureDismiss"
          />
        </div>

        <div v-else></div>
      </div>
    </div>
  </div>
</template>
