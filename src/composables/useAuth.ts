import { api } from 'boot/axios';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

export function useAuth() {
  const router = useRouter();
  const $q = useQuasar();

  const userLogin = async (username: string, password: string) => {
    await api.post('auth/login', { username, password });
    void router.push({
      name: 'IndexPage',
    });
  };

  const userLogout = async () => {
    await api.post('auth/logout');
    void router.push({
      name: 'LoginPage',
    });
  };

  const hasTokenUser = () => {
    return $q.cookies.has('ispent-jwt');
  };

  return {
    userLogin,
    userLogout,
    hasTokenUser,
  };
}
