<template>
  <q-page class="category-user container">
    <div class="row q-col-gutter-md">
      <div class="col-6">
        <div class="card">
          <p class="card__title">Create new category</p>
          <q-form ref="form" @submit="onSubmit">
            <div class="row">
              <div class="col-12">
                <q-input
                  filled
                  v-model="newCategoryUser.name"
                  lazy-rules
                  label="Name"
                  :rules="[
                    (val) =>
                      (val && val.length >= 3) || 'Please type something',
                  ]"
                />
              </div>
              <div class="col-12">
                <div class="row q-gutter-sm">
                  <q-select
                    class="col"
                    v-model="newCategoryUser.kind"
                    :options="OPERATION_KIND"
                    emit-value
                    map-options
                    lazy-rules
                    label="Kind"
                    filled
                  />
                  <div
                    @click="openDialogChoiceIconCategory = true"
                    class="col category-user__icon flex flex-center"
                  >
                    <div class="category-user__icon-text">Icon</div>
                    <q-icon
                      :name="newCategoryUser.icon"
                      size="32px"
                      :style="{
                        color: newCategoryUser.color,
                      }"
                    ></q-icon>
                  </div>
                  <q-input
                    class="col"
                    filled
                    label="Color"
                    v-model="newCategoryUser.color"
                    :rules="['anyColor']"
                  >
                    <template v-slot:append>
                      <q-icon name="colorize" class="cursor-pointer">
                        <q-popup-proxy
                          cover
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-color v-model="newCategoryUser.color" />
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
              </div>
              <div class="col-12">
                <q-btn
                  unelevated
                  label="Submit"
                  color="primary"
                  type="submit"
                  class="full-width"
                />
              </div>
            </div>
          </q-form>
        </div>
      </div>
      <div class="col-6">
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
  <DialogChoiceIconCategory
    :is-open-dialog="openDialogChoiceIconCategory"
    :current-icon="newCategoryUser.icon"
    @close-dialog="openDialogChoiceIconCategory = false"
    @pick-icon="(name: string) => (newCategoryUser.icon = name)"
  />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { UserCategory } from 'models';
import { useOperationStore } from 'src/stores/operation';
import AppCategoryUser from 'components/AppCategoryUser.vue';
import DialogChoiceIconCategory from 'components/DialogChoiceIconCategory.vue';
import { useAuthStore } from 'src/stores/auth';
import { OPERATION_KIND } from 'enum';

const authStore = useAuthStore();
const form = ref<HTMLFormElement>();

const newCategoryUser = ref<UserCategory>({
  name: '',
  kind: 2,
  color: '#ffffff',
  icon: 'category',
  userId: authStore.idUser!,
});

const clearInput = () => {
  newCategoryUser.value = {
    name: '',
    kind: 2,
    color: '#ffffff',
    icon: 'category',
    userId: authStore.idUser!,
  };
};

const operationStore = useOperationStore();

const openDialogChoiceIconCategory = ref(false);

const onSubmit = async () => {
  form?.value?.validate().then(async (success: boolean) => {
    if (success) {
      await operationStore
        .createUserCategory(newCategoryUser.value)
        .then(async () => {
          clearInput();
          form?.value?.resetValidation();
        });
    }
  });
};

const incomeCategoryUser = computed(() => {
  return operationStore.userCategory?.filter((c) => c.kind === 1);
});
const expenseCategoryUser = computed(() => {
  return operationStore.userCategory?.filter((c) => c.kind === 2);
});
</script>
