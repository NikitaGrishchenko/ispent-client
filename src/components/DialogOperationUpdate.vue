<template>
  <q-dialog @show="filterCategoryUser(kind!)" v-model="showDialog" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">Update operation</div>
      </q-card-section>
      <q-form ref="form" @submit="onSubmit">
        <q-card-section class="q-pt-none">
          <q-btn-toggle
            v-model="kind"
            spread
            class="q-mb-md no-box-shadow form__toggle"
            @update:model-value="categoryUser = undefined"
            toggle-color="primary"
            :options="OPERATION_KIND"
          />
          <q-input
            filled
            v-model="amount"
            label="Amount"
            lazy-rules
            :rules="[(val) => (val && val >= 0) || 'Please type something']"
          />
          <q-select
            v-model="categoryUser"
            :options="filteringCategoryUser"
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
            @click="
              emit('close-update-dialog');
              setDefaultValues();
            "
          />
          <q-btn unelevated color="primary" label="Update" type="submit" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { useOperation } from 'composables';
import { CategoryUser, UserOperation } from 'models';
import { type PropType } from 'vue';
import { useAuthStore } from 'src/stores/auth';
import { useOperationStore } from 'src/stores/operation';
import { OPERATION_KIND } from 'enum';

const authStore = useAuthStore();
const { updateUserOperation } = useOperation();
const operationStore = useOperationStore();

const props = defineProps({
  isOpenDialog: Boolean,
  operation: Object as PropType<UserOperation>,
});

const form = ref<HTMLFormElement>();

const filteringCategoryUser = ref<CategoryUser[]>();

const emit = defineEmits<{
  (e: 'close-update-dialog'): void;
}>();

const categoryUser = ref<CategoryUser>();
const kind = ref<number>();
const amount = ref<number>();
const comment = ref<string>('');

const showDialog = computed(() => props.isOpenDialog);

const setDefaultValues = () => {
  if (props.operation) {
    categoryUser.value = props.operation?.categoryUser;
    kind.value = props.operation?.kind;
    amount.value = props.operation?.amount;
    comment.value = props.operation?.comment;
  }
};

const onSubmit = async () => {
  form?.value?.validate().then(async (success: boolean) => {
    if (success) {
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
    }
  });
};

const filterCategoryUser = (newValue: number) => {
  filteringCategoryUser.value = operationStore.categoryUser?.filter(
    (c) => c.kind === newValue
  );
};

watch(kind, (newValue) => {
  filterCategoryUser(Number(newValue));
});

onMounted(async () => {
  setDefaultValues();
  if (props.operation?.kind) filterCategoryUser(props?.operation?.kind);
});
</script>
