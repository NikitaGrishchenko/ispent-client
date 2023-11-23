<template>
  <q-layout view="lHh LpR lFf">
    <q-drawer v-model="drawerLeft" side="left">
      <h5 class="text-bold text-primary text-center q-my-md">ispent</h5>
      <q-list padding>
        <q-item
          clickable
          v-ripple
          :active="$route.name === 'IndexPage'"
          :to="{ name: 'IndexPage' }"
        >
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>

          <q-item-section>Overview</q-item-section>
        </q-item>
        <q-item
          :active="$route.name === 'OperationPage'"
          :to="{ name: 'OperationPage' }"
          clickable
          v-ripple
        >
          <q-item-section avatar>
            <q-icon name="sort" />
          </q-item-section>
          <q-item-section>Operations</q-item-section>
        </q-item>
        <q-item
          clickable
          v-ripple
          :active="$route.name === 'UserCategoryPage'"
          :to="{ name: 'UserCategoryPage' }"
        >
          <q-item-section avatar>
            <q-icon name="category" />
          </q-item-section>

          <q-item-section>Categories</q-item-section>
        </q-item>
        <q-item clickable v-ripple @click="isOpenDialogExitConfirmation = true">
          <q-item-section avatar>
            <q-icon name="logout" />
          </q-item-section>

          <q-item-section>Logout</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
      <DialogOperationCreate
        :is-open-dialog="isOpenDialogCreateOperation"
        @close-dialog="resetStateDialogCreateOperation()"
        @update-overview-user="resetStateDialogCreateOperation()"
      />
      <DialogExitConfirmation
        :is-open-dialog="isOpenDialogExitConfirmation"
        @close-dialog="isOpenDialogExitConfirmation = false"
      />
      <q-page-sticky
        position="bottom-right"
        :offset="[18, 18]"
        @click="isOpenDialogCreateOperation = true"
      >
        <q-btn fab icon="add" color="primary" />
      </q-page-sticky>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import DialogOperationCreate from 'components/DialogOperationCreate.vue';
import DialogExitConfirmation from 'components/DialogExitConfirmation.vue';
import { useOperationStore } from 'src/stores/operation';

const operationStore = useOperationStore();

const isOpenDialogExitConfirmation = ref<boolean>(false);
const isOpenDialogCreateOperation = ref<boolean>(false);
const drawerLeft = ref<boolean>(true);

const resetStateDialogCreateOperation = async () => {
  isOpenDialogCreateOperation.value = !isOpenDialogCreateOperation.value;
};

onMounted(async () => {
  await operationStore.getUserCategories();
});
</script>
