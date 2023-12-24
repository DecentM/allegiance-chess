<script setup lang="ts">
import { useQuasar } from 'quasar'
import { computed, onMounted } from 'vue'

import GameLayout from '../../components/game-layout.vue'

import ChessBoard from '../../components/chess-board.vue'
import GameSidebar from '../../components/game-sidebar.vue'
import GameOverDialog from '../../components/game-over-dialog.vue'

import { useBoardWorker } from '../../hooks/board-worker'

const autoplayFor = computed<Array<'white' | 'black'>>(() => {
  return ['black', 'white']
})

const board = useBoardWorker({
  autoplayFor,
})

onMounted(() => board.reset())

const q = useQuasar()
</script>

<template>
  <game-layout>
    <template #board>
      <chess-board
        @execute-node-index="board.executeMoveIndex"
        :active-colour="board.activeColour.value"
        :check-moves="board.checkMoves.value"
        :en-passant-target="board.enPassantTarget.value"
        :move-history-ast="board.moveHistoryAst.value"
        :squares="board.squares.value"
        :perspective="'white'"
        :play-as="[]"
        :rounded-borders="q.screen.gt.xs"
        :valid-moves="board.validMoves.value"
        :loading="board.loading.value"
      />
    </template>

    <template #sidebar>
      <game-sidebar
        :move-history="board.moveHistoryAst.value"
        :active-colour="board.activeColour.value"
        :own-colour="'white'"
        :afen="board.afen.value"
        :game-over="board.gameOver.value"
      >
        <q-item>
          <q-item-section class="q-mt-sm q-mb-sm">
            <q-item-label>Opening</q-item-label>
            <q-item-label caption lines="2">
              {{ board.opening.value || 'unknown' }}
            </q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-icon name="book" />
          </q-item-section>
        </q-item>

        <q-separator />

        <q-item>
          <q-item-section class="q-mt-sm q-mb-sm">
            <q-item-label>Board value</q-item-label>
            <q-item-label caption lines="2">
              {{ board.boardScore.value.toPrecision(3) }}
            </q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-icon name="exposure_plus_1" />
          </q-item-section>
        </q-item>
      </game-sidebar>
    </template>

    <template #default>
      <game-over-dialog
        v-if="board.gameOver.value"
        :node="board.gameOver.value"
      />
    </template>
  </game-layout>
</template>
