<template>
  <div class="operation row q-mb-sm">
    <div class="col-6 flex items-center">
      <div class="operation__category-icon q-mr-md">
        <q-icon name="fa-regular fa-heart" size="32px" color="red" />
      </div>
      <div class="flex column">
        <p class="operation__category-name">
          {{ operation?.categoryUser?.name }}
        </p>
        <p class="operation__date">
          {{ date.formatDate(operation?.date, 'DD MMMM') }}
        </p>
      </div>
    </div>
    <div class="col-3">
      <q-icon
        @click="deleteOperation()"
        name="fa-regular fa-trash-can"
        size="20px"
      />
      <q-icon name="fa-regular fa-pen-to-square" size="20px" />
    </div>
    <div
      class="col-3 operation__amount text-right"
      :class="getColorAmount(operation?.kind)"
    >
      <p>{{ operation?.amount }} ₽</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { useAuthStore } from 'src/stores/auth';
import { useOperation } from 'composables';
import { UserOperation } from 'models';
import { type PropType } from 'vue';
import { date } from 'quasar';

const props = defineProps({
  operation: Object as PropType<UserOperation>,
});

const getColorAmount = (kind: number | undefined) => {
  if (kind === 1) return 'text-positive';
  else return 'text-negative';
};

const deleteOperation = () => {
  console.log();
};
// const props = defineProps(['operation']);
// const authStore = useAuthStore();
// const { getUserCategory, createUserOperation } = useOperation();
</script>
