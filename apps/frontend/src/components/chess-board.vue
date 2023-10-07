<script setup lang="ts">
import { computed, ref } from 'vue'

import { Notation, BoardSquare } from '@decentm/allegiance-chess-core'

import BackgroundLayer from './board/layers/background-layer.vue'
import InteractionLayer from './board/layers/interaction-layer.vue'
import IndicatorsLayer from './board/layers/indicators-layer.vue'
import PiecesLayer from './board/layers/pieces-layer.vue'

const props = defineProps<{
  // board: Board
  squares: Array<Notation.Coordinates & BoardSquare>
  moveHistoryAst: Notation.RootNode
  checkMoves: Notation.MoveNode[]
  width: number
  perspective: 'black' | 'white'
  playAs: Array<'black' | 'white'>
  roundedBorders?: boolean
  validMoves: Notation.Node[]
  activeColour: 'white' | 'black'
  enPassantTarget: Notation.Coordinates | null
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
  return props.moveHistoryAst.children.at(-1) ?? null
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
        :valid-moves="validMoves"
        :check-moves="checkMoves"
        :squares="squares"
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
        :model-value="squares"
        :perspective="props.perspective"
        :square-size="squareSize"
      />
    </div>

    <div class="absolute full-width full-height">
      <interaction-layer
        @execute-node-index="handleExcuteNodeIndex"
        @update-piece-focus="(focus) => (pieceFocus = focus)"
        :piece-focus="pieceFocus"
        :squares="squares"
        :en-passant-target="enPassantTarget"
        :active-colour="activeColour"
        :square-size="squareSize"
        :files="8"
        :ranks="8"
        :perspective="perspective"
        :valid-moves="validMoves"
      />
    </div>
  </div>
</template>
