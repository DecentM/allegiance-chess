<script setup lang="ts">
import { computed, ref } from 'vue'
import { ChessRtcConnection } from '../../hooks/chess-rtc-connection'
import { Hex } from '../../hooks/rtc-connection'
import { useQuasar } from 'quasar'

const props = defineProps<{
  connection: ChessRtcConnection
}>()

const connectId = ref('')

const validatePeerId = (input: string): string | boolean => {
  if (!input) {
    return 'You must specify a Peer ID to connect with'
  }

  const uuid = Hex.hexToUtf8(input)
  const [part1, part2, part3, part4, part5, ...rest] = uuid.split('-')

  if (rest.length !== 0) {
    return 'Peer ID invalid, too much data'
  }

  if (part1.length !== 8) {
    return 'Peer ID invalid, part 1 has invalid length'
  }

  if (part2.length !== 4) {
    return 'Peer ID invalid, part 2 has invalid length'
  }

  if (part3.length !== 4) {
    return 'Peer ID invalid, part 3 has invalid length'
  }

  if (part4.length !== 4) {
    return 'Peer ID invalid, part 4 has invalid length'
  }

  if (part5.length !== 12) {
    return 'Peer ID invalid, part 5 has invalid length'
  }

  if (input === props.connection.peerId.value) {
    return 'This is your own Peer ID'
  }

  return true
}

const handleSubmit = () => [props.connection.connect(connectId.value)]

const submittable = computed(() => {
  const result = validatePeerId(connectId.value)

  return result === true
})

const q = useQuasar()

const handleCopy = () => {
  try {
    if (!props.connection.peerId.value) {
      throw new Error('Peer ID missing')
    }

    navigator.clipboard.writeText(props.connection.peerId.value)

    q.notify({
      icon: 'content_copy',
      message: 'Peer ID copied to clipboard',
      timeout: 4000,
      position: 'bottom-right',
    })
  } catch (error) {
    if (error instanceof Error) {
      q.notify({
        icon: 'close',
        iconColor: 'red',
        message: 'Cannot copy to clipboard',
        caption: error.message,
        timeout: 4000,
        position: 'bottom-right',
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.divider-right {
  border-right-color: $grey;
  border-right-width: 1px;
  border-right-style: solid;

  min-height: 18rem;
  margin-left: -1px;
}
</style>

<template>
  <q-card flat class="full-height">
    <q-card-section horizontal class="items-center full-height space">
      <div class="col-6 text-center q-pa-md">
        <q-card flat>
          <q-card-section>
            <q-form @submit="handleSubmit">
              <h4 class="text-h4">Host a game</h4>

              <q-separator class="q-mb-md" />

              <span>
                Ask your opponent to visit this page, and send you their Peer
                ID. Paste your opponent's Peer ID in this field, and click
                "Connect" or press enter to begin the game
              </span>

              <q-separator class="q-mb-md q-mt-md" />

              <q-input
                standout
                v-model="connectId"
                label="Peer ID *"
                hint="Paste your opponent's Peer ID here"
                lazy-rules
                :rules="[validatePeerId]"
              />

              <div class="row justify-end">
                <q-btn
                  icon="hub"
                  label="Connect"
                  type="submit"
                  color="primary"
                  :disable="!submittable"
                />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-0 divider-right" />

      <q-card flat class="col-6 text-center q-pa-md">
        <q-card-section>
          <h4 class="text-h4">Join a game</h4>

          <q-separator class="q-mb-md" />

          <span>
            Send your opponent your Peer ID. Ask your opponent to visit this
            page and paste your Peer ID into the field on the left on their
            side.
          </span>

          <q-separator class="q-mb-md q-mt-md" />

          <q-input
            standout
            :model-value="connection.peerId.value"
            label="Peer ID *"
            hint="Copy this Peer ID and send it to your opponent"
            readonly
          />

          <div class="row justify-end">
            <q-btn
              label="Copy"
              color="primary"
              icon="content_copy"
              @click="handleCopy"
            />
          </div>
        </q-card-section>
      </q-card>
    </q-card-section>
  </q-card>
</template>
