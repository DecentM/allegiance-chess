<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

import { AfenPreset, Board, Notation } from '@decentm/allegiance-chess-core'
import { findBestMove } from '@decentm/allegiance-chess-bot'

import ChessBoard from '../../components/chess-board.vue'
import GameSidebar from '../../components/game-sidebar.vue'
import GameOverDialog from '../../components/game-over-dialog.vue'

import { Hex } from '../../lib/hex'
import { useBoardAudio } from '../../hooks/board-audio'
import { useGameover } from '../../hooks/game-over'
import { useBoardSize } from '../../hooks/board-size'

const route = useRoute()
const router = useRouter()

const afen = computed(() => {
  const hex = Array.isArray(route.params.state)
    ? route.params.state[0]
    : route.params.state

  if (!hex) {
    return AfenPreset.VanillaDefault
  }

  return Hex.hexToUtf8(hex)
})

const moveHistory = computed(() => {
  const hex = Array.isArray(route.params.history)
    ? route.params.history[0]
    : route.params.history

  if (!hex) {
    return ''
  }

  return Hex.hexToUtf8(hex)
})

const board = computed(() => {
  const b = new Board()

  if (afen.value) b.importAFEN(afen.value)
  if (moveHistory.value) b.importMoveHistory(moveHistory.value)

  return b
})

const audio = useBoardAudio()

const handleExecuteNode = (node: Partial<Notation.Node>) => {
  const index = board.value.findMoveIndex(node)

  if (index === -1) {
    return
  }

  board.value.executeMoveIndex(index)

  audio?.playNode(node)

  router.push({
    path: `/play/bot/${Hex.utf8ToHex(board.value.toAFEN())}/${Hex.utf8ToHex(
      board.value.getMoveHistory()
    )}`,
  })
}

const { gameOver } = useGameover(board)

const q = useQuasar()
const size = useBoardSize()

const playerSide = ref<'white' | 'black' | null>(null)

const botTurn = computed(() => {
  return board.value.activeColour !== playerSide.value
})

const makeBotMove = () => {
  const botResult = findBestMove(board.value, 3)

  if (!botResult) {
    return
  }

  board.value.executeMoveIndex(botResult.index)

  router.push({
    path: `/play/bot/${Hex.utf8ToHex(board.value.toAFEN())}/${Hex.utf8ToHex(
      board.value.getMoveHistory()
    )}`,
  })
}

watch(botTurn, (newValue) => {
  if (!newValue) {
    return
  }

  const timeout = setTimeout(() => {
    makeBotMove()
  }, 1)

  return () => clearTimeout(timeout)
})

onMounted(() => {
  if (!playerSide.value) {
    playerSide.value = Math.random() > 0.5 ? 'white' : 'black'
  }

  if (botTurn.value) {
    makeBotMove()
  }
})
</script>

<template>
  <q-card flat class="full-width">
    <q-card-section
      :horizontal="q.screen.gt.sm"
      :class="{ 'q-px-none': q.screen.lt.sm }"
    >
      <q-card-section
        :style="{ width: `${size}px` }"
        :class="{ 'q-px-none': q.screen.lt.sm }"
      >
        <chess-board
          @execute-node="handleExecuteNode"
          :board="board"
          :perspective="playerSide || 'white'"
          :play-as="['white', 'black']"
          :width="size"
          :rounded-borders="q.screen.gt.xs"
        />
      </q-card-section>

      <q-card-section class="q-mb-md full-width">
        <game-sidebar
          :move-history="board.getMoveHistoryAst()"
          :active-colour="board.activeColour"
          :own-colour="board.activeColour"
          :afen="board.toAFEN()"
        />
      </q-card-section>
    </q-card-section>

    <game-over-dialog v-if="gameOver" :node="gameOver" />
  </q-card>
</template>
