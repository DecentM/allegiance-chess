<script setup lang="ts">
import { Notation, PieceAllegiance } from '@decentm/allegiance-chess-core'

import PieceSvg from './piece-svg.vue'

import BishopIcon from './pieces/bishop-icon.vue'
import KingIcon from './pieces/king-icon.vue'
import KnightIcon from './pieces/knight-icon.vue'
import PawnIcon from './pieces/pawn-icon.vue'
import QueenIcon from './pieces/queen-icon.vue'
import RookIcon from './pieces/rook-icon.vue'

defineProps<{
  piece: Notation.Piece | null
  allegiance: PieceAllegiance
}>()

const emit = defineEmits<{ (event: 'click', e: MouseEvent): void }>()
</script>

<template>
  <div class="overflow-hidden" @click="(event) => emit('click', event)">
    <piece-svg :allegiance="allegiance" v-if="piece === null">
      <pawn-icon />
    </piece-svg>

    <piece-svg :allegiance="allegiance" v-if="piece === 'B'">
      <bishop-icon />
    </piece-svg>

    <piece-svg :allegiance="allegiance" v-if="piece === 'K'">
      <king-icon />
    </piece-svg>

    <piece-svg :allegiance="allegiance" v-if="piece === 'N'">
      <knight-icon />
    </piece-svg>

    <piece-svg :allegiance="allegiance" v-if="piece === 'Q'">
      <queen-icon />
    </piece-svg>

    <piece-svg :allegiance="allegiance" v-if="piece === 'R'">
      <rook-icon />
    </piece-svg>
  </div>
</template>
