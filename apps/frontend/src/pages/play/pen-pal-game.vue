<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { Board, Node } from '@decentm/allegiance-chess-core'

import ChessBoard from '../../components/chess-board.vue'
import AfenInfo from '../../components/afen-info.vue'

import { computed, ref } from 'vue'
import { Hex } from '../../lib/hex'
import { FenPreset } from '../../lib/boards'
import { useQuasar } from 'quasar'

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

const board = computed(() => {
  const result = new Board()

  result.importAFEN(afen.value)

  return result
})

const handleExecuteNode = (node: Partial<Node>) => {
  board.value.executeNode(node)

  router.push({
    path: `/play/pen-pal/${Hex.utf8ToHex(board.value.toAFEN())}`,
  })
}

const size = ref(800)

const q = useQuasar()

const handleResize = (newSize: { height: number; width: number }) => {
  if (q.screen.gt.md) {
    size.value = Math.min(newSize.width - newSize.width / 8 - 200, 1200)
    return
  }

  size.value = newSize.width - newSize.width / 8
}
</script>

<template>
  <q-card flat>
    <q-card-section class="row">
      <q-resize-observer @resize="handleResize" />

      <chess-board
        @execute-node="handleExecuteNode"
        :board="board"
        :perspective="board.activeColour"
        :play-as="['white', 'black']"
        :width="size"
      />

      <div class="col-lg col-md-12 full-width">
        <q-card flat bordered class="full-height">
          <q-card-section class="bg-primary q-mb-md">
            <q-item-label>Board information</q-item-label>
          </q-card-section>

          <afen-info :model-value="afen" />
        </q-card>
      </div>
    </q-card-section>
  </q-card>
</template>
