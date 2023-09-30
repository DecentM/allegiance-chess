<script setup lang="ts">
import PlayWrapper from './play/play-wrapper.vue'
</script>

<template>
  <q-no-ssr>
    <suspense>
      <play-wrapper />

      <template #fallback>
        <q-linear-progress indeterminate color="primary" />
      </template>
    </suspense>
  </q-no-ssr>
</template>
