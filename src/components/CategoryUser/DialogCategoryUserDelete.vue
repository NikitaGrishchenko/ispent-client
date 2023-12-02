<template>
  <q-dialog v-model="showDialog" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <span class="q-ml-sm"
          >Are you sure you want to delete this category user?</span
        >
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          flat
          label="Cancel"
          color="primary"
          @click="emit('close-delete-dialog')"
        />
        <q-btn flat label="Delete" color="negative" @click="confirmDelete()" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { CategoryUser } from 'models';
import { useOperationStore } from 'src/stores/operation';
import { type PropType } from 'vue';

const operationStore = useOperationStore();

const props = defineProps({
  isOpenDialog: Boolean,
  categoryUser: Object as PropType<CategoryUser>,
});

const emit = defineEmits<{
  (e: 'close-delete-dialog'): void;
}>();

const showDialog = computed(() => props.isOpenDialog);

const confirmDelete = async () => {
  if (!props.categoryUser?.id) return;
  await operationStore.deleteCategoryUser(props.categoryUser?.id).then(() => {
    emit('close-delete-dialog');
  });
};
</script>
