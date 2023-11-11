<script setup lang="ts">
import Button from '@/components/button/Button.vue';
import Tooltip from '@/components/tooltip/Tooltip.vue';
import { ref } from 'vue';
import type { TooltipInstance } from '@/components/tooltip/types';

const tooltipRef = ref<TooltipInstance | null>(null);
const open = () => {
  tooltipRef.value?.show();
};

const close = () => {
  tooltipRef.value?.hide();
};
</script>

<template>
  <div style="width: 80px">
    <Button type="danger" @click="open">Open</Button>
    <Button type="success" @click="close">Close</Button>
    <Tooltip trigger="click" ref="tooltipRef" placement="right">
      <Button type="primary">Trigger</Button>
      <template #content>
        <span>Hello world2</span>
      </template>
    </Tooltip>
  </div>
</template>

<style scoped></style>
