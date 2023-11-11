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
