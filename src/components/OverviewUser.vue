<template>
  <div class="row q-py-md q-col-gutter-sm">
    <div class="col-4">
      <q-card flat class="overview__card">
        <q-card-section> Balance </q-card-section>
        <q-card-section class="overview__card-total">
          {{ userOverview?.totalBalance }}
        </q-card-section>
      </q-card>
    </div>
    <div class="col-4">
      <q-card flat class="overview__card">
        <q-card-section> Total income </q-card-section>
        <q-card-section class="overview__card-total">
          {{ userOverview?.totalIncome }}
        </q-card-section>
      </q-card>
    </div>
    <div class="col-4">
      <q-card flat class="overview__card">
        <q-card-section> Total expenses </q-card-section>
        <q-card-section class="overview__card-total">
          {{ userOverview?.totalExpenses }}
        </q-card-section>
      </q-card>
    </div>
    <div class="col-6">
      <div class="overview__last-operation">
        <div class="flex justify-between">
          <p>Last operation</p>
          <div>See all</div>
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
