import { api } from 'boot/axios';
// import { useRouter } from 'vue-router';
// import { useQuasar } from 'quasar';
import { UserOverview, UserCategory, UserOperation } from 'models';

export function useOperation() {
  //   const router = useRouter();
  //   const $q = useQuasar();

  const getUserOverview = async () => {
    const { data } = await api.get<UserOverview>('user/overview/');
    return data;
  };

  const getUserCategory = async () => {
    const { data } = await api.get<UserCategory[]>('user/categories/');
    return data;
  };

  const createUserOperation = async (data: UserOperation) => {
    await api.post<UserOperation[]>('operation/create/', data);
  };

  return {
    getUserOverview,
    getUserCategory,
    createUserOperation,
  };
}
