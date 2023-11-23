import { defineStore } from 'pinia';
import { Cookies } from 'quasar';
import jwt_decode from 'jwt-decode';
import type { JWTTokenDecode, AuthState } from 'src/models/auth';
import { useApi } from 'composables';

const { api } = useApi();

export const useAuthStore = defineStore('authStore', {
  state: (): AuthState => ({
    isAuth: false,
    idUser: null,
  }),
  actions: {
    async userLogin(username: string, password: string) {
      const data = new URLSearchParams();
      data.append('username', username);
      data.append('password', password);

      await api(
        {
          method: 'post',
          url: 'auth/login',
          data: data,
        },
        false
      )
        .then(() => {
          const token_decode: JWTTokenDecode = jwt_decode(
            Cookies.get('ispent-jwt')
          );
          this.idUser = token_decode.sub;
          this.isAuth = true;
          this.router.push({ name: 'Overview' });
        })
        .catch((e) => {
          console.error(e);
        });
    },
    async userLogout() {
      await api(
        {
          method: 'post',
          url: 'auth/logout',
        },
        true
      )
        .then(() => {
          this.clear();
          this.router.push({ name: 'Login' });
        })
        .catch((e) => {
          console.error(e);
        });
    },
    clear() {
      this.isAuth = false;
      this.idUser = null;
      this.router.push({ name: 'Login' });
    },
  },
});
