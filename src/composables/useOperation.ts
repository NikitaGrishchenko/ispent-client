import { UserCategory, UserOperation } from 'models';
import { useApi } from 'composables';

const { api } = useApi();

export function useOperation() {
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

  const updateUserOperation = async (data: UserOperation) => {
    await api<UserOperation[]>(
      {
        method: 'put',
        url: 'operation/update/',
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
    createUserOperation,
    deleteUserOperation,
    updateUserOperation,
  };
}
