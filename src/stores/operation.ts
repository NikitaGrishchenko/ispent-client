import { defineStore } from 'pinia';
import type { OperationState } from 'src/models/operation';
import { UserOverview, CategoryUser, CategoryUserUpdate } from 'models';
import { useApi } from 'composables';
import { Notify } from 'quasar';

const { api } = useApi();

export const useOperationStore = defineStore('operationStore', {
  state: (): OperationState => ({
    userOverview: undefined as UserOverview | undefined,
    categoryUser: undefined as CategoryUser[] | undefined,
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
      const data = await api<CategoryUser[]>(
        {
          method: 'get',
          url: 'operation/category/list/',
        },
        true
      );
      this.categoryUser = data;
    },

    async createCategoryUser(data: CategoryUser) {
      await api<CategoryUser>(
        {
          method: 'post',
          url: 'operation/category/create/',
          data: data,
        },
        true
      ).then((responce: CategoryUser) => {
        Notify.create({
          message: 'The category has been created',
          color: 'positive',
          position: 'top-right',
          icon: 'check_circle_outline',
        });
        this.categoryUser?.unshift(responce);
      });
    },

    async deleteCategoryUser(id_category: number) {
      await api<CategoryUser>(
        {
          method: 'delete',
          url: `operation/category/delete/${id_category}`,
        },
        false
      ).then((responce: CategoryUser) => {
        const indexDeletedItem = this.categoryUser
          ?.map((i) => i.id)
          .indexOf(responce.id);
        this.categoryUser?.splice(indexDeletedItem!, 1);
        Notify.create({
          message: 'The category user has been deleted',
          color: 'positive',
          position: 'top-right',
          icon: 'check_circle_outline',
        });
      });
    },
    async updateCategoryUser(data: CategoryUserUpdate) {
      await api<CategoryUser>(
        {
          method: 'put',
          url: 'operation/category/update/',
          data: data,
        },
        false
      ).then((responce: CategoryUser) => {
        this.categoryUser?.map((i) =>
          i.id === responce.id
            ? ((i.name = responce.name),
              (i.color = responce.color),
              (i.icon = responce.icon),
              (i.kind = responce.kind))
            : i
        );
        Notify.create({
          message: 'The category user has been updated',
          color: 'positive',
          position: 'top-right',
          icon: 'check_circle_outline',
        });
      });
    },
  },
});
