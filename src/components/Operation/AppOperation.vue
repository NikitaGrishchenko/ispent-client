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
        <p v-if="!hideDate" class="operation__date">
          {{ date.formatDate(operation?.date, 'D MMMM').toLowerCase() }}
        </p>
      </div>
    </div>
    <div class="col-3 flex">
      <AppInlineButton
        v-if="props.operation?.comment"
        icon="info"
        :tooltip-text="props.operation?.comment"
      />
      <AppInlineButton icon="delete_outline" @click="openDialogDelete = true" />
      <AppInlineButton icon="edit" @click="openDialogUpdate = true" />
    </div>
    <div class="col-2 operation__amount text-right">
      <p>
        <span
          v-html="getStyleAmountForOperation(operation?.amount!, operation?.kind!)"
        ></span>
      </p>
    </div>
  </div>
  <DialogOperationUpdate
    :operation="props.operation"
    :is-open-dialog="openDialogUpdate"
    @close-dialog="openDialogUpdate = false"
    @update="emit('update')"
  />
  <DialogOperationDelete
    :operation="props.operation"
    :is-open-dialog="openDialogDelete"
    @close-dialog="openDialogDelete = false"
    @update="emit('update')"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { UserOperation } from 'models';
import { type PropType } from 'vue';
import { date } from 'quasar';
import DialogOperationUpdate from 'components/Operation/DialogOperationUpdate.vue';
import DialogOperationDelete from 'components/Operation/DialogOperationDelete.vue';
import AppInlineButton from 'components/AppInlineButton.vue';
import { useOperation } from 'composables';

const emit = defineEmits<{
  (e: 'update'): void;
}>();

const props = defineProps({
  operation: Object as PropType<UserOperation>,
  hideDate: Boolean,
});

const { getStyleAmountForOperation } = useOperation();

const openDialogDelete = ref(false);
const openDialogUpdate = ref(false);
</script>
