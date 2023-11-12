<template>
  <div class="row q-py-md q-col-gutter-sm">
    <div class="col-4">
      <q-card flat class="overview__card">
        <q-card-section> <h6>Balance</h6> </q-card-section>
        <q-card-section class="overview__card-total">
          {{ operationStore?.userOverview?.totalBalance }} ₽
        </q-card-section>
      </q-card>
    </div>
    <div class="col-4">
      <q-card flat class="overview__card">
        <q-card-section> <h6>Total income</h6> </q-card-section>
        <q-card-section class="overview__card-total">
          {{ operationStore?.userOverview?.totalIncome }} ₽
        </q-card-section>
      </q-card>
    </div>
    <div class="col-4">
      <q-card flat class="overview__card">
        <q-card-section> <h6>Total expenses</h6> </q-card-section>
        <q-card-section class="overview__card-total">
          {{ operationStore?.userOverview?.totalExpenses }} ₽
        </q-card-section>
      </q-card>
    </div>
    <div class="col-6">
      <div class="overview__last-operation">
        <div class="flex justify-between q-mb-md">
          <h6>Last operation</h6>
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
import { useAuthStore } from 'src/stores/auth';
import AppOperation from 'components/AppOperation.vue';

const operationStore = useOperationStore();
const authStore = useAuthStore();

onMounted(async () => {
  authStore.showPreloader = true;
  await operationStore.getUserOverview();
  authStore.showPreloader = false;
});
</script>
