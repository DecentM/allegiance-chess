<script setup lang="ts">
import { ref } from 'vue'
import * as Sentry from '@sentry/vue'
import { QForm } from 'quasar'

import { useNotify } from '../hooks/notify'

const name = ref('')
const email = ref('')
const message = ref('')

const form = ref<QForm | null>(null)

const { notify } = useNotify()

const handleSubmit = () => {
  const eventId = Sentry.captureMessage('User Feedback')

  Sentry.captureUserFeedback({
    event_id: eventId,
    name: name.value,
    email: email.value,
    comments: message.value,
  })

  name.value = ''
  email.value = ''
  message.value = ''

  notify({
    icon: 'outgoing_mail',
    message: 'Your feedback is on its way!',
  })

  form.value?.reset()
}
</script>

<style lang="scss" scoped>
.feedback-explanation {
  max-width: 1024px;
}
</style>

<template>
  <q-card flat class="full-width q-mb-md">
    <q-card-section class="feedback-explanation">
      <div class="text-body1 q-mb-md">
        Thanks for playing my Chess variant!<br />
        Since you're here, I assume you'd like to tell me your opinion, or let
        me know of a bug you found.
      </div>

      <div class="text-body1 q-mb-md">
        If you're a technical person with a GitHub account, you should be able
        to find the repository based on my username (DecentM) and repository
        name (allegiance-chess). Please only report crashes or bugs there!<br />
        Otherwise, this page is the best way to provide feedback and ideas about
        the site, and the game. You can also use it for bug reports if GitHub
        isn't your cup of tea.
      </div>

      <div class="text-body1">
        If you'd like to allow me to contact you about your feedback, please
        enter your e-mail address.
      </div>
    </q-card-section>

    <q-separator />

    <q-form @submit="handleSubmit" ref="form">
      <q-card-section class="q-gutter-sm">
        <q-input
          filled
          color="secondary"
          v-model="name"
          counter
          label="Your name (optional)"
          lazy-rules
          :maxlength="32"
        />

        <q-input
          filled
          color="secondary"
          v-model="email"
          counter
          type="email"
          label="E-mail address (optional)"
          hint="If you provide an e-mail address, I might contact you if your feedback calls for it"
          lazy-rules
          :maxlength="64 - name.length"
        />

        <q-input
          filled
          color="secondary"
          v-model="message"
          counter
          type="textarea"
          label="Your message"
          lazy-rules
          :maxlength="1024 - name.length - email.length"
          :rules="[
            (val) => (val && val.length > 0) || 'This field is required',
          ]"
        />

        <q-btn label="Send" icon="send" type="submit" color="primary" />
      </q-card-section>
    </q-form>
  </q-card>
</template>
