<template>
  <q-dialog v-model="showDialog" persistent>
    <q-card style="min-width: 450px">
      <q-card-section class="row items-center">
        <span class="q-ml-sm card__title">Icons</span>
      </q-card-section>
      <q-card-actions>
        <div
          v-for="icon in AVAILABLE_ICONS_FOR_CATEGORY"
          :key="icon.id"
          class="col-2 text-center q-my-sm"
        >
          <q-icon
            @click="selectedIcon = icon.name"
            :name="icon.name"
            size="32px"
            :class="{ 'text-negative': selectedIcon === icon.name }"
          ></q-icon>
        </div>
      </q-card-actions>

      <q-card-actions align="right">
        <q-btn
          flat
          label="Cancel"
          color="negative"
          @click="
            emit('close-dialog');
            selectedIcon = props.currentIcon!;
          "
        />
        <q-btn
          :disable="selectedIcon === ''"
          unelevated
          label="Pick"
          color="primary"
          @click="
            emit('close-dialog');
            emit('pick-icon', selectedIcon);
          "
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { AVAILABLE_ICONS_FOR_CATEGORY } from 'enum';

const props = defineProps({
  isOpenDialog: Boolean,
  currentIcon: String,
});

const selectedIcon = ref<string>(props.currentIcon!);

const emit = defineEmits<{
  (e: 'close-dialog'): void;
  (e: 'pick-icon', name: string): void;
}>();

const showDialog = computed(() => props.isOpenDialog);
</script>
