<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="container">
        <q-toolbar-title class="text-primary"> ispent </q-toolbar-title>
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
      <DialogCreateOperation :is-open="true" />
      <AppPreloader :showing="authStore.showPreloader" />
      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn fab icon="add" color="accent" />
      </q-page-sticky>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { useAuthStore } from 'src/stores/auth';
import DialogCreateOperation from 'components/DialogCreateOperation.vue';
import AppPreloader from 'components/AppPreloader.vue';

const authStore = useAuthStore();
</script>
