<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useQuasar } from 'quasar'

import { Board, AfenPreset } from '@decentm/allegiance-chess-core'

import type { BotWorkerMessage, BotWorkerResponse } from '../../lib/bot-worker'
import BotWorker from '../../lib/bot-worker?worker'

import ChessBoard from '../../components/chess-board.vue'
import GameSidebar from '../../components/game-sidebar.vue'
import GameOverDialog from '../../components/game-over-dialog.vue'

import { useGameover } from '../../hooks/game-over'
import { useBoardSize } from '../../hooks/board-size'

import { useBoardAudio } from '../../hooks/board-audio'

const afen = ref<string>('')
const moveHistory = ref<string>('')
const activeColour = ref<'white' | 'black'>('white')
const boardScore = ref(0)

const userSide = ref<'white' | 'black' | null>()
const audio = useBoardAudio()
const worker = ref<Worker | null>()

const board = computed(() => {
  return new Board(afen.value || AfenPreset.VanillaDefault, moveHistory.value)
})

const { gameOver } = useGameover(board)

const handleWorkerMessage = (messageEvent: MessageEvent<BotWorkerResponse>) => {
  const message = messageEvent.data

  switch (message.type) {
    case 'board-update':
      afen.value = message.afen
      moveHistory.value = message.moveHistory
      activeColour.value = message.activeColour
      boardScore.value = message.boardScore
      break

    case 'node-execution':
      audio?.playNode(message.node)
      break
  }

  if (
    message.type === 'board-update' &&
    message.activeColour !== userSide.value &&
    !gameOver.value
  ) {
    worker.value?.postMessage({ type: 'bot-move' } as BotWorkerMessage)
  }
}

onMounted(() => {
  worker.value = new BotWorker()

  worker.value.addEventListener('message', handleWorkerMessage)
  worker.value.postMessage({ type: 'reset' } as BotWorkerMessage)

  userSide.value = Math.random() > 0.5 ? 'white' : 'black'
})

onBeforeUnmount(() => {
  worker.value?.removeEventListener('message', handleWorkerMessage)

  worker.value?.postMessage({ type: 'reset' } as BotWorkerMessage)
})

const handleExecuteNodeIndex = (index: number) => {
  worker.value?.postMessage({
    type: 'execute-move-index',
    index,
  } as BotWorkerMessage)
}

const q = useQuasar()
const size = useBoardSize()
</script>

<template>
  <q-card flat class="full-width">
    <q-card-section
      v-if="userSide"
      :horizontal="q.screen.gt.sm"
      :class="{ 'q-px-none': q.screen.lt.sm }"
    >
      <q-card-section
        :style="{ width: `${size}px` }"
        :class="{ 'q-px-none': q.screen.lt.sm }"
      >
        <chess-board
          @execute-node-index="handleExecuteNodeIndex"
          :board="board"
          :perspective="userSide"
          :play-as="['white', 'black']"
          :width="size"
          :rounded-borders="q.screen.gt.xs"
        />
      </q-card-section>

      <q-card-section class="q-mb-md full-width">
        <game-sidebar
          :move-history="board.getMoveHistoryAst()"
          :active-colour="activeColour"
          :own-colour="userSide"
          :afen="board.toAFEN()"
          :game-over="gameOver"
        >
          <q-item>
            <q-item-section class="q-mt-sm q-mb-sm">
              <q-item-label>Evaluation</q-item-label>
              <q-item-label caption lines="2">{{ boardScore }}</q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-icon name="exposure_plus_1" />
            </q-item-section>
          </q-item>
        </game-sidebar>
      </q-card-section>
    </q-card-section>

    <game-over-dialog v-if="gameOver" :node="gameOver" />
  </q-card>
</template>
