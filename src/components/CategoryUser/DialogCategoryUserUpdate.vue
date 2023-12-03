<template>
  <q-dialog v-model="showDialog" persistent>
    <q-card>
      <q-card-section>
        <div class="text-h6">Update category</div>
      </q-card-section>
      <q-form ref="form" @submit="onSubmit">
        <q-card-section class="q-pt-none">
          <div class="row">
            <div class="col-12">
              <q-input
                filled
                v-model="updateCategoryUser.name"
                lazy-rules
                label="Name"
                :rules="[
                  (val) => (val && val.length >= 3) || 'Please type something',
                ]"
              />
            </div>
            <div class="col-12">
              <div class="row q-gutter-sm">
                <q-select
                  class="col"
                  v-model="updateCategoryUser.kind"
                  :options="OPERATION_KIND"
                  emit-value
                  map-options
                  lazy-rules
                  label="Kind"
                  filled
                />
                <div
                  @click="openDialogChoiceIconCategory = true"
                  class="col category-user__icon flex flex-center"
                >
                  <div class="category-user__icon-text">Icon</div>
                  <q-icon
                    :name="updateCategoryUser.icon"
                    size="32px"
                    :style="{
                      color: updateCategoryUser.color,
                    }"
                  ></q-icon>
                </div>
                <q-input
                  class="col"
                  filled
                  label="Color"
                  v-model="updateCategoryUser.color"
                  :rules="['anyColor']"
                >
                  <template v-slot:append>
                    <q-icon name="colorize" class="cursor-pointer">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-color v-model="updateCategoryUser.color" />
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
            </div>
          </div>
        </q-card-section>
        <q-card-actions align="right" class="text-primary">
          <q-btn
            flat
            label="Cancel"
            v-close-popup
            @click="
              emit('close-dialog');
              setDefaultValues();
            "
          />
          <q-btn unelevated color="primary" label="Update" type="submit" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
  <div>
    <DialogChoiceIconCategory
      :is-open-dialog="openDialogChoiceIconCategory"
      :current-icon="props.categoryUser?.icon"
      @close-dialog="openDialogChoiceIconCategory = false"
      @pick-icon="(name: string) => (updateCategoryUser.icon = name)"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { CategoryUser, CategoryUserUpdate } from 'models';
import { useOperationStore } from 'src/stores/operation';
import { type PropType } from 'vue';
import { OPERATION_KIND } from 'enum';
import DialogChoiceIconCategory from 'components/DialogChoiceIconCategory.vue';

const operationStore = useOperationStore();
const form = ref<HTMLFormElement>();

const props = defineProps({
  isOpenDialog: Boolean,
  categoryUser: Object as PropType<CategoryUser>,
});

const showDialog = computed(() => props.isOpenDialog);
const openDialogChoiceIconCategory = ref(false);

const emit = defineEmits<{
  (e: 'close-dialog'): void;
}>();

const updateCategoryUser = ref<CategoryUserUpdate>({
  id: undefined,
  name: undefined,
  kind: undefined,
  color: undefined,
  icon: undefined,
  userId: undefined,
});

const setDefaultValues = () => {
  if (props.categoryUser) {
    updateCategoryUser.value.id = props.categoryUser?.id;
    updateCategoryUser.value.name = props.categoryUser?.name;
    updateCategoryUser.value.kind = props.categoryUser?.kind;
    updateCategoryUser.value.color = props.categoryUser?.color;
    updateCategoryUser.value.icon = props.categoryUser?.icon;
    updateCategoryUser.value.userId = props.categoryUser?.userId;
  }
};

const onSubmit = async () => {
  form?.value?.validate().then(async (success: boolean) => {
    if (success) {
      await operationStore
        .updateCategoryUser(updateCategoryUser.value)
        .then(async () => {
          emit('close-dialog');
        });
    }
  });
};

onMounted(async () => {
  setDefaultValues();
});
</script>
