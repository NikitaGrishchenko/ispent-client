<template>
  <q-page class="login flex justify-center items-center">
    <q-form class="login-form" @submit="onSubmit">
      <h5 class="q-mb-md text-center">Registration</h5>
      <q-input
        filled
        v-model="createUserData.firstName"
        label="First Name"
        lazy-rules
        class="q-field--with-bottom"
      />
      <q-input
        filled
        v-model="createUserData.lastName"
        label="Last Name"
        lazy-rules
        class="q-field--with-bottom"
      />
      <q-input
        filled
        v-model="createUserData.email"
        label="E-mail"
        type="email"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />
      <q-input
        filled
        v-model="createUserData.password"
        type="password"
        label="Password"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />
      <q-btn
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
import { useAuth } from 'composables';

import { UserCreate } from 'models';

const { createUser } = useAuth();

const createUserData = ref<UserCreate>({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
});

const clear = () => {
  createUserData.value = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };
};

const onSubmit = async () => {
  await createUser(createUserData.value)
    .then((e) => {
      console.log(e);
    })
    .catch((e) => {
      console.log(e);
    });
};
</script>
