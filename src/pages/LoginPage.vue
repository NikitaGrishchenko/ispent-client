<template>
  <q-page class="login flex justify-center items-center">
    <q-form class="login-form" @submit="onSubmit">
      <div class="text-center q-mb-xl">
        <h5 class="text-bold text-primary">ispent</h5>
      </div>
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
        :type="showPassword ? 'text' : 'password'"
        label="Password"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      >
        <template v-slot:append>
          <q-icon
            :name="showPassword ? 'visibility' : 'visibility_off'"
            class="cursor-pointer"
            @click="showPassword = !showPassword"
          />
        </template>
      </q-input>
      <q-btn
        :loading="isLoading"
        type="submit"
        class="full-width"
        label="Submit"
        unelevated
        color="primary"
      />
      <div class="flex justify-center q-pt-md">
        <q-btn label="Register" color="primary" flat to="/registration" />
      </div>
    </q-form>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from 'src/stores/auth';
import { isLoading } from 'composables';

const authStore = useAuthStore();
const showPassword = ref<boolean>(false);

const username = ref<string>('');
const password = ref<string>('');

const onSubmit = async () => {
  await authStore.userLogin(username.value, password.value);
};
</script>
