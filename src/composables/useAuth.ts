import { useApi } from 'composables';
import { UserCreate } from 'models';
import { Notify } from 'quasar';
const { api } = useApi();

export function useAuth() {
  const createUser = async (data: UserCreate) => {
    await api<UserCreate[]>(
      {
        method: 'post',
        url: 'auth/register/',
        data: data,
      },
      true
    ).then(() => {
      Notify.create({
        message: 'The user has been successfully registered!',
        color: 'positive',
        position: 'top-right',
        icon: 'check_circle_outline',
      });
    });
  };

  return {
    createUser,
  };
}
