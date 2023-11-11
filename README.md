# element-minus

### Button
组件名在script-setup语法中无法添加，有两种解决方法：
第一、单独再创建一个script
```vue
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'VButton'
});
</script>
```
第二、使用`defineOptions`
```ts
defineOptions({
  name: 'VButton'
});
```

#### 色彩系统
参考antd色彩系统和中国传统色彩

基础色板
中性色板
功能色 成功、失败等

## 测试
测试库@vue/test-utils 2 for vue3

## Icon
Icon使用FontAwesomeFont

## Tooltip
开发计划：
- 最基本功能
- 支持click/hover两种触发方式
- 支持click outside的时候隐藏
- 支持手动触发
- 支持popper参数
- 支持动画
- 支持延迟显示
- UI


最根本功能
- 触发区
- 展示区
```vue
<!-- 简单content -->
<Tooltip content="Hello">
 <Button>Trigger</Button>
</Tooltip>

<!-- 复杂content -->
<Tooltip>
<!--触发区-->
  <Button>Trigger</Button>
  <!--展示区-->
  <template #content>
    <h1>Hello</h1>
  </template>
</Tooltip>
```

触发方式：
- hover
- click
- 手动

```ts
interface TooltipProps {
    content?: string; // 触发内容
    trigger: 'hover' | 'click'; // 触发方式
    manual?: boolean; // 手动
}
```
动态绑定事件
v-on可以接收一个对象作为参数，对象中每一项都可以作为对应的事件回调
