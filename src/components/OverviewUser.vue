<template>
  <div class="row q-col-gutter-sm">
    <div class="col-12">
      <BannerList :banners="operationStore?.userOverview?.banners" />
    </div>
    <div class="col-12 col-md-4">
      <div flat class="card">
        <p class="card__title">Balance</p>
        <q-skeleton v-if="isLoading" type="rect" height="60px" />
        <div v-else class="overview__card-total">
          {{ formatter.format(operationStore?.userOverview?.totalBalance!) }}
        </div>
      </div>
    </div>
    <div class="col-6 col-md-4">
      <div flat class="card">
        <p class="card__title">Total income</p>
        <q-skeleton v-if="isLoading" type="rect" height="60px" />
        <div v-else class="overview__card-total">
          {{ formatter.format(operationStore?.userOverview?.totalIncome!) }}
        </div>
      </div>
    </div>
    <div class="col-6 col-md-4">
      <div flat class="card">
        <p class="card__title">Total expenses</p>
        <q-skeleton v-if="isLoading" type="rect" height="60px" />
        <div v-else class="overview__card-total">
          {{ formatter.format(operationStore?.userOverview?.totalExpenses!) }}
        </div>
      </div>
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
import { formatter } from 'boot/formatter';
import { isLoading } from 'composables';

const operationStore = useOperationStore();

onMounted(async () => {
  await operationStore.getUserOverview();
});
</script>
