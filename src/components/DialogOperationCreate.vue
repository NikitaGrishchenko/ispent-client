<template>
  <q-dialog v-model="showDialog" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">New operation</div>
      </q-card-section>
      <q-form @submit="onSubmit">
        <q-card-section class="q-pt-none">
          <q-btn-toggle
            v-model="kind"
            spread
            class="q-mb-md no-box-shadow"
            @update:model-value="selectedCategory = undefined"
            toggle-color="primary"
            :options="[
              { label: 'INCOME', value: 1 },
              { label: 'EXPENSE', value: 2 },
            ]"
          />
          <q-input
            filled
            v-model="amount"
            label="Amount"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />
          <q-select
            v-model="selectedCategory"
            :options="filteringUserCategory"
            :disable="!kind"
            option-label="name"
            label="Category"
            filled
            input-debounce="0"
            class="q-field--with-bottom"
          />
          <q-input
            filled
            v-model="comment"
            label="Comment"
            class="q-field--with-bottom"
          />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn
            flat
            label="Cancel"
            v-close-popup
            @click="emit('reset-state-dialog')"
          />
          <q-btn flat label="Add" type="submit" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { useAuthStore } from 'src/stores/auth';
import { useOperation } from 'composables';
import { UserCategory, UserOperation } from 'models';
import { useOperationStore } from 'src/stores/operation';
import { useQuasar } from 'quasar';

const authStore = useAuthStore();
const operationStore = useOperationStore();
const { createUserOperation } = useOperation();
const $q = useQuasar();

const props = defineProps({
  isOpenDialog: Boolean,
});

const emit = defineEmits<{
  (e: 'reset-state-dialog'): void;
}>();

const userCategory = ref<UserCategory[]>();
const filteringUserCategory = ref<UserCategory[]>();

const selectedCategory = ref<UserCategory>();
const kind = ref<string>('');
const amount = ref<number>();
const comment = ref<string>('');

const clearInput = () => {
  selectedCategory.value = undefined;
  amount.value = undefined;
  comment.value = '';
  kind.value = '';
};

const onSubmit = async () => {
  try {
    const data: UserOperation = {
      userId: authStore.idUser as number,
      categoryUserId: selectedCategory.value?.id as number,
      amount: amount.value as number,
      kind: Number(kind.value),
      date: Date.now(),
      comment: comment.value,
    };

    await createUserOperation(data).then(async () => {
      clearInput();
      await operationStore.getUserOverview();
      $q.notify({
        message: 'Operation added',
        color: 'positive',
        position: 'top-right',
        icon: 'check_circle_outline',
      });
    });
  } catch (e) {
    console.error(e);
  } finally {
  }
};

const showDialog = computed(() => props.isOpenDialog);

watch(kind, (newValue) => {
  filteringUserCategory.value = userCategory.value?.filter(
    (c) => c.kind === Number(newValue)
  );
});

onMounted(async () => {
  userCategory.value = operationStore.userCategory;
});
</script>
