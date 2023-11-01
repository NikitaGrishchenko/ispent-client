<template>
  <q-dialog v-model="showDialog" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">New operation</div>
      </q-card-section>
      {{ filteringUserCategory }}
      <q-form class="" @submit="onSubmit">
        <q-card-section class="q-pt-none">
          <q-btn-toggle
            v-model="kind"
            spread
            toggle-color="primary"
            :options="[
              { label: 'INCOME', value: '1' },
              { label: 'EXPENSE', value: '2' },
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
          />
          <q-input filled v-model="comment" label="Comment" />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Add address" type="submit" v-close-popup />
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

const authStore = useAuthStore();
const { getUserCategory, createUserOperation } = useOperation();

const props = defineProps({
  isOpen: Boolean,
});

const selectedCategory = ref<UserCategory>();
const userCategory = ref<UserCategory[]>();
const filteringUserCategory = ref<UserCategory[]>();

const kind = ref<string>('');
const amount = ref<number>();
const comment = ref<string>('');

const onSubmit = async () => {
  const data: UserOperation = {
    userId: authStore.idUser,
    categoryUserId: selectedCategory.value?.id,
    amount: Number(amount.value),
    kind: Number(kind.value),
    date: Date.now(),
    comment: comment.value,
  };
  console.log(data);

  await createUserOperation(data);
  //   await authStore.userLogin(username.value, password.value);
};

// const filterFn: QSelectProps['onFilter'] = (val, update, abort) => {
//   if (val.length < 2) {
//     abort()
//     return
//   }
//   update(() => {
//     const query = val.toLowerCase()
//     options.value = searchList.value?.filter(
//       v => v.name.toLowerCase().indexOf(query) > -1,
//     )
//   })
// }

const showDialog = computed(() => props.isOpen);

watch(kind, (newValue) => {
  filteringUserCategory.value = userCategory.value?.filter(
    (c) => c.kind === Number(newValue)
  );
});

onMounted(async () => {
  authStore.showPreloader = true;
  userCategory.value = await getUserCategory();
  authStore.showPreloader = false;
});
</script>
