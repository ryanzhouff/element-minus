import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import Button from './Button.vue';

describe('Button.vue', () => {
  test('basic button', () => {
    const wrapper = mount(Button, {
      props: {
        type: 'primary'
      },
      slots: {
        default: 'button'
      }
    });
    expect(wrapper.classes()).toContain('v-button--primary');
    expect(wrapper.get('button').text()).toBe('button');
    // event
    wrapper.get('button').trigger('click');
    expect(wrapper.emitted()).toHaveProperty('click');
  });
  test('disabled button', () => {
    const wrapper = mount(Button, {
      props: {
        disabled: true
      },
      slots: {
        default: 'disabled'
      }
    });
    expect(wrapper.attributes('disabled')).toBeDefined();
    // 获取原生DOM上的属性
    expect(wrapper.find('button').element.disabled).toBe(true);
    // disabled状态没有click事件
    expect(wrapper.emitted()).not.toHaveProperty('click');
  });
});
