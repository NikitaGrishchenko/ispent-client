<template>
  <div class="row q-py-md q-col-gutter-sm">
    <div class="col-4">
      <q-card flat class="overview__card">
        <q-card-section> <h6>Balance</h6> </q-card-section>
        <q-card-section class="overview__card-total">
          {{ userOverview?.totalBalance }}
        </q-card-section>
      </q-card>
    </div>
    <div class="col-4">
      <q-card flat class="overview__card">
        <q-card-section> <h6>Total income</h6> </q-card-section>
        <q-card-section class="overview__card-total">
          {{ userOverview?.totalIncome }}
        </q-card-section>
      </q-card>
    </div>
    <div class="col-4">
      <q-card flat class="overview__card">
        <q-card-section> <h6>Total expenses</h6> </q-card-section>
        <q-card-section class="overview__card-total">
          {{ userOverview?.totalExpenses }}
        </q-card-section>
      </q-card>
    </div>
    <div class="col-6">
      <div class="overview__last-operation">
        <div class="flex justify-between q-mb-md">
          <h6>Last operation</h6>
          <p>See all</p>
        </div>
        <template
          v-for="operation in userOverview?.lastOperations"
          :key="operation.id"
        >
          <AppOperation :operation="operation" />
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useOperation } from 'composables';
import { ref, onMounted } from 'vue';
import { UserOverview } from 'models';
import { useAuthStore } from 'src/stores/auth';
import AppOperation from 'components/AppOperation.vue';

const { getUserOverview } = useOperation();
const authStore = useAuthStore();

const userOverview = ref<UserOverview>();

onMounted(async () => {
  authStore.showPreloader = true;
  userOverview.value = await getUserOverview();
  authStore.showPreloader = false;
});
</script>
