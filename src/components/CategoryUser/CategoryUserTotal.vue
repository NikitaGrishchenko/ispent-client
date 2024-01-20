<template>
  <div class="category-user__total row items-center q-mb-sm">
    <div class="col-9 flex items-center">
      <q-icon
        :name="props.totalByCategories?.categoryUser?.icon"
        :style="{ color: props.totalByCategories?.categoryUser?.color }"
        class="category-user__total-icon"
      />
      <p class="q-ml-md">
        {{ props.totalByCategories?.categoryUser?.name }}
      </p>
    </div>
    <div class="col-3 text-right">
      <span
        v-html="getStyleAmountForTotalCategory(props.totalByCategories?.total!, props.totalByCategories?.categoryUser?.kind!)"
      ></span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TotalByCategories } from 'models';
import { type PropType } from 'vue';

import { useOperation } from 'composables';
const { getStyleAmountForTotalCategory } = useOperation();

const props = defineProps({
  totalByCategories: Object as PropType<TotalByCategories>,
});
</script>
