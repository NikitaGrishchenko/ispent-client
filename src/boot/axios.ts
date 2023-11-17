import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { useAuthStore } from 'src/stores/auth';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: AxiosInstance;
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({
  baseURL: process.env.DEV ? 'http://127.0.0.1:8000/' : 'https://ispent.ru/',
  withCredentials: true,
  //   headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
});

export default boot(({ app }) => {
  const authStore = useAuthStore();

  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$api = api;
  api.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        authStore.clear();
      }
      return Promise.reject(error);
    }
  );
});

export { api };
