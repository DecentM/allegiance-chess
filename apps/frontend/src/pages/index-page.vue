<script setup lang="ts">
import background from '../assets/de-an-sun--iSZqeGuBnI-unsplash.jpg'
</script>

<style lang="scss" scoped>
.frosted-backdrop {
  backdrop-filter: blur(10px);
}
</style>

<template>
  <q-page>
    <q-img :src="background" fit="cover" class="full-width full-height">
      <div class="q-pa-md full-width">
        <q-card flat class="bg-transparent full-width frosted-backdrop">
          <q-card-section>
            <div class="text-h6">Introduction</div>
            <q-separator class="q-ma-md" />
            <span class="text-body1">
              Allegiance Chess is a Chess variant where you can essentially
              brainwash your opponents' pieces.
            </span>
          </q-card-section>
        </q-card>
      </div>
    </q-img>
  </q-page>
</template>
