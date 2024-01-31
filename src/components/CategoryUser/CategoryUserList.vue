<template>
  <div class="category-user__list">
    <template v-for="category in props.categoriesUser" :key="category.id">
      <CategoryUserItem :category-user="category" />
    </template>
    <template v-if="categoriesUser?.length == 0">
      <div class="text-center q-my-md">Nothing added</div>
    </template>
  </div>
</template>

<script setup lang="ts">
import CategoryUserItem from 'components/CategoryUser/CategoryUserItem.vue';
import { CategoryUser } from 'models';
import type { PropType } from 'vue';

const props = defineProps({
  categoriesUser: Object as PropType<CategoryUser[]>,
});
</script>
