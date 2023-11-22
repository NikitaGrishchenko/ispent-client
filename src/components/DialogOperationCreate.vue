<template>
  <q-dialog @show="filterUserCategory(kind)" v-model="showDialog" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">New operation</div>
      </q-card-section>
      <q-form ref="form" @submit="onSubmit">
        <q-card-section class="q-pt-none">
          <q-btn-toggle
            v-model="kind"
            spread
            class="q-mb-md no-box-shadow form__toggle"
            @update:model-value="selectedCategory = undefined"
            toggle-color="primary"
            :options="OPERATION_KIND"
          />
          <q-input
            filled
            v-model="amount"
            lazy-rules
            label="Amount"
            :rules="[(val) => (val && val >= 0) || 'Please type something']"
          />
          <q-select
            v-model="selectedCategory"
            :options="filteringUserCategory"
            :disable="!kind"
            option-label="name"
            lazy-rules
            label="Category"
            filled
            :rules="[(val) => val || 'Please select a category']"
            input-debounce="0"
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
            @click="
              emit('reset-state-dialog');
              clearInput();
            "
          />
          <q-btn unelevated color="primary" label="Add" type="submit" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useAuthStore } from 'src/stores/auth';
import { useOperation } from 'composables';
import { UserCategory, UserOperation } from 'models';
import { useOperationStore } from 'src/stores/operation';
import { OPERATION_KIND } from 'enum';

const authStore = useAuthStore();
const operationStore = useOperationStore();
const { createUserOperation } = useOperation();

const props = defineProps({
  isOpenDialog: Boolean,
});

const emit = defineEmits<{
  (e: 'reset-state-dialog'): void;
}>();

const form = ref<HTMLFormElement>();

const filteringUserCategory = ref<UserCategory[]>();

const selectedCategory = ref<UserCategory>();
const kind = ref<number>(2);
const amount = ref<number>();
const comment = ref<string>('');

const clearInput = () => {
  selectedCategory.value = undefined;
  amount.value = undefined;
  comment.value = '';
  kind.value = 2;
};

const onSubmit = async () => {
  form?.value?.validate().then(async (success: boolean) => {
    if (success) {
      const data: UserOperation = {
        userId: authStore.idUser as number,
        categoryUserId: selectedCategory.value?.id as number,
        amount: amount.value as number,
        kind: kind.value,
        date: Date.now(),
        comment: comment.value,
      };

      await createUserOperation(data).then(async () => {
        clearInput();
        form?.value?.resetValidation();
        await operationStore.getUserOverview();
      });
    }
  });
};

const showDialog = computed(() => props.isOpenDialog);

const filterUserCategory = (kind: number) => {
  filteringUserCategory.value = operationStore.double?.filter(
    (c) => c.kind === Number(kind)
  );
};

watch(kind, (newValue) => {
  filterUserCategory(newValue);
});
</script>
