<template>
  <div class="row q-col-gutter-md">
    <div class="col-12">
      <template
        v-for="banner in operationStore?.userOverview?.banners"
        :key="banner.id"
      >
        <q-banner :class="getBannerColor(banner.color)">
          <template v-slot:avatar>
            <q-icon :name="banner.icon" color="white" />
          </template>
          {{ banner.text }}
        </q-banner>
      </template>
    </div>
    <div class="col-4">
      <div flat class="card">
        <p class="card__title">Balance</p>
        <q-skeleton v-if="isLoading" type="rect" height="60px" />
        <div v-else class="overview__card-total">
          {{ formatter.format(operationStore?.userOverview?.totalBalance!) }}
        </div>
      </div>
    </div>
    <div class="col-4">
      <div flat class="card">
        <p class="card__title">Total income</p>
        <q-skeleton v-if="isLoading" type="rect" height="60px" />
        <div v-else class="overview__card-total">
          {{ formatter.format(operationStore?.userOverview?.totalIncome!) }}
        </div>
      </div>
    </div>
    <div class="col-4">
      <div flat class="card">
        <p class="card__title">Total expenses</p>
        <q-skeleton v-if="isLoading" type="rect" height="60px" />
        <div v-else class="overview__card-total">
          {{ formatter.format(operationStore?.userOverview?.totalExpenses!) }}
        </div>
      </div>
    </div>
    <div class="col-7">
      <div class="card">
        <p class="card__title q-mb-md">Last operation</p>
        <div v-if="operationStore?.userOverview?.lastOperations?.length! > 0">
          <template
            v-for="operation in operationStore?.userOverview?.lastOperations"
            :key="operation.id"
          >
            <AppOperation :operation="operation" />
          </template>
        </div>
        <div class="row" v-else>
          <p class="col text-center q-pb-md">Nothing added</p>
        </div>
      </div>
    </div>
    <div class="col-5">
      <div class="card">
        <p class="card__title q-mb-md">Total by categories</p>
        <div
          v-if="operationStore?.userOverview?.totalByCategories?.length! > 0"
        >
          <template
            v-for="category in operationStore?.userOverview?.totalByCategories"
            :key="category.id"
          >
            <CategoryUserTotal :total-by-categories="category" />
          </template>
        </div>
        <div class="row" v-else>
          <p class="col text-center q-pb-md">Nothing added</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useOperationStore } from 'src/stores/operation';
import AppOperation from 'components/Operation/AppOperation.vue';
import CategoryUserTotal from 'components/CategoryUser/CategoryUserTotal.vue';
import { formatter } from 'boot/formatter';
import { isLoading } from 'composables';

const operationStore = useOperationStore();

const getBannerColor = (color: string) => {
  return `rounded-borders bg-${color}`;
};

onMounted(async () => {
  await operationStore.getUserOverview();
});
</script>
