import { api } from 'boot/axios';
// import { useRouter } from 'vue-router';
// import { useQuasar } from 'quasar';
import { UserOverview } from 'models';

export function useOperation() {
  //   const router = useRouter();
  //   const $q = useQuasar();

  const getUserOverview = async () => {
    const { data } = await api.get<UserOverview[]>('user/overview/');
    return data;
  };

  return {
    getUserOverview,
  };
}
