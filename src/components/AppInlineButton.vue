<template>
  <div class="inline-button flex flex-center">
    <q-icon :name="props.icon" size="20px" />
    <q-tooltip v-if="props.tooltipText"> {{ props.tooltipText }} </q-tooltip>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  icon: String,
  tooltipText: String,
});
</script>
