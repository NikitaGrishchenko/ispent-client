<template>
  <q-page class="container">
    <div class="row">
      <div class="col">
        <div class="card">
          <p class="card__title q-mb-md">Operations</p>
          <div v-for="day in operationsByPeriod" :key="day.id">
            <div class="flex">
              <p>{{ date.formatDate(day.date, 'D MMMM').toLowerCase() }}</p>
              <p>{{ day.total }}</p>
            </div>
            <template v-for="operation in day.operations" :key="operation.id">
              <AppOperation :operation="operation" :hide-date="true" />
            </template>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useOperation } from 'composables';
import { ref, onMounted, computed, watch } from 'vue';
import { UserOperation, UserOperationByPeriod } from 'models';
import AppOperation from 'components/Operation/AppOperation.vue';
import { date } from 'quasar';

const operationsByPeriod = ref<UserOperationByPeriod[]>();

const { getOperationsByPeriodOfTime } = useOperation();

onMounted(async () => {
  operationsByPeriod.value = await getOperationsByPeriodOfTime();
});
</script>
