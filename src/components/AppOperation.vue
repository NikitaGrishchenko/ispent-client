<template>
  <div class="operation row items-center q-mb-sm">
    <div class="col-7 flex items-center">
      <div class="operation__category-icon q-mr-md">
        <q-icon
          :name="operation?.categoryUser?.icon"
          :style="{ color: operation?.categoryUser?.color }"
          size="32px"
        />
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
    <div class="col-3 flex">
      <div
        v-if="props.operation?.comment"
        class="operation__button flex flex-center"
      >
        <q-icon name="info" size="20px" />
        <q-tooltip> {{ props.operation?.comment }} </q-tooltip>
      </div>
      <div
        @click="openDialogDelete = true"
        class="operation__button flex flex-center"
      >
        <q-icon name="delete_outline" size="20px" />
      </div>
      <div
        @click="openDialogUpdate = true"
        class="operation__button flex flex-center"
      >
        <q-icon name="edit" size="20px" />
      </div>
    </div>
    <div
      class="col-2 operation__amount text-right"
      :class="getColorAmount(operation?.kind)"
    >
      <p>{{ operation?.amount }} ₽</p>
    </div>
  </div>
  <DialogOperationUpdate
    :operation="props.operation"
    :is-open-dialog="openDialogUpdate"
    @close-update-dialog="openDialogUpdate = false"
  />
  <DialogOperationDelete
    :operation="props.operation"
    :is-open-dialog="openDialogDelete"
    @close-delete-dialog="openDialogDelete = false"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { UserOperation } from 'models';
import { type PropType } from 'vue';
import { date } from 'quasar';
import DialogOperationUpdate from 'components/DialogOperationUpdate.vue';
import DialogOperationDelete from 'components/DialogOperationDelete.vue';

const props = defineProps({
  operation: Object as PropType<UserOperation>,
});

const openDialogDelete = ref(false);
const openDialogUpdate = ref(false);

const getColorAmount = (kind: number | undefined) => {
  if (kind === 1) return 'text-positive';
  else return 'text-negative';
};
</script>
