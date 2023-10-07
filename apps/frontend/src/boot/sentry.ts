import { boot } from 'quasar/wrappers'
import * as Sentry from '@sentry/vue'
import { getSentryOptions, sentryEnabled } from '../lib/sentry'

export default boot(({ app, router }) => {
  if (!sentryEnabled) {
    return
  }

  Sentry.init({
    ...getSentryOptions(),
    app,
    integrations: [
      new Sentry.BrowserTracing({
        routingInstrumentation: Sentry.vueRouterInstrumentation(router),
      }),

      new Sentry.Replay({
        maskAllText: false,
      }),
    ],
  })
})
