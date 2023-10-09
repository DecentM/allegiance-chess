<script setup lang="ts">
import { computed, ref } from 'vue'

import { Notation, BoardSquare } from '@decentm/allegiance-chess-core'

import BackgroundLayer from './board/layers/background-layer.vue'
import InteractionLayer from './board/layers/interaction-layer.vue'
import IndicatorsLayer from './board/layers/indicators-layer.vue'
import PiecesLayer from './board/layers/pieces-layer.vue'

const props = defineProps<{
  squares: Array<Notation.Coordinates & BoardSquare>
  moveHistoryAst: Notation.RootNode
  checkMoves: Notation.MoveNode[]
  perspective: 'black' | 'white'
  playAs: Array<'black' | 'white'>
  validMoves: Notation.Node[]
  activeColour: 'white' | 'black'
  enPassantTarget: Notation.Coordinates | null
  loading: boolean
}>()

const emit = defineEmits<{
  (event: 'execute-node-index', value: number): void
}>()

const pieceFocus = ref<Notation.Coordinates | null>(null)

const handleExcuteNodeIndex = (index: number) => {
  emit('execute-node-index', index)
  pieceFocus.value = null
}

const lastMove = computed(() => {
  return (
    props.moveHistoryAst.children[props.moveHistoryAst.children.length - 1] ??
    null
  )
})
</script>

<style lang="scss" scoped>
.chess-board {
  max-height: calc(100vh - 6rem);

  aspect-ratio: 1 / 1;
}
</style>

<template>
  <div data-testid="chess-board" class="relative-position column chess-board">
    <div class="absolute full-width full-height">
      <background-layer
        :ranks="8"
        :files="8"
        :perspective="perspective"
        :loading="loading"
      />
    </div>

    <div class="absolute full-width full-height">
      <indicators-layer
        :valid-moves="validMoves"
        :check-moves="checkMoves"
        :squares="squares"
        :files="8"
        :ranks="8"
        :perspective="perspective"
        :piece-focus="pieceFocus"
        :last-move="lastMove"
      />
    </div>

    <div class="absolute full-width full-height">
      <pieces-layer :model-value="squares" :perspective="props.perspective" />
    </div>

    <div class="absolute full-width full-height">
      <interaction-layer
        @execute-node-index="handleExcuteNodeIndex"
        @update-piece-focus="(focus) => (pieceFocus = focus)"
        :piece-focus="pieceFocus"
        :squares="squares"
        :en-passant-target="enPassantTarget"
        :active-colour="activeColour"
        :files="8"
        :ranks="8"
        :perspective="perspective"
        :valid-moves="validMoves"
      />
    </div>
  </div>
</template>
