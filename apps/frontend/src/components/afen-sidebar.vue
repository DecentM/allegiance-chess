<script setup lang="ts">
import { computed } from 'vue'
import { Board } from '@decentm/allegiance-chess-core'

import ChessPiece from './chess-piece.vue'

const props = defineProps<{
  modelValue: string
}>()

const board = computed(() => {
  const result = new Board()

  result.importAFEN(props.modelValue)

  return result
})

const activeColour = computed(() => {
  if (!board.value) {
    return
  }

  return board.value.activeColour
})

const halfmoveClock = computed(() => {
  if (!board.value) {
    return
  }

  return board.value.halfmoveClock
})

const fullmoveNumber = computed(() => {
  if (!board.value) {
    return
  }

  return board.value.fullmoveNumber
})

const castlingRights = computed(() => {
  if (!board.value) {
    return
  }

  return board.value.castlingRights
})
</script>

<style lang="scss" scoped>
.afen-sidebar-list {
  max-width: 24rem;
}
</style>

<template>
  <q-list class="afen-sidebar-list">
    <q-item>
      <q-item-section>
        <q-item-label>AFEN</q-item-label>
        <q-item-label caption lines="2">{{ modelValue }}</q-item-label>
      </q-item-section>

      <q-item-section side>
        <q-icon name="edit" />
      </q-item-section>
    </q-item>

    <q-separator spaced inset />

    <q-item>
      <q-item-section>
        <q-item-label>Next move</q-item-label>
        <q-item-label caption lines="2">{{ activeColour }}</q-item-label>
      </q-item-section>

      <q-item-section side>
        <q-icon name="edit" />
      </q-item-section>
    </q-item>

    <q-separator spaced inset />

    <q-item>
      <q-item-section>
        <q-item-label>Halfmove clock</q-item-label>
        <q-item-label caption lines="2">{{ halfmoveClock }}</q-item-label>
      </q-item-section>

      <q-item-section side>
        <q-icon name="edit" />
      </q-item-section>
    </q-item>

    <q-separator spaced inset />

    <q-item>
      <q-item-section>
        <q-item-label>Fullmove number</q-item-label>
        <q-item-label caption lines="2">{{ fullmoveNumber }}</q-item-label>
      </q-item-section>

      <q-item-section side>
        <q-icon name="edit" />
      </q-item-section>
    </q-item>

    <q-separator spaced inset />

    <q-item>
      <q-item-section>
        <q-item-label>Castling rights</q-item-label>
        <q-item-label caption lines="2">
          <div class="row">
            <chess-piece
              v-if="castlingRights?.white.includes('queen')"
              :allegiance="3"
              piece="Q"
              :size="24"
            />
            <chess-piece
              v-if="castlingRights?.white.includes('king')"
              :allegiance="3"
              piece="K"
              :size="24"
            />
            <chess-piece
              v-if="castlingRights?.black.includes('queen')"
              :allegiance="0"
              piece="Q"
              :size="24"
            />
            <chess-piece
              v-if="castlingRights?.black.includes('king')"
              :allegiance="0"
              piece="K"
              :size="24"
            />
          </div>
        </q-item-label>
      </q-item-section>

      <q-item-section side>
        <q-icon name="edit" />
      </q-item-section>
    </q-item>
  </q-list>
</template>
