<script setup lang="ts">
import { Notation, PieceAllegiance } from '@decentm/allegiance-chess-core'

import ChessPiece from './chess-piece.vue'

defineProps<{
  modelValue: boolean
  allegiance: PieceAllegiance
}>()

const emit = defineEmits<{
  (event: 'click', piece: Notation.Piece): void
  (event: 'dismiss'): void
}>()

const pieces: Notation.Piece[] = ['Q', 'N', 'R', 'B']

const handleDismiss = () => {
  emit('dismiss')
}
</script>

<style lang="scss" scoped>
.promotion-piece {
  width: 92px;
  height: 92px;
}
</style>

<template>
  <q-menu cover :model-value="modelValue" @update:model-value="handleDismiss">
    <q-list>
      <q-item
        clickable
        v-for="piece in pieces"
        :key="piece"
        class="q-pa-sm"
        @click="emit('click', piece)"
      >
        <q-item-section class="promotion-piece items-center">
          <chess-piece :allegiance="allegiance" :piece="piece" :size="92" />
        </q-item-section>
      </q-item>
    </q-list>
  </q-menu>
</template>
