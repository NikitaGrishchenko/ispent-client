<template>
  <div class="row q-col-gutter-sm">
    <div class="col-12">
      <BannerList :banners="operationStore?.userOverview?.banners" />
    </div>
    <div class="col-12 col-md-4">
      <BalanceCard
        :digit="operationStore?.userOverview?.totalBalance"
        :is-loading="isLoading"
        >Balance</BalanceCard
      >
    </div>
    <div class="col-6 col-md-4">
      <BalanceCard
        :digit="operationStore?.userOverview?.totalIncome"
        :is-loading="isLoading"
        >Total income</BalanceCard
      >
    </div>
    <div class="col-6 col-md-4">
      <BalanceCard
        :digit="operationStore?.userOverview?.totalExpenses"
        :is-loading="isLoading"
        >Total expenses</BalanceCard
      >
    </div>
    <div class="col-12 col-md-7">
      <div class="card">
        <p class="card__title q-mb-md">Last operation</p>
        <OperationList
          :operations="operationStore?.userOverview?.lastOperations"
        />
      </div>
    </div>
    <div class="col-12 col-md-5">
      <div class="card">
        <p class="card__title q-mb-md">Total by categories</p>

        <CategoryUserTotalList
          :total-by-categories="operationStore?.userOverview?.totalByCategories"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useOperationStore } from 'src/stores/operation';
import OperationList from 'components/Operation/OperationList.vue';
import BannerList from 'components/BannerList.vue';
import CategoryUserTotalList from 'components/CategoryUser/CategoryUserTotalList.vue';
import BalanceCard from 'components/BalanceCard.vue';

import { isLoading } from 'composables';

const operationStore = useOperationStore();

onMounted(async () => {
  await operationStore.getUserOverview();
});
</script>
