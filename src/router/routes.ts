import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    meta: { middleware: ['auth'] },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'IndexPage',
        component: () => import('pages/IndexPage.vue'),
      },
    ],
  },
  {
    path: '/login',
    meta: { middleware: ['login'] },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'LoginPage',
        component: () => import('pages/LoginPage.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
