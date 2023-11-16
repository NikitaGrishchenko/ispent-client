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
      <DialogCreateOperation
        :is-open-dialog="isOpenDialog"
        @reset-state-dialog="resetStateDialog"
        @update-overview-user="resetStateDialog"
      />
      <AppPreloader :showing="authStore.showPreloader" />
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
import { useAuthStore } from 'src/stores/auth';
import DialogCreateOperation from 'components/DialogCreateOperation.vue';
import AppPreloader from 'components/AppPreloader.vue';
import { ref } from 'vue';

const isOpenDialog = ref<boolean>(false);

const resetStateDialog = async () => {
  isOpenDialog.value = !isOpenDialog.value;
};

const authStore = useAuthStore();
</script>
