<script setup lang="ts">
import { Ref, computed, onMounted, ref, watch } from 'vue'
import { Notation } from '@decentm/allegiance-chess-core'
import { QScrollArea } from 'quasar'

import ChessPiece from './chess-piece.vue'
import { useNotify } from '../hooks/notify'

const props = defineProps<{
  moveHistory: Notation.RootNode
  activeColour: 'white' | 'black'
  ownColour: 'white' | 'black'
  afen: string
  gameOver: Notation.GameOverNode | null
}>()

const rows = computed(() => {
  const result: Notation.Node[][] = []

  props.moveHistory.children.forEach((node) => {
    const lastRow = result[result.length - 1]

    if (!lastRow || lastRow.length !== 1) {
      result.push([node])
      return
    }

    lastRow.push(node)
  })

  return result
})

const moveHistoryScrollArea: Ref<QScrollArea | null> = ref(null)

watch(rows, () => {
  if (!moveHistoryScrollArea.value) {
    return
  }

  moveHistoryScrollArea.value.setScrollPosition(
    'vertical',
    rows.value.length * 36,
    1000
  )
})

onMounted(() => {
  if (!moveHistoryScrollArea.value) {
    return
  }

  moveHistoryScrollArea.value.setScrollPosition(
    'vertical',
    rows.value.length * 36,
    1000
  )
})

const { notify } = useNotify()

const handleAFENCopy = () => {
  if (!props.afen) {
    return
  }

  try {
    navigator.clipboard.writeText(props.afen)

    notify({
      message: 'AFEN copied to clipboard',
      icon: 'content_copy',
    })
  } catch {
    notify({
      message: 'Could not write to clipboard',
      icon: 'close',
      iconColor: 'red',
    })
  }
}
</script>

<style lang="scss" scoped>
.white-move {
  background-color: $chess-white;
  color: $chess-black;
}

.black-move {
  background-color: $chess-black;
  color: $chess-white;
}

.highlight {
  background-color: $chess-highlight;
  color: $chess-black;
}

.chip-piece {
  height: 24px;
}
</style>

<template>
  <q-card
    flat
    square
    class="column justify-between no-wrap full-height"
    data-testid="game-sidebar"
  >
    <transition mode="out-in">
      <q-card-section
        class="bg-primary text-white"
        v-if="!gameOver && activeColour === ownColour"
        data-testid="your-turn-indicator"
      >
        <div class="text-h6">Your turn!</div>
      </q-card-section>

      <q-card-section
        data-testid="waiting-for-opponent-indicator"
        class="bg-grey text-black"
        v-else-if="!gameOver"
      >
        <div class="text-h6">Waiting for opponent...</div>
      </q-card-section>

      <q-card-section
        class="bg-negative text-white q-mb-md"
        data-testid="game-over-indicator"
        v-else
      >
        <div class="text-h6">Game over!</div>
      </q-card-section>
    </transition>

    <slot />

    <div data-testid="afen">
      <q-separator />

      <q-item clickable v-ripple @click="handleAFENCopy">
        <q-item-section class="q-mt-sm q-mb-sm">
          <q-item-label>AFEN</q-item-label>
          <q-item-label v-if="afen" caption lines="2">{{ afen }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-icon name="edit" />
        </q-item-section>
      </q-item>
    </div>

    <div data-testid="move-history" class="col">
      <q-separator />

      <q-scroll-area ref="moveHistoryScrollArea" class="full-height">
        <q-card-section
          v-for="(row, index) in rows"
          :key="index"
          horizontal
          class="row q-py-none q-mx-md"
          :class="{
            'q-pt-md': index === 0,
            'q-pb-md': index === rows.length - 1,
          }"
        >
          <div class="col-6" v-if="row[0]">
            <q-chip
              :ripple="false"
              class="white-move"
              :class="{
                highlight: row[0].kind !== 'move',
              }"
            >
              <chess-piece
                v-if="row[0].kind === 'move' && row[0].piece"
                :piece="row[0].piece"
                :allegiance="3"
                class="chip-piece"
              />

              {{ Notation.writeNode(row[0]) }}
            </q-chip>
          </div>

          <transition mode="out-in">
            <div class="col-6" v-if="row[1]">
              <q-chip
                :ripple="false"
                class="black-move"
                :class="{
                  highlight: row[1].kind !== 'move',
                }"
              >
                <chess-piece
                  v-if="row[1].kind === 'move' && row[1].piece"
                  :piece="row[1].piece"
                  :allegiance="0"
                  class="chip-piece"
                />

                {{ Notation.writeNode(row[1]) }}
              </q-chip>
            </div>
          </transition>
        </q-card-section>
      </q-scroll-area>
    </div>
  </q-card>
</template>
