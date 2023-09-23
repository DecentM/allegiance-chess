<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'

import ChessBoard from '../../components/chess-board.vue'
import AfenSidebar from '../../components/afen-sidebar.vue'

import { computed } from 'vue'
import { Hex } from '../../lib/hex'
import { FenPreset } from '../../lib/boards'

const route = useRoute()
const router = useRouter()

const afen = computed(() => {
  const hex = Array.isArray(route.params.state)
    ? route.params.state[0]
    : route.params.state

  if (!hex) {
    return FenPreset.VanillaDefault
  }

  return Hex.hexToUtf8(hex)
})

const handleStateUpdate = (afen: string) => {
  router.push({
    path: `/play/pen-pal/${Hex.utf8ToHex(afen)}`,
  })
}
</script>

<template>
  <q-card flat>
    <q-card-section horizontal>
      <chess-board
        :model-value="afen"
        @update:model-value="handleStateUpdate"
        :width="800"
      />

      <div class="col q-ml-md">
        <q-card flat bordered class="full-height">
          <q-card-section class="bg-primary q-mb-md">
            <q-item-label>Board information</q-item-label>
          </q-card-section>

          <afen-sidebar :model-value="afen" />
        </q-card>
      </div>
    </q-card-section>
  </q-card>
</template>
