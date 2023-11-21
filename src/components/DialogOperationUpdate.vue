<template>
  <q-dialog @show="filterUserCategory(kind!)" v-model="showDialog" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">Update operation</div>
      </q-card-section>
      <q-form @submit="onSubmit">
        <q-card-section class="q-pt-none">
          <q-btn-toggle
            v-model="kind"
            spread
            class="q-mb-md no-box-shadow form__toggle"
            @update:model-value="categoryUser = undefined"
            toggle-color="primary"
            :options="[
              { label: 'EXPENSE', value: 2 },
              { label: 'INCOME', value: 1 },
            ]"
          />
          <q-input
            filled
            v-model="amount"
            label="Amount"
            lazy-rules
            :rules="[(val) => val.length > 0 || 'Please type something']"
          />
          <q-select
            v-model="categoryUser"
            :options="filteringUserCategory"
            option-label="name"
            label="Category"
            filled
            lazy-rules
            input-debounce="0"
            class="q-field--with-bottom"
            :rules="[(val) => val || 'Please select a category']"
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
            @click="emit('close-update-dialog')"
          />
          <q-btn flat label="Add" type="submit" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { useOperation } from 'composables';
import { UserCategory, UserOperation } from 'models';
import { type PropType } from 'vue';
import { useAuthStore } from 'src/stores/auth';
import { useOperationStore } from 'src/stores/operation';

const authStore = useAuthStore();
const { updateUserOperation } = useOperation();
const operationStore = useOperationStore();

const props = defineProps({
  isOpenDialog: Boolean,
  operation: Object as PropType<UserOperation>,
});

const filteringUserCategory = ref<UserCategory[]>();

const emit = defineEmits<{
  (e: 'close-update-dialog'): void;
}>();

const categoryUser = ref<UserCategory>();
const kind = ref<number>();
const amount = ref<number>();
const comment = ref<string>('');

const showDialog = computed(() => props.isOpenDialog);

const onSubmit = async () => {
  const data: UserOperation = {
    id: props.operation?.id,
    userId: authStore.idUser as number,
    categoryUserId: categoryUser.value?.id as number,
    amount: amount.value as number,
    kind: Number(kind.value),
    comment: comment.value,
  };
  await updateUserOperation(data).then(async () => {
    await operationStore.getUserOverview();
    emit('close-update-dialog');
  });
};

const filterUserCategory = (newValue: number) => {
  filteringUserCategory.value = operationStore.userCategory?.filter(
    (c) => c.kind === newValue
  );
};

watch(kind, (newValue) => {
  filterUserCategory(Number(newValue));
});

onMounted(async () => {
  if (props.operation) {
    categoryUser.value = props.operation?.categoryUser;
    kind.value = props.operation?.kind;
    amount.value = props.operation?.amount;
    comment.value = props.operation?.comment;
  }
  if (props.operation?.kind) filterUserCategory(props?.operation?.kind);
});
</script>
