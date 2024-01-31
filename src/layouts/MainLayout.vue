<template>
  <q-layout view="lHh LpR lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          class="lt-md"
          flat
          @click="isOpenDrawer = !isOpenDrawer"
          round
          dense
          icon="menu"
        />
        <q-toolbar-title>{{ $route.name }}</q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-drawer class="border" bordered v-model="isOpenDrawer" side="left">
      <h5 class="text-bold text-primary text-center q-my-md">ispent</h5>
      <q-list padding>
        <q-item
          v-for="item in drawerLinks"
          :key="item.namePage"
          clickable
          v-ripple
          :active="$route.name === item.namePage"
          :to="{ name: item.namePage }"
        >
          <q-item-section avatar>
            <q-icon :name="item.icon" />
          </q-item-section>
          <q-item-section>{{ item.namePage }}</q-item-section>
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
      {{}}
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
import DialogOperationCreate from 'components/Operation/DialogOperationCreate.vue';
import DialogExitConfirmation from 'components/Dialog/DialogExitConfirmation.vue';
import { useOperationStore } from 'src/stores/operation';
import { useQuasar } from 'quasar';

const $q = useQuasar();

const operationStore = useOperationStore();

const isOpenDialogExitConfirmation = ref<boolean>(false);
const isOpenDialogCreateOperation = ref<boolean>(false);
const isOpenDrawer = ref<boolean>($q.screen.lt.md ? false : true);

const drawerLinks = [
  { namePage: 'Overview', icon: 'home' },
  { namePage: 'Operations', icon: 'sort' },
  { namePage: 'Categories', icon: 'category' },
];

const resetStateDialogCreateOperation = async () => {
  isOpenDialogCreateOperation.value = !isOpenDialogCreateOperation.value;
};

onMounted(async () => {
  await operationStore.getUserCategories();
});
</script>
