<template>
  <div class="category-user row items-center q-mb-sm">
    <div class="col-9 flex items-center">
      <q-icon
        :name="categoryUser?.icon"
        :style="{ color: categoryUser?.color }"
        size="32px"
      />
      <p>
        {{ categoryUser?.name }}
      </p>
    </div>
    <div class="col-3">
      <!-- <div
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
      </div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { UserCategory } from 'models';
import { type PropType } from 'vue';
import { date } from 'quasar';
import AppOperation from 'components/AppOperation.vue';

const props = defineProps({
  categoryUser: Object as PropType<UserCategory>,
});
</script>
