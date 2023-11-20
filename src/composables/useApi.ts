import { ref } from 'vue';
import { api as apiAxios } from 'boot/axios';
import { AxiosRequestConfig } from 'axios';
import { LoadingBar, Notify } from 'quasar';

export const isLoading = ref<boolean>(false);

export function useApi() {
  const api = async <T>(
    options: AxiosRequestConfig,
    showIndicator: boolean
  ) => {
    isLoading.value = true;
    if (showIndicator) LoadingBar.start();
    try {
      const response = await apiAxios(options);
      return <T>response.data;
    } catch (e) {
      console.error(e);
      Notify.create({
        message: `Server error: ${(e as Error).message}`,
        color: 'negative',
        position: 'top-right',
      });
    } finally {
      isLoading.value = false;
      if (showIndicator) LoadingBar.stop();
    }
  };

  return { api };
}
