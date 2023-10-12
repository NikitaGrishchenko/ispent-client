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
        :loading="loadingBtn"
        class="full-width"
        label="Submit"
        type="submit"
        color="primary"
      />
    </q-form>
  </q-page>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { ref } from 'vue';
import { useAuth } from 'src/composables/useAuth';

const $q = useQuasar();

const username = ref<string>('');
const password = ref<string>('');
const loadingBtn = ref<boolean>(false);

const { userLogin } = useAuth();

const onSubmit = async () => {
  loadingBtn.value = true;
  try {
    await userLogin(username.value, password.value);
  } catch (error) {
  } finally {
    loadingBtn.value = false;
  }
};
</script>
