import { defineStore } from 'pinia';
import type { OperationState } from 'src/models/operation';
import {
  UserOverview,
  CategoryUser,
  CategoryUserUpdate,
  UserOperationByPeriod,
  UserOperation,
} from 'models';
import { useApi } from 'composables';
import { Notify } from 'quasar';
import { DateTime } from 'luxon';

const { api } = useApi();

export const useOperationStore = defineStore('operationStore', {
  state: (): OperationState => ({
    userOverview: undefined as UserOverview | undefined,
    categoryUser: undefined as CategoryUser[] | undefined,
    operations: undefined as UserOperationByPeriod[] | undefined,
    currentMonth: DateTime.now(),
  }),
  actions: {
    async getUserOverview() {
      const data = await api<UserOverview>(
        {
          method: 'get',
          url: 'user/overview/',
        },
        false
      );
      this.userOverview = data;
    },

    async getUserCategories() {
      const data = await api<CategoryUser[]>(
        {
          method: 'get',
          url: 'operation/category/list/',
        },
        false
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
        true
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
    async getOperationsByPeriodOfTime() {
      const currentMonth = this.currentMonth;
      const startingDate = DateTime.fromFormat(
        `${currentMonth.year}-${currentMonth.month}-01`,
        'yyyy-M-d'
      ).toFormat('yyyy-MM-dd');
      const endDate = DateTime.fromFormat(
        `${currentMonth.year}-${currentMonth.month}-${currentMonth.daysInMonth}`,
        'yyyy-M-d'
      ).toFormat('yyyy-MM-dd');

      this.operations = await api<UserOperationByPeriod[]>(
        {
          method: 'get',
          url: 'operation/list/',
          params: {
            starting_date: startingDate,
            end_date: endDate,
          },
        },
        false
      );
    },
    async changeCurrentMonth(count: number) {
      this.currentMonth = this.currentMonth.plus({
        months: count,
      });
      await this.getOperationsByPeriodOfTime();
    },
    async createUserOperation(data: UserOperation) {
      await api<UserOperation>(
        {
          method: 'post',
          url: 'operation/create/',
          data: data,
        },
        false
      ).then(async () => {
        this.updateDataStore();
        Notify.create({
          message: 'The operation has been created',
          color: 'positive',
          position: 'top-right',
          icon: 'check_circle_outline',
        });
      });
    },
    async updateUserOperation(data: UserOperation) {
      await api<UserOperation[]>(
        {
          method: 'put',
          url: 'operation/update/',
          data: data,
        },
        false
      ).then(async () => {
        this.updateDataStore();
        Notify.create({
          message: 'The operation has been updated',
          color: 'positive',
          position: 'top-right',
          icon: 'check_circle_outline',
        });
      });
    },
    async deleteUserOperation(id_operation: number) {
      await api<UserOperation[]>(
        {
          method: 'delete',
          url: `operation/delete/${id_operation}`,
        },
        false
      ).then(async () => {
        this.updateDataStore();
        Notify.create({
          message: 'The operation has been deleted',
          color: 'positive',
          position: 'top-right',
          icon: 'check_circle_outline',
        });
      });
    },
    async updateDataStore() {
      const current_path = this.router.currentRoute.value.name;
      if (current_path === 'Overview') {
        await this.getUserOverview();
      }
      if (current_path === 'Operations') {
        await this.getOperationsByPeriodOfTime();
      }
    },
  },
});
