<script setup>
import {
  ref,
  reactive,
  defineProps,
  defineEmits,
  onMounted,
  onUnmounted,
  computed,
  watch,
} from 'vue-demi'
import { debounce } from 'lodash-es'
import { createWriteProps } from './helper'

const props = defineProps({
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
      bottom: 24,
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
})

const emit = defineEmits(['unadsorb', 'adsorb'])

const writeOffset = createWriteProps('offset')

const floatBubbleRef = ref(null)
const draggable = ref(false)
const transition = ref(false)
const floatRect = reactive({ width: 0, height: 0 })
const parentRect = reactive({ width: 0, height: 0 })
const parentEl = ref(null)

const emitAdsorb = debounce((...params) => {
  if (params[0].type === 'none') {
    emit('unadsorb', ...params)
    return
  }
  emit('adsorb', ...params)
}, 500)

const setPosition = () => {
  if (
    typeof props.position.bottom === 'number'
    && typeof props.position.right === 'number'
  ) {
    setOffset({
      x: parentRect.width - halfRect.value.width - props.position.right,
      y: parentRect.height - halfRect.value.height - props.position.bottom,
    })
  } else if (
    typeof props.position.bottom === 'number'
    && typeof props.position.left === 'number'
  ) {
    setOffset({
      x: halfRect.value.width + props.position.left,
      y: parentRect.height - halfRect.value.height - props.position.bottom,
    })
  } else if (
    props.position.bottom === 'center'
    && typeof props.position.right == 'number'
  ) {
    setOffset({
      x: parentRect.width - halfRect.value.width - props.position.right,
      y: parentRect.height / 2 - halfRect.value.height,
    })
  } else if (
    props.position.bottom === 'center'
    && typeof props.position.left == 'number'
  ) {
    setOffset({
      x: halfRect.value.width + props.position.left,
      y: parentRect.height / 2 - halfRect.value.height,
    })
  }
}

const setOffset = (value) => {
  value = safeRule({
    offsetX: value.x,
    offsetY: value.y,
  })

  writeOffset.x = value.x
  writeOffset.y = value.y
}

const adsorbUpdate = () => {
  writeOffset.x = writeOffset.x
  writeOffset.y = writeOffset.y
}

const adsorbRule = ({ offsetX, offsetY }) => {
  const value = {
    offset: { ...writeOffset },
  }
  if (offsetX >= parentRect.width - floatRect.width) {
    value.type = 'right'
  } else if (offsetX <= 0) {
    value.type = 'left'
  } else {
    value.type = 'none'
  }
  return value
}

const magnetRule = ({ offsetX, offsetY }) => {
  const value = {
    offsetX,
    offsetY,
    adsorb: false,
  }

  const floatCenterX = offsetX + floatRect.width / 2
  const floatCenterY = offsetY + floatRect.height / 2

  const parentCenterX = parentRect.width / 2
  const parentCenterY = parentRect.height / 2

  if (
    Math.abs(floatCenterX - parentCenterX) <= props.gap
    && Math.abs(floatCenterY - parentCenterY) <= props.gap
  ) {
    value.offsetX = parentCenterX - floatRect.width / 2
    value.offsetY = parentCenterY - floatRect.height / 2
    value.adsorb = true
  }

  return value
}

const safeRule = (value) => {
  const safeX = Math.max(
    0,
    Math.min(parentRect.width - floatRect.width, value.offsetX),
  )
  const safeY = Math.max(
    0,
    Math.min(parentRect.height - floatRect.height, value.offsetY),
  )

  return {
    x: safeX,
    y: safeY,
  }
}

const halfRect = computed(() => ({
  width: floatRect.width / 2,
  height: floatRect.height / 2,
}))

const offsetStyle = computed(() => ({
  transform: `translate(${writeOffset.x}px, ${writeOffset.y}px)`,
}))

const sizeStyle = computed(() => ({
  width: props.size,
  height: props.size,
}))

const transitionStyle = computed(() => ({
  transition: transition.value ? 'transform .3s' : '',
}))

const onMousedown = (event) => {
  event.stopPropagation()
  draggable.value = true
  transition.value = false
}

const onMouseup = (event) => {
  event.stopPropagation()
  draggable.value = false
  transition.value = true
  if (props.magnet) {
    const adsorbValue = adsorbRule({
      offsetX: writeOffset.x,
      offsetY: writeOffset.y,
    })
    if (adsorbValue.type !== 'none') {
      setOffset({
        x: adsorbValue.offset.x,
        y: adsorbValue.offset.y,
      })
      emitAdsorb(adsorbValue)
      return
    }
    const magnetValue = magnetRule({
      offsetX: writeOffset.x,
      offsetY: writeOffset.y,
    })
    setOffset({
      x: magnetValue.offsetX,
      y: magnetValue.offsetY,
    })
    if (magnetValue.adsorb) {
      emitAdsorb({
        type: 'magnet',
        offset: { ...writeOffset },
      })
    } else {
      emitAdsorb({
        type: 'none',
        offset: { ...writeOffset },
      })
    }
  }
}

onMounted(() => {
  floatRect.width = floatBubbleRef.value.offsetWidth
  floatRect.height = floatBubbleRef.value.offsetHeight

  parentEl.value = document.querySelector(props.parent)
  parentRect.width = parentEl.value.offsetWidth
  parentRect.height = parentEl.value.offsetHeight

  setPosition()

  watch(
    () => parentRect,
    () => {
      setPosition()
    },
  )

  window.addEventListener('resize', adsorbUpdate)
})

onUnmounted(() => {
  window.removeEventListener('resize', adsorbUpdate)
})
</script>

<template>
  <div
    ref="floatBubble"
    class="float-bubble"
    :style="[offsetStyle, transitionStyle]"
    @mousedown.prevent="onMousedown"
    @mouseup.prevent="onMouseup"
  >
    <slot>
      <div
        class="float-bubble-default"
        :style="[sizeStyle]"
        :class="[bubbleClass]"
      >
        <span v-if="text">{{ text }}</span>
        <img
          v-else-if="image"
          :src="image"
          alt=""
          class="w-2/3"
        />
        <span
          v-else
          class="text-center"
        >
          {{ writeOffset.x }} <br />
          {{ writeOffset.y }}
        </span>
      </div>
    </slot>
  </div>
</template>

<style lang="postcss">
.float-bubble {
  @apply cursor-pointer absolute z-2999;
  .float-bubble-default {
    @apply rounded-full shadow-lg flex items-center justify-center border bg-white text-xs hover:bg-gray-100 !active:bg-gray-200 p-1;
  }
}
</style>
