<template>
  <q-page class="container">
    <OverviewUser />
  </q-page>
</template>

<script setup lang="ts">
import OverviewUser from 'components/OverviewUser.vue';
import { useOperation } from 'composables';
import { ref, onMounted } from 'vue';
import { UserOverview } from 'models';

const { getUserOverview } = useOperation();

const isLoading = ref<boolean>(false);
const userOverview = ref<UserOverview>();

onMounted(async () => {
  isLoading.value = true;
  userOverview.value = await getUserOverview();
  isLoading.value = false;
});
</script>
