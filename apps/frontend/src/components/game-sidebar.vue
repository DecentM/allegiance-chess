<script setup lang="ts">
import { Ref, computed, onMounted, ref, watch } from 'vue'
import { Notation } from '@decentm/allegiance-chess-core'
import { QScrollArea } from 'quasar'

import ChessPiece from './chess-piece.vue'

const props = defineProps<{
  moveHistory: Notation.RootNode
  activeColour: 'white' | 'black'
  ownColour: 'white' | 'black'
}>()

const rows = computed(() => {
  const result: Notation.Node[][] = []

  props.moveHistory.children.forEach((node) => {
    const lastRow = result.at(-1)

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
}
</style>

<template>
  <q-card flat bordered class="q-ma-md full-height column justify-between">
    <transition mode="out-in">
      <q-card-section
        class="bg-primary text-white q-mb-md"
        v-if="activeColour === ownColour"
      >
        <div class="text-h6">Your turn!</div>
      </q-card-section>

      <q-card-section class="bg-grey text-black q-mb-md" v-else>
        <div class="text-h6">Waiting for opponent...</div>
      </q-card-section>
    </transition>

    <div data-testid="">
      <q-separator />

      <q-scroll-area style="height: 500px" ref="moveHistoryScrollArea">
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
          <div class="col" v-if="row[0]">
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
                :size="24"
              />

              {{ Notation.writeNode(row[0]) }}
            </q-chip>
          </div>

          <transition mode="out-in">
            <div class="col" v-if="row[1]">
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
                  :size="24"
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
