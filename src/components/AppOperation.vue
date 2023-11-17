<template>
  <div class="operation row items-center q-mb-sm">
    <div class="col-6 flex items-center">
      <div class="operation__category-icon q-mr-md">
        <q-icon name="favorite_border" size="32px" />
      </div>
      <div class="flex column">
        <p class="operation__category-name">
          {{ operation?.categoryUser?.name }}
        </p>
        <p class="operation__date">
          {{ date.formatDate(operation?.date, 'DD MMMM') }}
        </p>
      </div>
    </div>
    <div class="col-3">
      <q-icon @click="openConfirm = true" name="delete_outline" size="20px" />
      <q-icon name="edit" size="20px" />
    </div>
    <div
      class="col-3 operation__amount text-right"
      :class="getColorAmount(operation?.kind)"
    >
      <p>{{ operation?.amount }} ₽</p>
    </div>
  </div>
  <q-dialog v-model="openConfirm" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <span class="q-ml-sm"
          >Are you sure you want to delete this operation?</span
        >
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          flat
          label="Cancel"
          color="primary"
          @click="openConfirm = false"
        />
        <q-btn flat label="Delete" color="negative" @click="deleteOperation" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { useOperation } from 'composables';
import { UserOperation } from 'models';
import { type PropType } from 'vue';
import { date } from 'quasar';
import { useOperationStore } from 'src/stores/operation';

const { deleteUserOperation } = useOperation();
const operationStore = useOperationStore();
const $q = useQuasar();

const props = defineProps({
  operation: Object as PropType<UserOperation>,
});

const openConfirm = ref(false);

const getColorAmount = (kind: number | undefined) => {
  if (kind === 1) return 'text-positive';
  else return 'text-negative';
};

const deleteOperation = async () => {
  if (!props.operation?.id) return;
  await deleteUserOperation(props.operation?.id).then(() => {
    operationStore.getUserOverview();
    openConfirm.value = false;
    $q.notify({
      message: 'Operation deleted',
      color: 'positive',
      position: 'top-right',
      icon: 'check_circle_outline',
    });
  });
};
</script>
