import { useApi } from 'composables';
import { UserCreate } from 'models';
import { Notify } from 'quasar';
import { useRouter } from 'vue-router';

const { api } = useApi();

export function useAuth() {
  const router = useRouter();

  const confirmEmailUser = async (token: string) => {
    await api(
      {
        method: 'get',
        url: `/user/email/confirm/?token=${token}`,
      },
      false
    );
  };

  const createUser = async (data: UserCreate) => {
    await api<UserCreate[]>(
      {
        method: 'post',
        url: 'auth/register',
        data: data,
      },
      false
    ).then(() => {
      router.push({ name: 'Login' });
      Notify.create({
        message: 'Successfully!',
        color: 'positive',
        position: 'top-right',
        icon: 'check_circle_outline',
      });
    });
  };

  return {
    createUser,
    confirmEmailUser,
  };
}
