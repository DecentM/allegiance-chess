<script setup lang="ts">
import { useQuasar } from 'quasar'
import { onMounted } from 'vue'

import { useBoardWorker } from '../../hooks/board-worker'
import ChessBoard from '../../components/chess-board.vue'
import GameSidebar from '../../components/game-sidebar.vue'
import GameOverDialog from '../../components/game-over-dialog.vue'

import { useBoardSize } from '../../hooks/board-size'

const board = useBoardWorker({
  autoplayFor: ['black'],
})

onMounted(() => board.reset())

const q = useQuasar()
const size = useBoardSize()
</script>

<template>
  <q-card flat class="full-width">
    <q-card-section
      v-if="board.ready.value"
      :horizontal="q.screen.gt.sm"
      :class="{ 'q-px-none': q.screen.lt.sm }"
    >
      <q-card-section
        :style="{ width: `${size}px` }"
        :class="{ 'q-px-none': q.screen.lt.sm }"
      >
        <chess-board
          @execute-node-index="board.executeMoveIndex"
          :active-colour="board.activeColour.value"
          :check-moves="board.checkMoves.value"
          :en-passant-target="board.enPassantTarget.value"
          :move-history-ast="board.moveHistoryAst.value"
          :squares="board.squares.value"
          :perspective="'white'"
          :play-as="['white', 'black']"
          :width="size"
          :rounded-borders="q.screen.gt.xs"
          :valid-moves="board.validMoves.value"
        />
      </q-card-section>

      <q-card-section class="q-mb-md full-width">
        <game-sidebar
          :move-history="board.moveHistoryAst.value"
          :active-colour="board.activeColour.value"
          :own-colour="'white'"
          :afen="board.afen.value"
          :game-over="board.gameOver.value"
        >
          <q-item>
            <q-item-section class="q-mt-sm q-mb-sm">
              <q-item-label>Evaluation</q-item-label>
              <q-item-label caption lines="2">{{
                board.boardScore.value
              }}</q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-icon name="exposure_plus_1" />
            </q-item-section>
          </q-item>
        </game-sidebar>
      </q-card-section>
    </q-card-section>

    <game-over-dialog
      v-if="board.gameOver.value"
      :node="board.gameOver.value"
    />
  </q-card>
</template>
