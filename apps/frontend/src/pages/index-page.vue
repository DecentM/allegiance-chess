<script setup lang="ts">
import { ref } from 'vue'

import ChessBoard from '../components/chess-board.vue'
import AfenSidebar from '../components/afen-sidebar.vue'

const afen = ref(
  'r3kb>n>r>/pppbq2p>/2n2p2/1P1pp1p1/6P1/2PP1N>1B>/P3PP1P>/RNBQK2R> b kqKQ - 7 14'
)
</script>

<template>
  <q-page class="row items-center justify-evenly">
    <q-card flat>
      <q-card-section horizontal>
        <chess-board v-model="afen" :draggable="false" :width="800" />

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
  </q-page>
</template>
