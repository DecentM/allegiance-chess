<script setup lang="ts">
defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (event: 'click', choice: 'capture' | 'challenge'): void
  (event: 'dismiss'): void
}>()

const handleDismiss = () => {
  emit('dismiss')
}
</script>

<style lang="scss" scoped>
.selector-item {
  width: 86px;
  height: 86px;
}
</style>

<template>
  <q-menu cover :model-value="modelValue" @update:model-value="handleDismiss">
    <q-list>
      <q-item clickable class="q-pa-sm" @click="emit('click', 'capture')">
        <q-item-section class="selector-item items-center">
          <q-icon size="72px" name="close" />
        </q-item-section>
      </q-item>

      <q-item clickable class="q-pa-sm" @click="emit('click', 'challenge')">
        <q-item-section class="selector-item items-center">
          <q-icon size="64px" name="arrow_forward_ios" />
        </q-item-section>
      </q-item>
    </q-list>
  </q-menu>
</template>
