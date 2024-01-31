<template>
  <div v-for="banner in props.banners" :key="banner.id">
    <q-banner :class="getBannerColor(banner.color)">
      <template v-slot:avatar>
        <q-icon :name="banner.icon" color="white" />
      </template>
      {{ banner.text }}
    </q-banner>
  </div>
</template>

<script setup lang="ts">
import { Banner } from 'models';
import type { PropType } from 'vue';

const props = defineProps({
  banners: Object as PropType<Banner[]>,
});

const getBannerColor = (color: string) => {
  return `rounded-borders bg-${color}`;
};
</script>
