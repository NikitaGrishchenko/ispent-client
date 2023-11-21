import { UserCategory, UserOperation } from 'models';
import { useApi } from 'composables';
import { Notify } from 'quasar';

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
    ).then(() => {
      Notify.create({
        message: 'The operation has been created',
        color: 'positive',
        position: 'top-right',
        icon: 'check_circle_outline',
      });
    });
  };

  const updateUserOperation = async (data: UserOperation) => {
    await api<UserOperation[]>(
      {
        method: 'put',
        url: 'operation/update/',
        data: data,
      },
      false
    ).then(() => {
      Notify.create({
        message: 'The operation has been updated',
        color: 'positive',
        position: 'top-right',
        icon: 'check_circle_outline',
      });
    });
  };

  const deleteUserOperation = async (id_operation: number) => {
    await api<UserOperation[]>(
      {
        method: 'delete',
        url: `operation/delete/${id_operation}`,
      },
      false
    ).then(() => {
      Notify.create({
        message: 'The operation has been deleted',
        color: 'positive',
        position: 'top-right',
        icon: 'check_circle_outline',
      });
    });
  };

  return {
    createUserOperation,
    deleteUserOperation,
    updateUserOperation,
  };
}
