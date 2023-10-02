<script setup lang="ts">
import { PieceAllegiance } from '@decentm/allegiance-chess-core'

defineProps<{
  allegiance: PieceAllegiance
}>()
</script>

<style lang="scss" scoped>
svg {
  width: 100%;
  stroke: mix($chess-black, $chess-white, 50%);
  stroke-width: 1px;
  stroke-linejoin: round;
  stroke-linecap: round;

  &.allegiance {
    &-0 {
      fill: url('#0');
    }

    &-1 {
      fill: url('#1');
    }

    &-2 {
      fill: url('#2');
    }

    &-3 {
      fill: url('#3');
    }
  }
}
</style>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    :class="`allegiance-${allegiance}`"
    class="q-pa-sm"
  >
    <defs>
      <linearGradient id="0">
        <stop offset="0%" stop-color="#000" />
      </linearGradient>

      <!-- <linearGradient id="1" gradientTransform="rotate(100)">
        <stop offset="10%" stop-color="#FFF" />
        <stop offset="11%" stop-color="#000" />
      </linearGradient>

      <linearGradient id="2" gradientTransform="rotate(100)">
        <stop offset="10%" stop-color="#000" />
        <stop offset="11%" stop-color="#FFF" />
      </linearGradient> -->

      <linearGradient id="1" gradientTransform="rotate(90)">
        <stop offset="90%" stop-color="#000" />
        <stop offset="90%" stop-color="#FFF" />
      </linearGradient>

      <linearGradient id="2" gradientTransform="rotate(90)">
        <stop offset="90%" stop-color="#FFF" />
        <stop offset="90%" stop-color="#000" />
      </linearGradient>

      <linearGradient id="3">
        <stop offset="100%" stop-color="#FFF" />
      </linearGradient>
    </defs>

    <slot name="default" />
  </svg>
</template>
