<template>
  <q-page class="index-page container">
    <div class="row">
      <div class="col-4">
        {{ userOverview }}
      </div>
    </div>
  </q-page>
  <AppPreloader :showing="isLoading" />
</template>

<script setup lang="ts">
import AppPreloader from 'components/AppPreloader.vue';
import { useOperation } from 'composables';
import { ref, onMounted } from 'vue';
import { UserOverview } from 'models';

const { getUserOverview } = useOperation();

const isLoading = ref<boolean>(false);
const userOverview = ref<UserOverview[]>();

onMounted(async () => {
  isLoading.value = true;
  userOverview.value = await getUserOverview();
  isLoading.value = false;
});
</script>
