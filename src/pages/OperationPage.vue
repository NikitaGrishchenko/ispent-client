<template>
  <q-page class="container">
    <div class="row">
      <div class="col">
        <div class="card">
          <p class="card__title">Operations</p>
          <div v-for="day in operationsByPeriod" :key="day.date">
            {{ day.date }}
            <template v-for="operation in day.operations" :key="operation.id">
              <AppOperation :operation="operation" />
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

const operationsByPeriod = ref<UserOperationByPeriod[]>();

const { getOperationsByPeriodOfTime } = useOperation();

onMounted(async () => {
  operationsByPeriod.value = await getOperationsByPeriodOfTime();
});
</script>
