import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/main-layout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/index-page.vue'),
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
            path: 'local/:mode',
            component: () => import('pages/play/local-game.vue'),
          },
        ],
      },
      { path: '/peer', component: () => import('pages/peer-test.vue') },
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
