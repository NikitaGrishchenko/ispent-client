<template>
  <div class="category-user__line row items-center q-mb-sm">
    <div class="col-1">
      <q-icon
        :name="props.categoryUser?.icon"
        :style="{ color: props.categoryUser?.color }"
        size="32px"
      />
    </div>
    <div class="col-8 flex items-center">
      <p class="q-ml-md">
        {{ props.categoryUser?.name }}
      </p>
    </div>
    <div class="col-3 flex">
      <AppInlineButton icon="delete_outline" @click="openDialogDelete = true" />
      <AppInlineButton icon="edit" @click="openDialogUpdate = true" />
    </div>
  </div>
  <DialogCategoryUserDelete
    :category-user="props.categoryUser"
    :is-open-dialog="openDialogDelete"
    @close-dialog="openDialogDelete = false"
  />
  <DialogCategoryUserUpdate
    :category-user="props.categoryUser"
    :is-open-dialog="openDialogUpdate"
    @close-dialog="openDialogUpdate = false"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { CategoryUser } from 'models';
import { type PropType } from 'vue';
import AppInlineButton from 'components/AppInlineButton.vue';
import DialogCategoryUserDelete from 'components/CategoryUser/DialogCategoryUserDelete.vue';
import DialogCategoryUserUpdate from 'components/CategoryUser/DialogCategoryUserUpdate.vue';

const props = defineProps({
  categoryUser: Object as PropType<CategoryUser>,
});

const openDialogDelete = ref(false);
const openDialogUpdate = ref(false);
</script>
