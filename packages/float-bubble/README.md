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
import FloatBubble from "@viarotel-org/float-bubble"

// vue2.7 以上
import FloatBubble from "@viarotel-org/float-bubble/vue2s"

// vue2.6 以下
import FloatBubble from "@viarotel-org/float-bubble/vue2"

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

## props

```js
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
    default: "body",
  },
  magnet: {
    type: Boolean,
    default: true,
  },
  text: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    default: "",
  },
  size: {
    type: String,
    default: "50px",
  },
  bubbleClass: {
    type: [String, Object],
    default: "",
  },
}
```
