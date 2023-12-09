<template>
  <q-dialog v-model="showDialog" persistent>
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
          @click="emit('close-dialog')"
        />
        <q-btn flat label="Delete" color="negative" @click="deleteOperation" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useOperation } from 'composables';
import { UserOperation } from 'models';
import { type PropType } from 'vue';

const { deleteUserOperation } = useOperation();

const props = defineProps({
  isOpenDialog: Boolean,
  operation: Object as PropType<UserOperation>,
});

const emit = defineEmits<{
  (e: 'close-dialog'): void;
  (e: 'update'): void;
}>();

const showDialog = computed(() => props.isOpenDialog);

const deleteOperation = async () => {
  if (!props.operation?.id) return;
  await deleteUserOperation(props.operation?.id).then(() => {
    emit('close-dialog');
    emit('update');
  });
};
</script>
