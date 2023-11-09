<template>
  <div class="operation flex justify-between items-center q-mb-sm">
    <div class="flex items-center">
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
    <p class="operation__amount" :class="getColorAmount(operation?.kind)">
      {{ operation?.amount }} ₽
    </p>
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
// const props = defineProps(['operation']);
// const authStore = useAuthStore();
// const { getUserCategory, createUserOperation } = useOperation();
</script>
