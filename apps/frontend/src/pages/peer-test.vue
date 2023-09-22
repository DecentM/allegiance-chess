<script setup lang="ts">
import { ref } from 'vue'
import { useRtcConnection } from '../hooks/rtc-connection'

const { mode, peerId, messages, connect } = useRtcConnection()
const connectId = ref('')
</script>

<style lang="scss" scoped></style>

<template>
  <q-page class="col items-center justify-evenly q-gutter-md">
    <q-card v-if="mode === 'initial'" flat>
      <q-card-section>
        <q-list>
          <q-item>
            <q-item-section class="q-mt-sm q-mb-sm">
              <q-item-label>Peer ID</q-item-label>

              <q-item-label v-if="peerId" caption lines="2">
                {{ peerId }}
              </q-item-label>

              <q-item-label v-else caption lines="2">
                <q-linear-progress indeterminate rounded class="q-mt-sm" />
              </q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-icon name="edit" />
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>

    <q-card flat>
      <q-card-section>
        <pre>{{ JSON.stringify(messages, null, 2) }}</pre>
      </q-card-section>
    </q-card>

    <q-card v-if="mode === 'initial'" flat>
      <q-card-section>
        <q-form @submit="() => connect(connectId)" class="q-gutter-md row">
          <q-input
            class="col-11"
            standout
            v-model="connectId"
            label="Peer ID"
          />

          <q-btn class="col" label="Connect" type="submit" color="primary" />
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>
