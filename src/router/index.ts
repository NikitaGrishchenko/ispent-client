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

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function () {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  Router.beforeEach(async (to) => {
    const authStore = useAuthStore();

    if (!Cookies.has('ispent-jwt')) {
      if (to.meta.middleware === 'auth') {
        Router.push('/login');
      }
    } else {
      if (!authStore.isAuth) {
        const token_decode: JWTTokenDecode = jwt_decode(
          Cookies.get('ispent-jwt')
        );
        authStore.isAuth = true;
        authStore.idUser = token_decode.sub;
      }
      if (to.meta.middleware === 'login') {
        Router.push('/');
      }
    }
  });

  return Router;
});
