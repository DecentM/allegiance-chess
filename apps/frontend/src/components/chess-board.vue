<script setup lang="ts">
import { computed } from 'vue'

import { Board, Notation, fileToLetter } from '@decentm/allegiance-chess-core'

import BoardTable from './board/board-table.vue'

const props = defineProps<{
  board: Board
  width: number
  perspective: 'black' | 'white'
  playAs: Array<'black' | 'white'>
}>()

const emit = defineEmits<{
  (event: 'execute-node', value: Partial<Notation.Node>): void
}>()

const sidebarWidth = computed(() => {
  return props.width / 8 / 2.5
})
</script>

<template>
  <div :style="{ width: `${width}px` }">
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
                  : 8 - fileIndex) as Notation.File
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
              {{
                perspective === 'white' ? 8 - rankIndex : 9 - (8 - rankIndex)
              }}
            </q-card-section>
          </q-card>
        </div>

        <div class="col">
          <board-table
            @execute-node="(node) => emit('execute-node', node)"
            :board="board"
            :perspective="perspective"
            :play-as="playAs"
            :width="width - sidebarWidth * 2"
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
              {{
                perspective === 'white' ? 8 - rankIndex : 9 - (8 - rankIndex)
              }}
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
                  : 8 - fileIndex) as Notation.File
              ).toUpperCase()
            }}
          </q-card-section>
        </q-card>
        <div :style="{ width: `${sidebarWidth}px` }"></div>
      </div>
    </div>
  </div>
</template>
