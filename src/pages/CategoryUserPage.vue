<template>
  <q-page class="container">
    <div class="row">
      <div class="col-4">
        <div class="card"></div>
      </div>
      <div class="col-8">
        <div class="card q-mb-md">
          <p class="card__title">Income categories</p>
          <template v-for="category in incomeCategoryUser" :key="category.id">
            <AppCategoryUser :category-user="category" />
          </template>
        </div>
        <div class="card">
          <p class="card__title">Expense categories</p>
          <template v-for="category in expenseCategoryUser" :key="category.id">
            <AppCategoryUser :category-user="category" />
          </template>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { UserCategory, UserOperation } from 'models';
import { useOperationStore } from 'src/stores/operation';
import AppCategoryUser from 'components/AppCategoryUser.vue';

const operationStore = useOperationStore();
const incomeCategoryUser = ref<UserCategory[]>();
const expenseCategoryUser = ref<UserCategory[]>();

const filterUserCategory = () => {
  incomeCategoryUser.value = operationStore.userCategory?.filter(
    (c) => c.kind === 1
  );
  expenseCategoryUser.value = operationStore.userCategory?.filter(
    (c) => c.kind === 2
  );
};

onMounted(async () => {
  filterUserCategory();
});
</script>
