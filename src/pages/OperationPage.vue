<template>
  <q-page class="container operation-page">
    <div class="row">
      <div class="col-12 q-pb-md flex justify-between items-center">
        <q-btn
          flat
          @click="operationStore.changeCurrentMonth(-1)"
          icon="chevron_left"
          >prev</q-btn
        >
        <h5 class="operation-page__title">
          {{ operationStore.currentMonth.toFormat('MMMM yyyy') }}
        </h5>
        <q-btn
          flat
          @click="operationStore.changeCurrentMonth(1)"
          icon-right="chevron_right"
          >next</q-btn
        >
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="card">
          <template v-if="operations?.length == 0">
            <div class="text-center q-my-md">Nothing added</div>
          </template>
          <div v-for="day in operations" :key="day.id" class="operation__day">
            <div class="flex justify-between operation__day-title">
              <p>
                {{ date.formatDate(day.date, 'D MMMM').toLowerCase() }}
              </p>
              <p v-if="day.operations.length > 1" class="text-grey">
                {{ formatter.format(day.total) }}
              </p>
            </div>
            <template v-for="operation in day.operations" :key="operation.id">
              <OperationItem :operation="operation" :hide-date="true" />
            </template>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import OperationItem from 'components/Operation/OperationItem.vue';
import { date } from 'quasar';
import { useOperationStore } from 'src/stores/operation';
import { formatter } from 'boot/formatter';

const operationStore = useOperationStore();
const operations = computed(() => operationStore.operations);

onMounted(async () => {
  await operationStore.getOperationsByPeriodOfTime();
});
</script>
