<template>
  <div class="category-user__list">
    <template v-for="category in props.totalByCategories" :key="category.id">
      <CategoryUserTotalItem :total-by-category="category" />
    </template>
    <div class="row" v-if="props.totalByCategories?.length == 0">
      <p class="col text-center q-pb-md">Nothing added</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import CategoryUserTotalItem from 'components/CategoryUser/CategoryUserTotalItem.vue';
import { TotalByCategories } from 'models';
import type { PropType } from 'vue';

const props = defineProps({
  totalByCategories: Object as PropType<TotalByCategories[]>,
});
</script>
