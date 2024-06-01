import { ref } from 'vue';
import { api as apiAxios } from 'boot/axios';
import { AxiosRequestConfig, AxiosError } from 'axios';
import { LoadingBar, Notify } from 'quasar';

export const isLoading = ref<boolean>(false);

type ServerErrorData = {
  [key: string]: string;
};

function isAxiosError(
  candidate: unknown
): candidate is AxiosError<ServerErrorData> {
  if (
    candidate &&
    typeof candidate === 'object' &&
    'isAxiosError' in candidate
  ) {
    return true;
  }
  return false;
}

export function useApi() {
  const api = async <T>(
    options: AxiosRequestConfig,
    showIndicator: boolean
  ): Promise<T> => {
    return new Promise(async (resolve, reject) => {
      isLoading.value = true;
      if (showIndicator === true) LoadingBar.start();
      try {
        const response = await apiAxios(options);
        resolve(<T>response.data);
      } catch (error: unknown) {
        if (isAxiosError(error)) {
          Notify.create({
            message: `<span style="font-size: 12px;">Status error: ${error.response?.status
              }</span> <br/> <strong>${error.response?.data && error.response?.data?.detail
                ? error.response?.data?.detail
                : 'ee'
              }</strong>`,
            color: 'negative',
            position: 'top-right',
            html: true,
            icon: 'error',
          });
          reject(error);
        }
      } finally {
        isLoading.value = false;
        if (showIndicator === true) LoadingBar.stop();
      }
    });
  };

  return { api };
}
