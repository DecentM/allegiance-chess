<script setup lang="ts">
import { Notation, fileToLetter } from '@decentm/allegiance-chess-core'
import { useQuasar } from 'quasar'

defineProps<{
  ranks: number
  files: number
  perspective: 'black' | 'white'
  loading: boolean
}>()

const q = useQuasar()
</script>

<style lang="scss" scoped>
.background-layer {
  z-index: 1;

  transition-property: filter;
  transition-duration: 0.3s;
  transition-timing-function: ease-in-out;
}

.rank {
  &:nth-child(odd) {
    > .file {
      &:nth-child(odd) {
        background-color: $chess-white;
        color: $chess-black;
      }

      &:nth-child(even) {
        background-color: $chess-black;
        color: $chess-white;
      }
    }
  }

  &:nth-child(even) {
    > .file {
      &:nth-child(even) {
        background-color: $chess-white;
        color: $chess-black;
      }

      &:nth-child(odd) {
        background-color: $chess-black;
        color: $chess-white;
      }
    }
  }
}

.loading {
  filter: grayscale(0.5);
}
</style>

<template>
  <div
    :class="{ loading }"
    class="row column full-width full-height no-pointer-events background-layer"
    data-testid="background"
  >
    <div
      class="rank col row full-width"
      v-for="(_, rankIndex) in ranks"
      :key="rankIndex"
    >
      <div
        v-for="(_, fileIndex) in files"
        :key="fileIndex"
        class="file col relative-position"
        :class="{
          'text-h6 text-bold': q.screen.gt.sm,
          'text-subtitle1 text-bold': q.screen.sm,
          'text-subtitle2': q.screen.lt.sm,
        }"
      >
        <span
          v-if="rankIndex === 7"
          class="absolute absolute-bottom-right q-px-sm"
        >
          {{
            fileToLetter(
              (perspective === 'white'
                ? 9 - (8 - fileIndex)
                : 8 - fileIndex) as Notation.File
            )
          }}
        </span>

        <span v-if="fileIndex === 0" class="absolute absolute-top-left q-pa-xs">
          {{ perspective === 'white' ? 8 - rankIndex : 9 - (8 - rankIndex) }}
        </span>
      </div>
    </div>
  </div>
</template>
