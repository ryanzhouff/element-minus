<script setup lang="ts">
import { computed, toRef } from 'vue';
import type { IconProps } from './types';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { omit } from 'lodash-es';

defineOptions({
  name: 'VIcon',
  inheritAttrs: false // 防止属性透传到根节点上
});

const props = defineProps<IconProps>();
// 只保留fontawesome的属性
// 防止omit操作之后的对象失去响应性，需要转换成响应式对象
const filteredProps = toRef(() => omit(props, ['type', 'color']));
const iconStyle = computed(() => (props.color ? { color: props.color } : {}));
</script>

<template>
  <i class="v-icon" :class="{ [`v-icon--${type}`]: type }" :style="iconStyle">
    <font-awesome-icon v-bind="filteredProps" />
  </i>
</template>
