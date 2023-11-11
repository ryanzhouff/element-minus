<script setup lang="ts">
import { ref } from 'vue';
import type { ButtonProps } from './types';

defineOptions({
  name: 'VButton'
});
withDefaults(defineProps<ButtonProps>(), {
  nativeType: 'button'
});
const _ref = ref<HTMLButtonElement>();
defineExpose({
  ref: _ref
});
</script>

<template>
  <button
    ref="_ref"
    class="v-button"
    :class="{
      [`v-button--${type}`]: type,
      [`v-button--${size}`]: size,
      'is-plain': plain,
      'is-round': round,
      'is-circle': circle,
      'is-disabled': disabled
    }"
    :disabled="disabled"
    :autofocus="autofocus"
    :type="nativeType"
  >
    <span>
      <slot />
    </span>
  </button>
</template>

<style lang="scss" scoped>
@import './styles.scss';
</style>
