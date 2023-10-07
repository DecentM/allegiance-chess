<script setup lang="ts">
import { useQuasar } from 'quasar'

const q = useQuasar()
</script>

<template>
  <q-card-section
    :horizontal="q.screen.gt.sm"
    class="q-gutter-md q-pa-none col row"
  >
    <div class="col-sm col-xs-12">
      <slot name="board" />
    </div>

    <div class="col-xl-2 col-lg-3 col-sm-5 col-xs-12">
      <slot name="sidebar" />
    </div>

    <slot />
  </q-card-section>
</template>
