<template>
  <div class="operation-list">
    <template v-for="operation in props.operations" :key="operation.id">
      <OperationItem :operation="operation" />
    </template>
  </div>
</template>

<script setup lang="ts">
import OperationItem from 'components/Operation/OperationItem.vue';
import { UserOperation } from 'models';
import type { PropType } from 'vue';

const props = defineProps({
  operations: Object as PropType<UserOperation[]>,
});
</script>
