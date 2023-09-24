<script setup lang="ts">
import { computed, onMounted } from 'vue'

import { Board, File, Node, fileToLetter } from '@decentm/allegiance-chess-core'

import BoardTable from './board/board-table.vue'

import GameStartSound from '../assets/686544__troube__wooden-button-out.ogg'
// import GameEndSound from '../assets/686544__troube__wooden-button-in.ogg'
import MoveSound from '../assets/270148__theriavirra__drumsticks-stagg-maple-7an-click-no3.wav'
// import CheckSound from '../assets/85590__jankoehl__hit-wood09.wav'
import ChallengeSound from '../assets/342200__christopherderp__videogame-menu-button-click.wav'
import CaptureSound from '../assets/321083__benjaminnelan__wooden-click.wav'

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

const sidebarWidth = computed(() => {
  return props.width / 8 / 2.5
})
</script>

<template>
  <div class="column">
    <div class="row" :style="{ height: `${sidebarWidth}px` }">
      <div :style="{ width: `${sidebarWidth}px` }"></div>
      <q-card
        v-for="(_, fileIndex) in 8"
        :key="fileIndex"
        class="col column full-height justify-center"
        flat
      >
        <q-card-section class="text-center q-pa-none">
          {{
            fileToLetter(
              (perspective === 'white'
                ? 9 - (8 - fileIndex)
                : 8 - fileIndex) as File
            ).toUpperCase()
          }}
        </q-card-section>
      </q-card>
      <div :style="{ width: `${sidebarWidth}px` }"></div>
    </div>

    <div class="row">
      <div class="column" :style="{ width: `${sidebarWidth}px` }">
        <q-card
          v-for="(_, rankIndex) in 8"
          :key="rankIndex"
          class="col column full-height justify-center text-center"
          flat
        >
          <q-card-section class="q-pa-none">
            {{ perspective === 'white' ? 8 - rankIndex : 9 - (8 - rankIndex) }}
          </q-card-section>
        </q-card>
      </div>

      <div class="col">
        <board-table
          @execute-node="(node) => emit('execute-node', node)"
          :board="board"
          :perspective="perspective"
          :play-as="playAs"
          :width="width - sidebarWidth"
        />
      </div>

      <div class="column" :style="{ width: `${sidebarWidth}px` }">
        <q-card
          v-for="(_, rankIndex) in 8"
          :key="rankIndex"
          class="col column full-height justify-center text-center"
          flat
        >
          <q-card-section class="q-pa-none">
            {{ perspective === 'white' ? 8 - rankIndex : 9 - (8 - rankIndex) }}
          </q-card-section>
        </q-card>
      </div>
    </div>

    <div class="row" :style="{ height: `${sidebarWidth}px` }">
      <div :style="{ width: `${sidebarWidth}px` }"></div>
      <q-card
        v-for="(_, fileIndex) in 8"
        :key="fileIndex"
        class="col column full-height justify-center"
        flat
      >
        <q-card-section class="text-center q-pa-none">
          {{
            fileToLetter(
              (perspective === 'white'
                ? 9 - (8 - fileIndex)
                : 8 - fileIndex) as File
            ).toUpperCase()
          }}
        </q-card-section>
      </q-card>
      <div :style="{ width: `${sidebarWidth}px` }"></div>
    </div>
  </div>
</template>
