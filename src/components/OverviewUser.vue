<template>
  <div class="row q-col-gutter-md">
    <div class="col-4">
      <div flat class="card">
        <p class="card__title">Balance</p>
        <div class="overview__card-total">
          {{ operationStore?.userOverview?.totalBalance }} ₽
        </div>
      </div>
    </div>
    <div class="col-4">
      <div flat class="card">
        <p class="card__title">Total income</p>
        <div class="overview__card-total">
          {{ operationStore?.userOverview?.totalIncome }} ₽
        </div>
      </div>
    </div>
    <div class="col-4">
      <div flat class="card">
        <p class="card__title">Total expenses</p>
        <div class="overview__card-total">
          {{ operationStore?.userOverview?.totalExpenses }} ₽
        </div>
      </div>
    </div>
    <div class="col-7">
      <div class="card">
        <div class="flex justify-between q-mb-md">
          <p class="card__title">Last operation</p>
          <p>See all</p>
        </div>
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
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useOperationStore } from 'src/stores/operation';
import AppOperation from 'components/AppOperation.vue';

const operationStore = useOperationStore();

onMounted(async () => {
  await operationStore.getUserOverview();
});
</script>
