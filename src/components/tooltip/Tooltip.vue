<script setup lang="ts">
import { reactive, ref, watch, onBeforeUnmount, computed } from 'vue';
import { createPopper } from '@popperjs/core';
import { debounce } from 'lodash-es';
import type { Instance } from '@popperjs/core';
import type { TooltipProps, TooltipEvents, TooltipInstance } from './types';
import { useClickOutside } from '@/hooks/core';

defineOptions({
  name: 'VTooltip'
});

const props = withDefaults(defineProps<TooltipProps>(), {
  placement: 'bottom',
  transition: 'fade',
  openDelay: 0,
  closeDelay: 0
});
const emits = defineEmits<TooltipEvents>();
const popoverNode = ref<HTMLElement | null>(null);
const triggerNode = ref<HTMLElement | null>(null);
const popoverContainerNode = ref<HTMLElement | null>(null);
const isVisible = ref(false);
let popoverInstance: Instance | null = null;
let events = reactive<Record<string, () => void>>({});
// 在根元素触发mouseleave事件，防止鼠标移动无法移动到popover上
let outerEvents = reactive<Record<string, () => void>>({});
const popoverOptions = computed(() => ({
  placement: props.placement,
  modifiers: [
    {
      name: 'offset',
      options: {
        offset: [0, 9]
      }
    }
  ],
  ...props.popoverOptions
}));

// 在触发事件是click，且点击了其他区域之后，隐藏popover内容
useClickOutside(popoverContainerNode, () => {
  if (props.trigger === 'click' && isVisible.value && !props.manual) {
    close();
  }
});

const turnOn = () => {
  isVisible.value = true;
  emits('visible-change', true);
};

const turnOff = () => {
  isVisible.value = false;
  emits('visible-change', false);
};

const debouncedTurnOn: any = debounce(turnOn, props.openDelay);
const debouncedTurnOff: any = debounce(turnOff, props.closeDelay);
// 移入时取消触发消失事件
const open = () => {
  debouncedTurnOff.cancel();
  debouncedTurnOn();
};

const close = () => {
  debouncedTurnOn.cancel();
  debouncedTurnOff();
};

const togglePopover = () => {
  if (isVisible.value) {
    close();
  } else {
    open();
  }
};

const attachEvent = () => {
  if (props.trigger === 'hover') {
    events['mouseenter'] = open;
    outerEvents['mouseleave'] = close;
  } else if (props.trigger === 'click') {
    events['click'] = togglePopover;
  }
};

if (!props.manual) {
  attachEvent();
}

watch(
  () => props.manual,
  (hasManual) => {
    // 手动模式下就不需要触发事件了
    if (hasManual) {
      events = {};
      outerEvents = {};
    } else {
      attachEvent();
    }
  }
);

// 在trigger改变后，重新绑定事件
watch(
  () => props.trigger,
  (newTrigger, oldTrigger) => {
    if (newTrigger !== oldTrigger) {
      events = {};
      outerEvents = {};
      attachEvent();
    }
  }
);

watch(
  isVisible,
  (newValue) => {
    if (newValue) {
      if (popoverNode.value && triggerNode.value) {
        popoverInstance = createPopper(triggerNode.value, popoverNode.value, popoverOptions.value);
      } else {
        popoverInstance?.destroy();
      }
    }
  },
  // 需要在更新后访问DOM元素
  { flush: 'post' }
);

onBeforeUnmount(() => {
  popoverInstance?.destroy();
});

defineExpose<TooltipInstance>({
  hide: close,
  show: open
});
</script>

<template>
  <div class="v-tooltip" v-on="outerEvents" ref="popoverContainerNode">
    <!--触发区-->
    <div class="v-tooltip__trigger" ref="triggerNode" v-on="events"><slot /></div>
    <!--展示区-->
    <Transition :name="transition">
      <div class="v-tooltip__popover" ref="popoverNode" v-if="isVisible">
        <slot name="content">
          {{ content }}
        </slot>
        <div id="arrow" data-popper-arrow></div>
      </div>
    </Transition>
  </div>
</template>

<style scoped></style>
