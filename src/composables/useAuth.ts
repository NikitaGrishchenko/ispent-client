import { api } from 'boot/axios';
import { useRouter } from 'vue-router';

export function useAuth() {
  const router = useRouter();

  const userLogin = async (username: string, password: string) => {
    await api.post('auth/login', { username, password });
    void router.push({
      name: 'IndexPage',
    });
  };

  return {
    userLogin,
  };
}
