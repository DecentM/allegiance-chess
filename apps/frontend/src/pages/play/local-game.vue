<script setup lang="ts">
import { useRoute } from 'vue-router'

import ChessBoard from '../../components/chess-board.vue'
import AfenSidebar from '../../components/afen-sidebar.vue'

import { ref } from 'vue'

const route = useRoute()
const afen = ref('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w - - 0 0')
</script>

<template>
  <q-card flat v-if="route.params.mode === 'multiplayer'">
    <q-card-section horizontal>
      <chess-board v-model="afen" :width="800" />

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
