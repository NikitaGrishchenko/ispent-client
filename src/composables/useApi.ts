import { ref } from 'vue';
import { api as apiAxios } from 'boot/axios';
import { AxiosRequestConfig } from 'axios';
import { LoadingBar, Notify } from 'quasar';

export const isLoading = ref<boolean>(false);

export function useApi() {
  //   const api = async <T>(
  //     options: AxiosRequestConfig,
  //     showIndicator: boolean
  //   ) => {
  //     isLoading.value = true;
  //     if (showIndicator) LoadingBar.start();
  //     try {
  //       const response = await apiAxios(options);
  //       return <T>response.data;
  //     } catch (error) {
  //       //   console.error(error);
  //       Notify.create({
  //         message: `Server error: ${(error as Error).message}`,
  //         color: 'negative',
  //         position: 'top-right',
  //       });
  //     } finally {
  //       isLoading.value = false;
  //       if (showIndicator) LoadingBar.stop();
  //     }
  //   };

  const api = async <T>(
    options: AxiosRequestConfig,
    showIndicator: boolean
  ): Promise<T> => {
    return new Promise(async (resolve, reject) => {
      isLoading.value = true;
      if (showIndicator) LoadingBar.start();
      try {
        const response = await apiAxios(options);
        resolve(<T>response.data);
      } catch (error) {
        Notify.create({
          message: `Server error: ${(error as Error).message}`,
          color: 'negative',
          position: 'top-right',
        });
        reject(error);
      } finally {
        isLoading.value = false;
        if (showIndicator) LoadingBar.stop();
      }
    });
  };

  return { api };
}
