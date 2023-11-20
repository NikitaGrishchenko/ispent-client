<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="container">
        <q-toolbar-title class="text-bold text-primary">
          ispent
        </q-toolbar-title>
        <q-btn
          v-if="authStore.isAuth"
          flat
          icon="logout"
          label="Logout"
          @click="authStore.userLogout()"
        />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
      <DialogOperationCreate
        :is-open-dialog="isOpenDialog"
        @reset-state-dialog="resetStateDialog"
        @update-overview-user="resetStateDialog"
      />
      <q-page-sticky
        position="bottom-right"
        :offset="[18, 18]"
        @click="resetStateDialog()"
      >
        <q-btn fab icon="add" color="primary" />
      </q-page-sticky>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import DialogOperationCreate from 'components/DialogOperationCreate.vue';
import { useOperationStore } from 'src/stores/operation';
import { useAuthStore } from 'src/stores/auth';

const operationStore = useOperationStore();
const authStore = useAuthStore();

const isOpenDialog = ref<boolean>(false);

const resetStateDialog = async () => {
  isOpenDialog.value = !isOpenDialog.value;
};

onMounted(async () => {
  await operationStore.getUserCategories();
});
</script>
