<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Button from './components/button/Button.vue';
import type { ButtonInstance } from './components/button/types';

const buttonRef = ref<ButtonInstance | null>(null);

onMounted(() => {
  console.log(buttonRef.value!.ref);
});
</script>

<template>
  <div>
    <Button ref="buttonRef" type="primary" round plain disabled>点击</Button>
    <Button ref="buttonRef" type="danger" plain>点击</Button>
    <Button ref="buttonRef" type="success" size="small" plain>点击</Button>
    <Button type="danger" size="large">加载</Button>
    <Button type="primary" size="large" round>加载</Button>
    <Button type="primary" size="large" circle>加载</Button>
  </div>
</template>

<style scoped></style>
