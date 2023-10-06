<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useQuasar } from 'quasar'

import SidebarMenu from './main/sidebar-menu.vue'

const route = useRoute()

defineProps<{
  fullwidth?: boolean
}>()

const q = useQuasar()

const drawerOpen = ref(false)

const releaseId = process.env.GITHUB_SHA || process.env.GIT_FETCH_HEAD
</script>

<style lang="scss" scoped>
.route-title {
  z-index: 4;
}

.release-id {
  color: #3f3f3f;
  padding: 1rem;
  font-size: 12px;
}

.main-layout {
  height: 100vh;

  .layout-page {
    max-width: 1750px;
  }
}
</style>

<template>
  <q-layout view="lhh LpR lff" container class="main-layout">
    <q-header reveal class="bg-primary">
      <q-toolbar>
        <q-toolbar-title>Allegiance Chess</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      bordered
      :persistent="q.screen.gt.sm"
      :model-value="q.screen.gt.sm || drawerOpen"
      :side="q.screen.gt.sm ? 'left' : 'right'"
      @hide="drawerOpen = false"
      class="column"
      :class="{ 'justify-between q-pb-xl reverse': q.screen.lt.md }"
    >
      <sidebar-menu />

      <q-space />

      <div v-if="releaseId" class="release-id">
        <span>{{ releaseId }}</span>
      </div>
    </q-drawer>

    <q-page-container class="column items-center">
      <q-page
        :class="{ 'q-pt-xl': route.meta.title }"
        class="full-width layout-page"
      >
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

        <q-page-sticky position="bottom-right" :offset="[18, 18]">
          <q-fab
            v-if="q.screen.lt.md"
            icon="menu"
            direction="up"
            color="accent"
            :model-value="drawerOpen"
            @show="drawerOpen = true"
            @hide="drawerOpen = false"
            class="menu-fab"
          />
        </q-page-sticky>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
