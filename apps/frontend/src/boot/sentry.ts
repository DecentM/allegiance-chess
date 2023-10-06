import { boot } from 'quasar/wrappers'
import * as Sentry from '@sentry/vue'

export default boot(({ app, router }) => {
  if (!process.env.SENTRY_DSN) {
    return
  }

  Sentry.init({
    app,
    dsn: process.env.SENTRY_DSN,
    release: process.env.GITHUB_SHA || process.env.GIT_FETCH_HEAD,
    environment: process.env.NODE_ENV,
    integrations: [
      new Sentry.BrowserTracing({
        routingInstrumentation: Sentry.vueRouterInstrumentation(router),
      }),

      new Sentry.Replay({
        maskAllText: false,
      }),
    ],
    // Performance Monitoring
    tracesSampleRate: 0,
    // Session Replay
    replaysSessionSampleRate: 0,
    replaysOnErrorSampleRate: 1.0,
  })
})
