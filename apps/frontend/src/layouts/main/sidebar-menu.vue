<script setup lang="ts">
type Item = {
  to: string
  icon: string
  label: string
}

const items: Item[] = [
  {
    to: '/',
    icon: 'home',
    label: 'Home',
  },
  {
    to: '/play',
    icon: 'sports_esports',
    label: 'Play',
  },
  {
    to: '/feedback',
    icon: 'reviews',
    label: 'Feedback',
  },
  {
    to: '/stats',
    icon: 'analytics',
    label: 'Statistics',
  },
  {
    to: '/privacy',
    icon: 'shield',
    label: 'Privacy',
  },
]
</script>

<template>
  <q-list>
    <q-item
      v-for="(item, index) in items"
      :key="index"
      :to="item.to"
      exact
      active-class="bg-primary text-white"
    >
      <q-item-section avatar>
        <q-icon :name="item.icon" />
      </q-item-section>

      <q-item-section> {{ item.label }} </q-item-section>
    </q-item>
  </q-list>
</template>
