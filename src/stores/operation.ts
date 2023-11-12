import { defineStore } from 'pinia';
import { api } from 'boot/axios';
import type { OperationState } from 'src/models/operation';
import { UserOverview } from 'models';

export const useOperationStore = defineStore('operationStore', {
  state: (): OperationState => ({
    userOverview: undefined as UserOverview | undefined,
  }),
  actions: {
    async getUserOverview() {
      const { data } = await api.get<UserOverview>('user/overview/');
      this.userOverview = data;
    },
  },
});
