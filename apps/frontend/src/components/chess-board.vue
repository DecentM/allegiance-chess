<script setup lang="ts">
import { computed, ref } from 'vue'

import { Board, Notation } from '@decentm/allegiance-chess-core'

import BackgroundLayer from './board/layers/background-layer.vue'
import InteractionLayer from './board/layers/interaction-layer.vue'
import IndicatorsLayer from './board/layers/indicators-layer.vue'
import PiecesLayer from './board/layers/pieces-layer.vue'

const props = defineProps<{
  board: Board
  width: number
  perspective: 'black' | 'white'
  playAs: Array<'black' | 'white'>
  roundedBorders?: boolean
}>()

const emit = defineEmits<{
  (event: 'execute-node-index', value: number): void
}>()

const squareSize = computed(() => {
  return props.width / 8
})

const pieceFocus = ref<Notation.Coordinates | null>(null)

const handleExcuteNodeIndex = (index: number) => {
  emit('execute-node-index', index)
  pieceFocus.value = null
}

const lastMove = computed(() => {
  const ast = props.board.getMoveHistoryAst()

  return ast.children.at(-1) ?? null
})
</script>

<template>
  <div
    data-testid="chess-board"
    class="relative-position column"
    :class="{ 'rounded-borders overflow-hidden': roundedBorders }"
    :style="{ width: props.width + 'px', height: props.width + 'px' }"
  >
    <div class="absolute full-width full-height">
      <background-layer :ranks="8" :files="8" :perspective="perspective" />
    </div>

    <div class="absolute full-width full-height">
      <indicators-layer
        :board="board"
        :square-size="squareSize"
        :files="8"
        :ranks="8"
        :perspective="perspective"
        :piece-focus="pieceFocus"
        :last-move="lastMove"
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
        @execute-node-index="handleExcuteNodeIndex"
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
