<script setup>
import {
  computed,
  defineEmits,
  defineProps,
  onMounted,
  onUnmounted,
  ref,
  watch,
} from 'vue-demi'
import { debounce } from 'lodash-es'
import { createComposeWriteProps } from '@/utils/index.js'

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

const emit = defineEmits(['unadsorb', 'adsorb', 'update:offset'])

const writeOffset = createComposeWriteProps('offset', { props, emit })

const floatBubbleRef = ref(null)
const draggable = ref(false)
const transition = ref(false)
const floatRect = ref({ width: 0, height: 0 })
const parentRect = ref({
  width: 0,
  height: 0,
  left: 0,
  top: 0,
})
const parentEl = ref(null)

const halfRect = computed(() => ({
  width: floatRect.value.width / 2,
  height: floatRect.value.height / 2,
}))

const offsetStyle = computed(() => ({
  transform: `translate(${writeOffset.value.x}px, ${writeOffset.value.y}px)`,
}))

const sizeStyle = computed(() => ({
  width: props.size,
  height: props.size,
}))

const transitionStyle = computed(() => ({
  transition: transition.value ? 'transform .3s' : '',
}))

const gapX = computed(() => props.gap?.x || props.gap)

const gapY = computed(() => props.gap?.y || props.gap)

const emitAdsorb = debounce((...params) => {
  if (params[0].type === 'none') {
    emit('unadsorb', ...params)
    return
  }
  emit('adsorb', ...params)
}, 500)

function setPosition() {
  if (
    typeof props.position.bottom === 'number'
    && typeof props.position.right === 'number'
  ) {
    setOffset({
      x: parentRect.value.width - halfRect.value.width - props.position.right,
      y:
        parentRect.value.height - halfRect.value.height - props.position.bottom,
    })
  }
  else if (
    typeof props.position.bottom === 'number'
    && typeof props.position.left === 'number'
  ) {
    setOffset({
      x: halfRect.value.width + props.position.left,
      y:
        parentRect.value.height - halfRect.value.height - props.position.bottom,
    })
  }
  else if (
    props.position.bottom === 'center'
    && typeof props.position.right == 'number'
  ) {
    setOffset({
      x: parentRect.value.width - halfRect.value.width - props.position.right,
      y: parentRect.value.height / 2 - halfRect.value.height,
    })
  }
  else if (
    props.position.bottom === 'center'
    && typeof props.position.left == 'number'
  ) {
    setOffset({
      x: halfRect.value.width + props.position.left,
      y: parentRect.value.height / 2 - halfRect.value.height,
    })
  }
}

function setOffset(value) {
  value = safeRule({
    offsetX: value.x,
    offsetY: value.y,
  })

  writeOffset.value = { x: value.x, y: value.y }
}

function adsorbUpdate() {
  writeOffset.value = { ...writeOffset.value }
}

function adsorbRule({ offsetX }) {
  const value = {
    offset: { ...writeOffset.value },
  }
  if (offsetX >= parentRect.value.width - floatRect.value.width) {
    value.type = 'right'
  }
  else if (offsetX <= 0) {
    value.type = 'left'
  }
  else {
    value.type = 'none'
  }
  return value
}

function magnetRule({ offsetX }) {
  let magnetX = 0

  if (offsetX > parentRect.value.width / 2 - halfRect.value.width) {
    magnetX = parentRect.value.width - floatRect.value.width - gapX.value
  }
  else {
    magnetX = gapX.value
  }

  return {
    x: magnetX,
    y: writeOffset.value.y,
  }
}

function safeRule(value) {
  let safeY = 0
  let safeX = 0

  if (value.offsetY >= halfRect.value.height) {
    safeY = value.offsetY - halfRect.value.height
  }

  if (value.offsetX >= halfRect.value.width) {
    safeX = value.offsetX - halfRect.value.width
  }

  if (value.offsetY >= parentRect.value.height - halfRect.value.height) {
    safeY = parentRect.value.height - floatRect.height
  }

  if (value.offsetX >= parentRect.value.width - halfRect.value.width) {
    safeX = parentRect.value.width - floatRect.width
  }

  return {
    x: safeX,
    y: safeY,
  }
}

let mousedownTime = 0
function onMousedown(event) {
  // console.log('onMousedown.event', event)

  mousedownTime = new Date().getTime()
  draggable.value = true
  transition.value = false
}

function onMouseup(event) {
  // console.log('onMouseup.event', event)

  draggable.value = false
  transition.value = true

  if (!props.magnet) {
    return
  }

  const adsorbValue = adsorbRule({
    offsetX: writeOffset.value.x,
  })

  if (adsorbValue.type !== 'none') {
    return
  }

  const magnetValue = magnetRule({
    offsetX: writeOffset.value.x,
  })
  writeOffset.value = {
    x: magnetValue.x,
    y: writeOffset.value.y,
  }
}

let mousemoveTime = 0
function onMousemove(event) {
  event.preventDefault()

  if (!draggable.value) {
    return
  }

  mousemoveTime = new Date().getTime()
  if (mousemoveTime - mousedownTime < 50) {
    draggable.value = false
    return
  }

  // console.log('onMousemove.event', event)

  const x = event.clientX - parentRect.value.left
  const y = event.clientY - parentRect.value.top

  setOffset({ x, y })
}
function onMouseleave(event) {
  event.preventDefault()
  draggable.value = false
  onMouseup()
}

function onResize() {
  floatRect.value = floatBubbleRef.value.getBoundingClientRect()
  parentRect.value = parentEl.value.getBoundingClientRect()
}

onMounted(() => {
  parentEl.value = document.querySelector(props.parent)

  onResize()
  setPosition()

  watch(
    () => parentRect,
    () => {
      setPosition()
    },
  )
  watch(
    () => writeOffset,
    (value) => {
      const adsorbValue = adsorbRule({
        offsetX: value.x,
        offsetY: value.y,
      })
      emitAdsorb(adsorbValue)
    },
  )

  parentEl.value.addEventListener('mousemove', onMousemove)
  parentEl.value.addEventListener('mouseleave', onMouseleave)
  window.addEventListener('resize', onResize)
})

onUnmounted(() => {
  parentEl.value.removeEventListener('mousemove', onMousemove)
  parentEl.value.removeEventListener('mouseleave', onMouseleave)
  window.removeEventListener('resize', onResize)
})
</script>

<template>
  <div
    ref="floatBubbleRef"
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
        >
        <span
          v-else
          class="text-center"
        >
          {{ writeOffset.x }} <br>
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
