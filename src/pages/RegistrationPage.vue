<template>
  <q-page class="login flex justify-center items-center">
    <q-form class="login-form" @submit="onSubmit">
      <h5 class="q-mb-md text-center">Registration</h5>
      <q-input
        filled
        v-model="username"
        label="E-mail"
        type="email"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />

      <q-input
        filled
        v-model="password"
        type="password"
        label="Password"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />
      <q-btn
        :loading="authStore.showPreloader"
        type="submit"
        class="full-width"
        label="Submit"
        unelevated
        color="primary"
      />
    </q-form>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from 'src/stores/auth';

const authStore = useAuthStore();

const username = ref<string>('');
const password = ref<string>('');

const onSubmit = async () => {
  authStore.showPreloader = true;
  try {
    await authStore.userLogin(username.value, password.value);
  } catch (error) {
  } finally {
    authStore.showPreloader = false;
  }
};
</script>
