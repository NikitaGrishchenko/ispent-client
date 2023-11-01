<template>
  <div class="row q-py-md q-col-gutter-sm">
    <div class="col-4">
      <q-card flat class="overview-card">
        <q-card-section> Total balance </q-card-section>
        <q-card-section class="overview-card__total">
          {{ userOverview?.totalBalance }}
        </q-card-section>
      </q-card>
    </div>
    <div class="col-4">
      <q-card flat class="overview-card">
        <q-card-section> Total income </q-card-section>
        <q-card-section class="overview-card__total">
          {{ userOverview?.totalIncome }}
        </q-card-section>
      </q-card>
    </div>
    <div class="col-4">
      <q-card flat class="overview-card">
        <q-card-section> Total expenses </q-card-section>
        <q-card-section class="overview-card__total">
          {{ userOverview?.totalExpenses }}
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useOperation } from 'composables';
import { ref, onMounted } from 'vue';
import { UserOverview } from 'models';
import { useAuthStore } from 'src/stores/auth';

const { getUserOverview } = useOperation();
const authStore = useAuthStore();

const userOverview = ref<UserOverview>();

onMounted(async () => {
  authStore.showPreloader = true;
  userOverview.value = await getUserOverview();
  authStore.showPreloader = false;
});
</script>
