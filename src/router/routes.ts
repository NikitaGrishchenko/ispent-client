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
  {
    path: '/registration',
    meta: { middleware: ['not-auth'] },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'RegistrationPage',
        component: () => import('pages/RegistrationPage.vue'),
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
