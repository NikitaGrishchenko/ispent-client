import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    meta: { middleware: ['auth'], name: 'Overview' },
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
    meta: { middleware: ['login'], name: 'Login' },
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
    meta: { middleware: ['login'], name: 'Registration' },
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
    meta: { middleware: ['auth'], name: 'Categories' },
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
    meta: { middleware: ['auth'], name: 'Operations' },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'Operations',
        component: () => import('pages/OperationPage.vue'),
      },
    ],
  },
  {
    path: '/confirm',
    meta: { middleware: ['auth'], name: 'Confirm email' },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'ConfirmEmailPage',
        component: () => import('pages/ConfirmEmailPage.vue'),
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
