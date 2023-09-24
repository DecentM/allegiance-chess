<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

import { Board, Coordinates, Node } from '@decentm/allegiance-chess-core'

import BackgroundLayer from './layers/background-layer.vue'
import InteractionLayer from './layers/interaction-layer.vue'
import IndicatorsLayer from './layers/indicators-layer.vue'
import PiecesLayer from './layers/pieces-layer.vue'

import GameStartSound from '../../assets/686544__troube__wooden-button-out.ogg'
// import GameEndSound from '../../assets/686544__troube__wooden-button-in.ogg'
import MoveSound from '../../assets/270148__theriavirra__drumsticks-stagg-maple-7an-click-no3.wav'
// import CheckSound from '../../assets/85590__jankoehl__hit-wood09.wav'
import ChallengeSound from '../../assets/342200__christopherderp__videogame-menu-button-click.wav'
import CaptureSound from '../../assets/321083__benjaminnelan__wooden-click.wav'

const gameStartAudio = new Audio(GameStartSound)
// const gameEndAudio = new Audio(GameEndSound)
const moveAudio = new Audio(MoveSound)
// const checkAudio = new Audio(CheckSound)
const challengeAudio = new Audio(ChallengeSound)
const captureAudio = new Audio(CaptureSound)

moveAudio.volume = 0.2
captureAudio.volume = 0.3
challengeAudio.volume = 0.3

const props = defineProps<{
  board: Board
  width: number
  perspective: 'black' | 'white'
  playAs: Array<'black' | 'white'>
}>()

onMounted(async () => {
  try {
    await gameStartAudio.play()
  } catch {
    // Will not work if there was no user interaction on the page yet
  }
})

const emit = defineEmits<{
  (event: 'execute-node', value: Partial<Node>): void
}>()

const squareSize = computed(() => {
  return props.width / 8
})

const pieceFocus = ref<Coordinates | null>(null)

const handleExcuteNode = (node: Partial<Node>) => {
  emit('execute-node', node)
  pieceFocus.value = null
}
</script>

<template>
  <div
    data-testid="chess-board"
    class="relative-position column"
    :style="{ width: props.width + 'px', height: props.width + 'px' }"
  >
    <div class="absolute full-width full-height">
      <background-layer :ranks="8" :files="8" />
    </div>

    <div class="absolute full-width full-height">
      <indicators-layer
        :board="board"
        :square-size="squareSize"
        :files="8"
        :ranks="8"
        :perspective="perspective"
        :piece-focus="pieceFocus"
      />
    </div>

    <div class="absolute full-width full-height">
      <pieces-layer
        :model-value="board.getSquares()"
        :perspective="props.perspective"
        :square-size="squareSize"
      />
    </div>

    <div class="absolute full-width full-height">
      <interaction-layer
        @execute-node="handleExcuteNode"
        @update-piece-focus="(focus) => (pieceFocus = focus)"
        :piece-focus="pieceFocus"
        :board="board"
        :square-size="squareSize"
        :files="8"
        :ranks="8"
        :perspective="props.perspective"
      />
    </div>
  </div>
</template>
