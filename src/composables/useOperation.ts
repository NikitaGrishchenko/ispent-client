import { api } from 'boot/axios';
import { UserOverview, UserCategory, UserOperation } from 'models';

export function useOperation() {
  const getUserCategories = async () => {
    const { data } = await api.get<UserCategory[]>('operation/categories/');
    return data;
  };

  const createUserOperation = async (data: UserOperation) => {
    await api.post<UserOperation[]>('operation/create/', data);
  };

  return {
    getUserCategories,
    createUserOperation,
  };
}
