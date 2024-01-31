<template>
  <div flat class="card">
    <p class="card__title"><slot></slot></p>
    <q-skeleton v-if="props.isLoading" type="rect" height="60px" />
    <div v-else class="overview__card-total">
      {{ formatter.format(digit!) }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatter } from 'boot/formatter';

const props = defineProps({
  digit: Number,
  isLoading: Boolean,
});
</script>
