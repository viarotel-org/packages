# Float-Bubble

适用于 PC 端的 vue2/3 的浮动气泡组件 支持磁吸、自定义样式、可实现贴边隐藏等功能

Floating bubble components suitable for VUE2/3 suitable for PC -end support magnetic suction, custom style, and enable hidden edges

## Install

```shell
npm install @viarotel-org/float-bubble
```

## Example

```js
// vue3
import FloatBubble from '@viarotel-org/float-bubble'

// vue2.7 以上
import FloatBubble from '@viarotel-org/float-bubble/vue2s'

// vue2.6 以下
import FloatBubble from '@viarotel-org/float-bubble/vue2'

// vue3
app.use(FloatBubble)

// vue2/2.7
Vue.use(FloatBubble)
```

```html
<!-- template 中使用 -->
<div class="float-bubble-container">
  <FloatBubble
    ref="floatBubble"
    parent=".float-bubble-container"
    :magnet="magneted"
    :position="{
      right: 24,
      bottom: 'center',
    }"
    @adsorb="onAdsorb"
    @unadsorb="onUnadsorb"
  />
</div>
```

## Theme

组件预设了默认的菜单主题通过以下的方法使用
注意: 如果通过 use 方式加载的组件那么 <FloatBubbleTheme/> 则已自动挂载 否则需要从包中手动安装该组件

```html
<FloatBubble
  ref="floatBubble"
  parent=".float-bubble-container"
  :magnet="magneted"
  :gap="0"
  :position="{
    top: 'center',
    right: 0,
  }"
>
  <template #default="handler">
    <FloatBubbleTheme v-bind="handler" :data="menuData" />
  </template>
</FloatBubble>
```

## props

```js
// FloatBubble 的默认 props
const defaultProps = {
  offset: {
    type: Object,
    default: () => ({
      x: 0,
      y: 0,
    }),
  },
  position: {
    type: Object,
    default: () => ({
      bottom: 24, // "center"
      right: 24,
    }),
  },
  gap: {
    type: [Number, Object],
    default: 24,
  },
  parent: {
    type: String,
    default: 'body',
  },
  magnet: {
    type: Boolean,
    default: true,
  },
  text: {
    type: String,
    default: '',
  },
  image: {
    type: String,
    default: '',
  },
  size: {
    type: String,
    default: '50px',
  },
  bubbleClass: {
    type: [String, Object],
    default: '',
  },
}

// FloatBubbleTheme 默认的 Props
const themeProps = {
  adsorbed: {
    type: Boolean,
    default: false,
  },
  adsorbType: {
    type: String,
    default: '',
  },
  setAdsorbed: {
    type: Function,
    default: () => () => {},
  },
  updateAdsorb: {
    type: Function,
    default: () => () => {},
  },
  data: {
    type: Array,
    default: () => [],
    demo: [
      {
        hover: '帮助中心',
        text: '帮助',
        icon: 'iconfont icon-help',
        class: 'text-[16px]',
        click: () => {},
      },
      {
        hover: '反馈问题',
        text: '反馈',
        icon: 'iconfont icon-fankui',
        class: 'text-[16px]',
        click: () => {},
      },
    ],
  },
}
```
