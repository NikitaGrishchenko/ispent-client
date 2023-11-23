import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    meta: { middleware: ['auth'] },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'Overview',
        component: () => import('pages/IndexPage.vue'),
      },
    ],
  },
  {
    path: '/login',
    meta: { middleware: ['login'] },
    component: () => import('layouts/EmptyLayout.vue'),
    children: [
      {
        path: '',
        name: 'Login',
        component: () => import('pages/LoginPage.vue'),
      },
    ],
  },
  {
    path: '/registration',
    meta: { middleware: ['login'] },
    component: () => import('layouts/EmptyLayout.vue'),
    children: [
      {
        path: '',
        name: 'Registration',
        component: () => import('pages/RegistrationPage.vue'),
      },
    ],
  },
  {
    path: '/categories',
    meta: { middleware: ['auth'] },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'Categories',
        component: () => import('pages/CategoryUserPage.vue'),
      },
    ],
  },
  {
    path: '/operation',
    meta: { middleware: ['auth'] },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'Operations',
        component: () => import('pages/OperationPage.vue'),
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
