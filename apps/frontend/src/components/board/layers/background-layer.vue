<script setup lang="ts">
defineProps<{
  ranks: number
  files: number
}>()
</script>

<style lang="scss" scoped>
.background-layer {
  z-index: 1;
  border-radius: 8px;
  overflow: hidden;
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
</style>

<template>
  <div
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
        class="file col"
      ></div>
    </div>
  </div>
</template>
