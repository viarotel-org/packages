<script>
import { debounce } from 'lodash-es'
import { createWriteProps } from '@/utils/index.js'

const writeProps = createWriteProps(['offset'])

export default {
  props: {
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
  },
  emits: ['unadsorb', 'adsorb', 'update:offset'],
  data() {
    return {
      ...writeProps.data,
      draggable: false,
      transition: false,
      floatRect: {
        width: 0,
        height: 0,
      },
      parentRect: {
        width: 0,
        height: 0,
      },
      parentEl: null,
    }
  },
  computed: {
    ...writeProps.computed,
    offsetStyle() {
      const top = this.writeOffset.y
      const left = this.writeOffset.x
      return {
        transform: `translate(${left}px, ${top}px)`,
      }
    },
    halfRect() {
      return {
        width: this.floatRect.width / 2,
        height: this.floatRect.height / 2,
      }
    },
    transitionStyle() {
      if (!this.transition) {
        return ''
      }
      return {
        'transition-property': 'all',
        'transition-duration': '300ms',
        'transition-timing-function': 'cubic-bezier(0.4, 0, 0.2, 1)',
      }
    },
    gapX() {
      return this.gap?.x || this.gap || 0
    },
    gapY() {
      return this.gap?.y || this.gap || 0
    },
    sizeStyle() {
      return {
        width: this.size,
        height: this.size,
      }
    },
  },
  watch: {
    writeOffset(value) {
      const adsorb = this.adsorbRule({
        offsetX: value.x,
        offsetY: value.y,
      })
      this.emitAdsorb(adsorb)
    },
  },
  created() {
    this.emitAdsorb = debounce(this.emitAdsorb, 500)
  },
  mounted() {
    this.init()
    this.parentEl.addEventListener('mousemove', this.onMousemove)
    this.parentEl.addEventListener('mouseleave', this.onMouseleave)
    window.addEventListener('resize', this.init)
  },
  beforeUnmount() {
    this.parentEl.removeEventListener('mousemove', this.onMousemove)
    this.parentEl.removeEventListener('mouseleave', this.onMouseleave)
    window.removeEventListener('resize', this.init)
  },
  methods: {
    init() {
      this.parentEl = document.querySelector(this.parent)
      this.parentRect = this.parentEl.getBoundingClientRect()
      this.floatRect = this.$refs.floatBubble.getBoundingClientRect()

      this.setPosition()
    },
    adsorbUpdate() {
      this.writeOffset = { ...this.writeOffset }
    },
    emitAdsorb(...params) {
      if (params[0].type === 'none') {
        this.$emit('unadsorb', ...params)
        return
      }
      this.$emit('adsorb', ...params)
    },
    setOffset(value) {
      value = this.safeRule({
        offsetX: value.x,
        offsetY: value.y,
      })

      this.writeOffset = {
        ...value,
      }
    },
    adsorbRule({ offsetX, offsetY }) {
      const value = {
        offset: { ...this.writeOffset },
      }
      if (offsetX >= this.parentRect.width - this.floatRect.width) {
        value.type = 'right'
      }
      else if (offsetX <= 0) {
        value.type = 'left'
      }
      else {
        value.type = 'none'
      }
      return value
    },
    magnetRule({ offsetX, offsetY }) {
      const y = 0
      let x = 0

      if (offsetX > this.parentRect.width / 2 - this.halfRect.width) {
        x = this.parentRect.width - this.floatRect.width - this.gapX
      }
      else {
        x = this.gapX
      }

      return {
        x,
        y,
      }
    },
    safeRule({ offsetX, offsetY }) {
      let y = 0
      let x = 0

      if (offsetY >= this.halfRect.height) {
        y = offsetY - this.halfRect.height
      }

      if (offsetX >= this.halfRect.width) {
        x = offsetX - this.halfRect.width
      }

      if (offsetY >= this.parentRect.height - this.halfRect.height) {
        y = this.parentRect.height - this.floatRect.height
      }

      if (offsetX >= this.parentRect.width - this.halfRect.width) {
        x = this.parentRect.width - this.floatRect.width
      }

      return {
        x,
        y,
      }
    },
    setPosition() {
      if (
        typeof this.position.bottom === 'number'
        && typeof this.position.right === 'number'
      ) {
        this.setOffset({
          x: this.parentRect.width - this.halfRect.width - this.position.right,
          y:
            this.parentRect.height
            - this.halfRect.height
            - this.position.bottom,
        })
      }
      else if (
        typeof this.position.bottom === 'number'
        && typeof this.position.left === 'number'
      ) {
        this.setOffset({
          x: this.halfRect.width + this.position.left,
          y:
            this.parentRect.height
            - this.halfRect.height
            - this.position.bottom,
        })
      }
      else if (
        this.position.bottom === 'center'
        && typeof this.position.right == 'number'
      ) {
        this.setOffset({
          x: this.parentRect.width - this.halfRect.width - this.position.right,
          y: this.parentRect.height / 2 - this.halfRect.height,
        })
      }
      else if (
        this.position.bottom === 'center'
        && typeof this.position.left == 'number'
      ) {
        this.setOffset({
          x: this.halfRect.width + this.position.left,
          y: this.parentRect.height / 2 - this.halfRect.height,
        })
      }
    },
    onMousedown(event) {
      // console.log('onMousedown.event', event)

      this.mousedownTime = new Date().getTime()

      this.draggable = true
      this.transition = false
    },
    onMouseup(event) {
      // console.log('onMouseup.event', event)

      this.draggable = false
      this.transition = true

      // this.mouseupTime = new Date().getTime()
      // if (this.mouseupTime - this.mousedownTime < 500) {
      //   return
      // }

      if (!this.magnet) {
        return
      }

      const adsorb = this.adsorbRule({
        offsetX: this.writeOffset.x,
        offsetY: this.writeOffset.y,
      })

      if (adsorb.type !== 'none') {
        return
      }

      const value = this.magnetRule({
        offsetX: this.writeOffset.x,
      })

      this.writeOffset = {
        x: value.x,
        y: this.writeOffset.y,
      }
    },
    onMousemove(event) {
      if (!this.draggable) {
        return
      }

      this.mousemoveTime = new Date().getTime()
      if (this.mousemoveTime - this.mousedownTime < 50) {
        this.draggable = false
        return
      }

      // console.log('onMousemove.event', event)

      const x = event.clientX - this.parentRect.left
      const y = event.clientY - this.parentRect.top

      this.setOffset({ x, y })
    },
    onMouseleave(event) {
      this.draggable = false
      this.onMouseup()
    },
  },
}
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
