<template>
  <div class="row q-col-gutter-md">
    <div class="col-4">
      <div flat class="card">
        <p class="card__title">Balance</p>
        <div class="overview__card-total">
          {{ operationStore?.userOverview?.totalBalance }}
          <span class="sign-ruble--large">₽</span>
        </div>
      </div>
    </div>
    <div class="col-4">
      <div flat class="card">
        <p class="card__title">Total income</p>
        <div class="overview__card-total">
          {{ operationStore?.userOverview?.totalIncome }}
          <span class="sign-ruble--large">₽</span>
        </div>
      </div>
    </div>
    <div class="col-4">
      <div flat class="card">
        <p class="card__title">Total expenses</p>
        <div class="overview__card-total">
          {{ operationStore?.userOverview?.totalExpenses }}
          <span class="sign-ruble--large">₽</span>
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

const operationStore = useOperationStore();

onMounted(async () => {
  await operationStore.getUserOverview();
});
</script>
