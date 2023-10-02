<script setup lang="ts">
import { computed } from 'vue'
import { Notation } from '@decentm/allegiance-chess-core'

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
</style>

<template>
  <q-card flat bordered class="q-ma-md">
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

    <q-card-section
      v-for="(row, index) in rows"
      :key="index"
      horizontal
      class="row q-py-none q-mx-md"
    >
      <div class="col" v-if="row[0]">
        <q-chip class="white-move">
          {{ Notation.writeNode(row[0]) }}
        </q-chip>
      </div>

      <div class="col" v-if="row[1]">
        <q-chip class="black-move">
          {{ Notation.writeNode(row[1]) }}
        </q-chip>
      </div>
    </q-card-section>
  </q-card>
</template>
