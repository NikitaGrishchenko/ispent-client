<template>
  <q-dialog @show="filterCategoryUser(kind)" v-model="showDialog" persistent>
    <q-card class="card-dialog">
      <q-card-section>
        <div class="text-h6">New operation</div>
      </q-card-section>
      <q-form ref="form" @submit="onSubmit">
        <q-card-section class="q-pt-none">
          <q-btn-toggle
            v-model="kind"
            spread
            class="q-mb-md no-box-shadow form__toggle"
            @update:model-value="selectedCategory = undefined"
            toggle-color="primary"
            :options="OPERATION_KIND"
          />
          <q-input
            filled
            v-model="amount"
            lazy-rules
            label="Amount"
            :rules="[(val) => (val && val >= 0) || 'Please type something']"
          />
          <q-select
            v-model="selectedCategory"
            :options="filteringCategoryUser"
            :disable="!kind"
            option-label="name"
            lazy-rules
            label="Category"
            filled
            :rules="[(val) => val || 'Please select a category']"
            input-debounce="0"
          />
          <q-input
            filled
            v-model="date"
            mask="##.##.####"
            :rules="[(val) => val.length > 8 || 'Please select a date']"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date
                    :options="optionsDateCalendar"
                    today-btn
                    v-model="date"
                    first-day-of-week="1"
                    mask="DD.MM.YYYY"
                  >
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <q-input
            filled
            v-model="comment"
            label="Comment"
            class="q-field--with-bottom"
          />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn
            flat
            label="Cancel"
            v-close-popup
            @click="
              emit('close-dialog');
              clearInput();
            "
          />
          <q-btn unelevated color="primary" label="Add" type="submit" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useAuthStore } from 'src/stores/auth';
import { useData } from 'composables';
import { CategoryUser, UserOperation } from 'models';
import { useOperationStore } from 'src/stores/operation';
import { OPERATION_KIND } from 'enum';
import { DateTime } from 'luxon';

const authStore = useAuthStore();
const operationStore = useOperationStore();
const { optionsDateCalendar, getTodayDateForCalendar } = useData();

const props = defineProps({
  isOpenDialog: Boolean,
});

const emit = defineEmits<{
  (e: 'close-dialog'): void;
  (e: 'update'): void;
}>();

const form = ref<HTMLFormElement>();

const filteringCategoryUser = ref<CategoryUser[]>();

const selectedCategory = ref<CategoryUser>();

const kind = ref<number>(2);
const amount = ref<number>();
const comment = ref<string>('');
const date = ref<string>(getTodayDateForCalendar());

const clearInput = () => {
  selectedCategory.value = undefined;
  amount.value = undefined;
  comment.value = '';
  kind.value = 2;
  date.value = getTodayDateForCalendar();
};

const onSubmit = async () => {
  form?.value?.validate().then(async (success: boolean) => {
    if (success) {
      const data: UserOperation = {
        userId: authStore.idUser as number,
        categoryUserId: selectedCategory.value?.id as number,
        amount: amount.value as number,
        kind: kind.value,
        date: `${DateTime.fromFormat(date.value, 'dd.LL.yyyy', {
          zone: 'utc',
        })}`,
        comment: comment.value,
      };

      await operationStore.createUserOperation(data).then(async () => {
        clearInput();
        form?.value?.resetValidation();
        emit('update');
      });
    }
  });
};

const showDialog = computed(() => props.isOpenDialog);

const filterCategoryUser = (kind: number) => {
  filteringCategoryUser.value = operationStore.categoryUser?.filter(
    (c) => c.kind === Number(kind)
  );
};

watch(kind, (newValue) => {
  filterCategoryUser(newValue);
});
</script>
