<template>
  <q-dialog v-model="showDialog" persistent>
    <q-card class="card-dialog">
      <q-card-section>
        <div class="text-h6">Update operation</div>
      </q-card-section>
      <q-form ref="form" @submit="onSubmit">
        <q-card-section class="q-pt-none">
          <q-btn-toggle
            v-model="kind"
            spread
            class="q-mb-md no-box-shadow form__toggle"
            @update:model-value="categoryUser = undefined"
            toggle-color="primary"
            :options="OPERATION_KIND"
          />
          <q-input
            filled
            v-model="amount"
            label="Amount"
            type="number"
            step=".01"
            lazy-rules
            :rules="[(val) => (val && val >= 0) || 'Please type something']"
          />
          <CategoryUserPick
            v-model="categoryUser"
            :kind="kind"
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
            autogrow
            class="q-field--with-bottom"
          />
        </q-card-section>

        <q-card-actions class="text-primary flex justify-between items-center">
          <q-btn
            unelevated
            icon="delete_outline"
            color="negative"
            @click="emit('open-delete-dialog')"
          />
          <div class="q-gutter-sm">
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
          </div>
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useData } from 'composables';
import { UserOperation } from 'models';
import { type PropType } from 'vue';
import { useAuthStore } from 'src/stores/auth';
import { useOperationStore } from 'src/stores/operation';
import { OPERATION_KIND } from 'enum';
import { DateTime } from 'luxon';
import CategoryUserPick from 'components/CategoryUser/CategoryUserPick.vue';

const authStore = useAuthStore();
const { optionsDateCalendar, fromISOToCalendarFormat } = useData();
const operationStore = useOperationStore();

const props = defineProps({
  isOpenDialog: Boolean,
  operation: Object as PropType<UserOperation>,
});

const form = ref<HTMLFormElement>();

const emit = defineEmits<{
  (e: 'close-dialog'): void;
  (e: 'update'): void;
  (e: 'open-delete-dialog'): void;
}>();

const categoryUser = ref<number>();
const kind = ref<number>();
const amount = ref<number>();
const comment = ref<string>('');
const date = ref<string>();

const showDialog = computed(() => props.isOpenDialog);

const setDefaultValues = () => {
  if (props.operation) {
    categoryUser.value = props.operation?.categoryUser?.id;
    kind.value = props.operation?.kind;
    amount.value = props.operation?.amount;
    comment.value = props.operation?.comment;
    date.value = fromISOToCalendarFormat(props.operation?.date);
  }
};

const onSubmit = async () => {
  form?.value?.validate().then(async (success: boolean) => {
    if (success) {
      const data: UserOperation = {
        id: props.operation?.id,
        userId: authStore.idUser as number,
        categoryUserId: categoryUser.value!,
        amount: amount.value as number,
        kind: Number(kind.value),
        comment: comment.value,
        date: `${DateTime.fromFormat(date.value!, 'dd.LL.yyyy', {
          zone: 'utc',
        })}`,
      };
      await operationStore.updateUserOperation(data).then(async () => {
        emit('close-dialog');
        emit('update');
      });
    }
  });
};


onMounted(async () => {
  setDefaultValues();
});
</script>
