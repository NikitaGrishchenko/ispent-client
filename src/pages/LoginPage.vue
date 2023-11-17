<template>
  <q-page class="login flex justify-center items-center">
    <q-form class="login-form" @submit="onSubmit">
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
        :loading="isLoading"
        type="submit"
        class="full-width"
        label="Submit"
        unelevated
        color="primary"
      />
      <q-btn
        label="Register"
        color="primary"
        class="full-width"
        flat
        to="/registration"
      />
    </q-form>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from 'src/stores/auth';
import { isLoading } from 'composables';

const authStore = useAuthStore();

const username = ref<string>('');
const password = ref<string>('');

const onSubmit = async () => {
  try {
    await authStore.userLogin(username.value, password.value);
  } catch (error) {
  } finally {
  }
};
</script>
