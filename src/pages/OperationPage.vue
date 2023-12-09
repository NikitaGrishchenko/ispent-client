<template>
  <q-page class="container">
    <div class="row">
      <div class="col">
        <div class="card">
          <p class="card__title q-mb-md">Operations</p>
          <template v-if="operationsByPeriod?.length == 0">
            <div class="text-center q-my-md">Nothing added</div>
          </template>
          <div
            v-for="day in operationsByPeriod"
            :key="day.id"
            class="operation__day"
          >
            <div class="flex justify-between operation__day-title">
              <p>{{ date.formatDate(day.date, 'D MMMM').toLowerCase() }}</p>
              <p v-if="day.operations.length > 1" class="text-grey">
                {{ day.total }} ₽
              </p>
            </div>
            <template v-for="operation in day.operations" :key="operation.id">
              <AppOperation
                :operation="operation"
                :hide-date="true"
                @update="getOperations"
              />
            </template>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useOperation } from 'composables';
import { ref, onMounted } from 'vue';
import { UserOperationByPeriod } from 'models';
import AppOperation from 'components/Operation/AppOperation.vue';
import { date } from 'quasar';

const operationsByPeriod = ref<UserOperationByPeriod[]>();

const { getOperationsByPeriodOfTime } = useOperation();

const getOperations = async () => {
  operationsByPeriod.value = await getOperationsByPeriodOfTime();
};

onMounted(async () => {
  await getOperations();
});
</script>
