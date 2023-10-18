<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="container">
        <q-toolbar-title> ispent </q-toolbar-title>
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
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { useAuthStore } from 'src/stores/auth';

const authStore = useAuthStore();
</script>
