<template>
  <div class="category-user__line row items-center q-mb-sm">
    <div class="col-9 flex items-center">
      <q-icon
        :name="props.categoryUser?.icon"
        :style="{ color: props.categoryUser?.color }"
        size="32px"
      />
      <p class="q-ml-md">
        {{ props.categoryUser?.name }}
      </p>
    </div>
    <div class="col-3 flex">
      <AppInlineButton icon="delete_outline" @click="openDialogDelete = true" />
      <AppInlineButton icon="edit" />
    </div>
  </div>
  <DialogCategoryUserDelete
    :category-user="props.categoryUser"
    :is-open-dialog="openDialogDelete"
    @close-delete-dialog="openDialogDelete = false"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { CategoryUser } from 'models';
import { type PropType } from 'vue';
import { date } from 'quasar';
import AppInlineButton from 'components/AppInlineButton.vue';
import DialogCategoryUserDelete from 'components/CategoryUser/DialogCategoryUserDelete.vue';

const props = defineProps({
  categoryUser: Object as PropType<CategoryUser>,
});

const openDialogDelete = ref(false);
const openDialogUpdate = ref(false);
</script>
