import { type Ref, onMounted, onBeforeUnmount } from 'vue';

export const useClickOutside = (
  element: Ref<HTMLElement | undefined>,
  callback: (el?: HTMLElement) => {}
) => {
  const handleClickOutside = (event: MouseEvent) => {
    if (element.value && event.target && !element.value?.contains(event.target as HTMLElement)) {
      callback && callback(element.value);
    }
  };

  onMounted(() => {
    document.addEventListener('mousedown', handleClickOutside);
  });

  onBeforeUnmount(() => {
    document.removeEventListener('mousedown', handleClickOutside);
  });
};
