<script setup lang="ts">
import { useRoute } from 'vue-router'

import SidebarMenu from './main/sidebar-menu.vue'

const route = useRoute()
</script>

<template>
  <q-layout
    view="lhh LpR lff"
    container
    style="height: 100vh"
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

    <q-page-container>
      <q-page
        :style="{
          paddingTop: route.meta.title ? '50px' : '',
          height: 'calc(100vh - 100px)',
        }"
      >
        <router-view />

        <q-page-sticky
          v-if="route.meta.title"
          position="top"
          expand
          class="bg-secondary text-black"
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

<script setup lang="ts"></script>
