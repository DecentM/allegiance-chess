import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/main-layout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/index-page.vue'),
        meta: {
          title: 'Welcome',
          icon: 'home',
        },
      },
      {
        path: 'stats',
        component: () => import('pages/stats-page.vue'),
        meta: {
          title: 'Statistics',
          icon: 'analytics',
        },
      },
      {
        path: 'privacy',
        component: () => import('pages/privacy-page.vue'),
        meta: {
          title: 'Privacy',
          icon: 'shield',
        },
      },
      {
        path: 'feedback',
        component: () => import('pages/feedback-page.vue'),
        meta: {
          title: 'Feedback',
          icon: 'reviews',
        },
      },
      {
        path: 'play',
        component: () => import('layouts/play-layout.vue'),
        children: [
          {
            path: '',
            component: () => import('pages/play/setup-game.vue'),
            meta: {
              title: 'Game setup',
              icon: 'settings',
            },
          },
          {
            path: 'online',
            component: () => import('pages/play/online-game.vue'),
          },
          {
            path: 'pen-pal/:state?',
            component: () => import('pages/play/pen-pal-game.vue'),
            meta: {
              title: 'Pen-pal mode',
              icon: 'settings',
            },
          },
          {
            path: 'bot',
            component: () => import('pages/play/bot-game.vue'),
            meta: {
              title: 'Play against computer',
              icon: 'precision_manufacturing',
            },
          },
          {
            path: 'watch-bots',
            component: () => import('pages/play/watch-bots.vue'),
            meta: {
              title: 'Watch bots play',
              icon: 'precision_manufacturing',
            },
          },
        ],
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/not-found.vue'),
  },
]

export default routes
