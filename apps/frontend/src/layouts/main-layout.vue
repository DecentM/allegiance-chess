<script setup lang="ts">
import { useRoute } from 'vue-router'

import SidebarMenu from './main/sidebar-menu.vue'

const route = useRoute()

defineProps<{
  fullwidth?: boolean
}>()
</script>

<style lang="scss" scoped>
.route-title {
  z-index: 4;
}

.main-layout {
  height: 100vh;
}
</style>

<template>
  <q-layout
    view="lhh LpR lff"
    container
    class="main-layout"
    :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
  >
    <q-header reveal class="bg-primary">
      <q-toolbar>
        <q-toolbar-title>Allegiance Chess</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer bordered persistent :model-value="true" behavior="desktop">
      <sidebar-menu />
    </q-drawer>

    <q-page-container class="column items-center">
      <q-page :class="{ 'q-pt-xl': route.meta.title }" class="full-width">
        <router-view />

        <q-page-sticky
          v-if="route.meta.title"
          position="top"
          expand
          class="bg-secondary text-black route-title"
        >
          <q-toolbar>
            <q-icon
              v-if="typeof route.meta.icon === 'string'"
              size="md"
              :name="route.meta.icon"
            />
            <q-toolbar-title>{{ route.meta.title }}</q-toolbar-title>
          </q-toolbar>
        </q-page-sticky>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
