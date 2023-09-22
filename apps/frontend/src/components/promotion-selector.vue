<script setup lang="ts">
import { Piece, PieceAllegiance } from '@decentm/allegiance-chess-core'

import ChessPiece from './chess-piece.vue'

defineProps<{
  modelValue: boolean
  allegiance: PieceAllegiance
}>()

const emit = defineEmits<{
  (event: 'click', piece: Piece): void
  (event: 'dismiss'): void
}>()

const pieces: Piece[] = ['Q', 'N', 'R', 'B']

const handleDismiss = () => {
  emit('dismiss')
}
</script>

<style lang="scss" scoped>
.promotion-piece {
  width: 86px;
  height: 86px;
}
</style>

<template>
  <q-menu :model-value="modelValue" @update:model-value="handleDismiss">
    <q-list>
      <q-item
        clickable
        v-for="piece in pieces"
        :key="piece"
        class="q-pa-sm"
        @click="emit('click', piece)"
      >
        <q-item-section class="promotion-piece">
          <chess-piece :allegiance="allegiance" :piece="piece" :size="86" />
        </q-item-section>
      </q-item>
    </q-list>
  </q-menu>
</template>
