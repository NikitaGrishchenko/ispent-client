<template>
  <q-page class="flex column justify-center items-center text-positive">
    <template v-if="successConfirm">
      <q-icon name="mark_email_read" size="40px" />
      <h4 class="q-my-md">The E-mail has been confirmed</h4>
      <q-btn label="Back To Home" color="primary" to="/" />
    </template>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useAuth } from 'composables';
import { useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const { confirmEmailUser } = useAuth();

const successConfirm = ref<boolean>(false);

onMounted(async () => {
  if (route.query.token) {
    await confirmEmailUser(String(route.query.token))
      .then(() => {
        successConfirm.value = true;
      })
      .catch(() => {
        router.push({
          name: 'Overview',
        });
      });
  }
});
</script>
