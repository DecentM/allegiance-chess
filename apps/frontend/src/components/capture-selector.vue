<script setup lang="ts">
defineProps<{
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
</script>

<template>
  <q-menu cover :model-value="modelValue" @update:model-value="handleDismiss">
    <q-list>
      <q-item
        v-if="moves.includes('x')"
        clickable
        @click="emit('click', 'capture')"
        class="q-py-lg"
      >
        <q-item-section class="items-center">
          <q-icon size="72px" name="close" />
        </q-item-section>
      </q-item>

      <q-item
        v-if="moves.includes('>')"
        clickable
        @click="emit('click', 'challenge')"
        class="q-py-lg"
      >
        <q-item-section class="items-center">
          <q-icon size="64px" name="arrow_forward_ios" />
        </q-item-section>
      </q-item>
    </q-list>
  </q-menu>
</template>
