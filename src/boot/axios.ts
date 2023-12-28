import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { useAuthStore } from 'src/stores/auth';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: AxiosInstance;
  }
}

const api = axios.create({
  baseURL: process.env.DEV ? 'http://127.0.0.1:8000/api/v1/' : '/api/v1/',
  withCredentials: true,
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
