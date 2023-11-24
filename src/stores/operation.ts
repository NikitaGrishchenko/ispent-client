import { defineStore } from 'pinia';
import type { OperationState } from 'src/models/operation';
import { UserOverview, UserCategory } from 'models';
import { useApi } from 'composables';

const { api } = useApi();

export const useOperationStore = defineStore('operationStore', {
  state: (): OperationState => ({
    userOverview: undefined as UserOverview | undefined,
    userCategory: undefined as UserCategory[] | undefined,
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

    async getUserCategories() {
      const data = await api<UserCategory[]>(
        {
          method: 'get',
          url: 'operation/categories/',
        },
        true
      );
      this.userCategory = data;
    },

    async createUserCategory(data: UserCategory) {
      await api<UserCategory[]>(
        {
          method: 'post',
          url: 'operation/category/create/',
          data: data,
        },
        true
      ).then((e) => {
        console.log(e);
      });
    },
  },
});
