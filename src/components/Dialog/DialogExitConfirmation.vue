<template>
  <q-dialog v-model="showDialog" persistent>
    <q-card style="min-width: 350px">
      <q-card-section class="row items-center">
        <span class="q-ml-sm">Do you really want to log out?</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          flat
          label="Cancel"
          color="primary"
          @click="emit('close-dialog')"
        />
        <q-btn
          flat
          label="Confirm"
          color="negative"
          @click="
            emit('close-dialog');
            authStore.userLogout();
          "
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useAuthStore } from 'src/stores/auth';

const authStore = useAuthStore();

const props = defineProps({
  isOpenDialog: Boolean,
});

const emit = defineEmits<{
  (e: 'close-dialog'): void;
}>();

const showDialog = computed(() => props.isOpenDialog);
</script>
