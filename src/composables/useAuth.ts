import { api } from 'boot/axios';
import { UserCreate } from 'models';

export function useAuth() {
  const createUser = async (createUserData: UserCreate) => {
    console.log(createUserData);

    await api.post<UserCreate[]>('auth/register/', createUserData);
  };

  return {
    createUser,
  };
}
