import { defineStore } from 'pinia';
import type { OperationState } from 'src/models/operation';
import { UserOverview } from 'models';
import { useApi } from 'composables';

const { api } = useApi();

export const useOperationStore = defineStore('operationStore', {
  state: (): OperationState => ({
    userOverview: undefined as UserOverview | undefined,
  }),
  actions: {
    async getUserOverview() {
      const data = await api<UserOverview>(
        {
          method: 'get',
          url: 'user/overview/',
        },
        true
      );
      this.userOverview = data;
    },
  },
});
