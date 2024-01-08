import { route } from 'quasar/wrappers';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';
import routes from './routes';
import { Cookies } from 'quasar';
import jwt_decode from 'jwt-decode';
import { JWTTokenDecode } from 'src/models/auth';
import { useAuthStore } from 'src/stores/auth';
import _ from 'lodash';

export default route(function () {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  Router.beforeEach(async (to) => {
    const authStore = useAuthStore();
    if (!Cookies.has('ispent-jwt')) {
      if (_.includes(to.meta.middleware as [], 'auth')) {
        authStore.redirectAfterLogin = to.fullPath;
        Router.push({
          name: 'Login',
        });
      }
    } else {
      if (!authStore.isAuth) {
        const token_decode: JWTTokenDecode = jwt_decode(
          Cookies.get('ispent-jwt')
        );
        authStore.isAuth = true;
        authStore.idUser = token_decode.sub;
      }
      if (_.includes(to.meta.middleware as [], 'login')) {
        Router.push({
          name: 'Overview',
        });
      }
    }
  });

  return Router;
});
