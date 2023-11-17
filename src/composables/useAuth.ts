import { useApi } from 'composables';
import { UserCreate } from 'models';

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
    );
  };

  return {
    createUser,
  };
}
