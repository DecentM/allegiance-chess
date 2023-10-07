import * as Sentry from '@sentry/vue'

export const sentryEnabled = !!process.env.SENTRY_DSN

export const getSentryOptions = (): Parameters<typeof Sentry.init>[0] => {
  return {
    dsn: process.env.SENTRY_DSN,
    release: process.env.GITHUB_SHA || process.env.GIT_FETCH_HEAD,
    environment: process.env.NODE_ENV,

    // Performance Monitoring
    tracesSampleRate: 0,
    // Session Replay
    replaysSessionSampleRate: 0,
    replaysOnErrorSampleRate: 1.0,
  }
}
