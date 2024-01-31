<template>
  <div class="operation-list">
    <template v-for="operation in props.operations" :key="operation.id">
      <OperationItem :operation="operation" />
    </template>
    <div class="row" v-if="props.operations?.length == 0">
      <p class="col text-center q-pb-md">Nothing added</p>
    </div>
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
