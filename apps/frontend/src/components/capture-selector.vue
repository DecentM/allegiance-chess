<script setup lang="ts">
import { onMounted } from 'vue'

const props = defineProps<{
  modelValue: boolean
  moves: Array<'x' | '>'>
}>()

const emit = defineEmits<{
  (event: 'click', choice: 'capture' | 'challenge'): void
  (event: 'dismiss'): void
}>()

const handleDismiss = () => {
  emit('dismiss')
}

onMounted(() => {
  if (props.moves.length === 1) {
    emit('click', props.moves.at(0) === 'x' ? 'capture' : 'challenge')
  }
})
</script>

<style lang="scss" scoped>
.selector-item {
  width: 86px;
  height: 86px;
}
</style>

<template>
  <q-menu
    cover
    :model-value="props.moves.length > 1 || modelValue"
    @update:model-value="handleDismiss"
  >
    <q-list>
      <q-item
        v-if="moves.includes('x')"
        clickable
        class="q-pa-sm"
        @click="emit('click', 'capture')"
      >
        <q-item-section class="selector-item items-center">
          <q-icon size="72px" name="close" />
        </q-item-section>
      </q-item>

      <q-item
        v-if="moves.includes('>')"
        clickable
        class="q-pa-sm"
        @click="emit('click', 'challenge')"
      >
        <q-item-section class="selector-item items-center">
          <q-icon size="64px" name="arrow_forward_ios" />
        </q-item-section>
      </q-item>
    </q-list>
  </q-menu>
</template>
