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
        path: 'privacy',
        component: () => import('pages/privacy-page.vue'),
        meta: {
          title: 'Privacy',
          icon: 'shield',
        },
      },
      {
        path: 'play',
        component: () => import('pages/play-page.vue'),
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
            path: 'online/:peerId',
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