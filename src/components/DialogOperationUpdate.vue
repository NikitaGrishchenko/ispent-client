<template>
  <q-dialog v-model="showDialog" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">Update operation</div>
      </q-card-section>
      <q-form>
        <!-- <q-form v-if="updateOperation" @submit="onSubmit"> -->
        <q-card-section class="q-pt-none">
          <q-btn-toggle
            v-model="kind"
            spread
            class="q-mb-md no-box-shadow"
            @update:model-value="categoryUser = undefined"
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
            v-model="categoryUser"
            :options="filteringUserCategory"
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
            @click="emit('close-update-dialog')"
          />
          <q-btn flat label="Add" type="submit" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch, reactive } from 'vue';
import { useOperation } from 'composables';
import { UserCategory, UserOperation } from 'models';
import { type PropType } from 'vue';

const { getUserCategories } = useOperation();

const props = defineProps({
  isOpenDialog: Boolean,
  operation: Object as PropType<UserOperation>,
});

const userCategory = ref<UserCategory[]>();
const filteringUserCategory = ref<UserCategory[]>();

const emit = defineEmits<{
  (e: 'close-update-dialog'): void;
}>();

const categoryUser = ref<UserCategory>();
const kind = ref<number>();
const amount = ref<number>();
const comment = ref<string>('');

const showDialog = computed(() => props.isOpenDialog);

// const updateOperation = reactive<UserOperation>(
//   Object.assign({}, props.operation)
// );

// const onSubmit = async () => {
//   try {
//     const data: UserOperation = {
//       userId: authStore.idUser as number,
//       categoryUserId: selectedCategory.value?.id as number,
//       amount: amount.value as number,
//       kind: Number(kind.value),
//       date: Date.now(),
//       comment: comment.value,
//     };

//     await createUserOperation(data).then(async () => {
//       clearInput();
//       await operationStore.getUserOverview();
//       $q.notify({
//         message: 'Operation added',
//         color: 'positive',
//         position: 'top-right',
//         icon: 'check_circle_outline',
//       });
//     });
//   } catch (e) {
//     console.error(e);
//   } finally {
//   }
// };

const getFilteringUserCategory = (newValue: number) => {
  filteringUserCategory.value = userCategory.value?.filter(
    (c) => c.kind === newValue
  );
};

watch(kind, (newValue) => {
  getFilteringUserCategory(Number(newValue));
});

onMounted(async () => {
  userCategory.value = await getUserCategories();
  if (props.operation) {
    categoryUser.value = props.operation?.categoryUser;
    kind.value = props.operation?.kind;
    amount.value = props.operation?.amount;
    comment.value = props.operation?.comment;
  }
  if (props.operation?.kind) getFilteringUserCategory(props?.operation?.kind);
});
</script>
