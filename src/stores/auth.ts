import { defineStore } from 'pinia';
import { api } from 'boot/axios';
import { Cookies } from 'quasar';
import jwt_decode from 'jwt-decode';
import type { JWTTokenDecode, AuthState } from 'src/models/auth';

export const useAuthStore = defineStore('authStore', {
  state: (): AuthState => ({
    showPreloader: false,
    isAuth: false,
    idUser: null,
  }),
  getters: {
    // doubleCount: (state) => state.counter * 2,
  },
  actions: {
    async userLogin(username: string, password: string) {
      const data = new URLSearchParams();
      data.append('username', username);
      data.append('password', password);
      await api
        .post('auth/login', data)
        .then(() => {
          const token_decode: JWTTokenDecode = jwt_decode(
            Cookies.get('ispent-jwt')
          );
          this.idUser = token_decode.sub;
          this.isAuth = true;
          this.router.push({ name: 'IndexPage' });
        })
        .catch((e) => {
          console.error(e);
        });
    },
    async userLogout() {
      await api
        .post('auth/logout')
        .then(() => {
          this.clear();
          this.router.push({ name: 'LoginPage' });
        })
        .catch((e) => {
          console.error(e);
        });
    },
    clear() {
      this.isAuth = false;
      this.idUser = null;
      this.router.push({ name: 'LoginPage' });
    },
  },
});
