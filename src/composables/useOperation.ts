import { UserCategory, UserOperation } from 'models';
import { useApi } from 'composables';

const { api } = useApi();

export function useOperation() {
  const getUserCategories = async () => {
    const data = await api<UserCategory[]>(
      {
        method: 'get',
        url: 'operation/categories/',
      },
      false
    );
    return data;
  };

  const createUserOperation = async (data: UserOperation) => {
    await api<UserOperation[]>(
      {
        method: 'post',
        url: 'operation/create/',
        data: data,
      },
      false
    );
  };

  const deleteUserOperation = async (id_operation: number) => {
    await api<UserOperation[]>(
      {
        method: 'delete',
        url: `operation/delete/${id_operation}`,
      },
      false
    );
  };

  return {
    getUserCategories,
    createUserOperation,
    deleteUserOperation,
  };
}
