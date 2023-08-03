<template>
  <div class="h-full flex flex-col">
    <div class="border-b flex-none py-4 px-6 flex items-center">
      <div class="text-2xl font-bold flex-none">
        vue-extends-demo
      </div>
      <div class="flex-1 w-0"></div>
    </div>
    <div
      class="flex-1 h-0 overflow-y-auto overflow-x-hidden float-bubble-container"
    >
      <component :is="activeComponent"></component>

      <FloatBubble
        ref="floatBubble"
        parent=".float-bubble-container"
        :magnet="true"
        :gap="24"
        :position="{
          top: 'center',
          left: 24,
        }"
      >
        <template #default="handler">
          <FloatBubbleTheme v-bind="handler" :data="menuModel" />
        </template>
      </FloatBubble>
    </div>
  </div>
</template>

<script>
import Rehook from './components/Rehook/index.vue'

export default {
  components: {
    Rehook,
  },
  data() {
    return {
      activeComponent: 'Rehook',
    }
  },
  computed: {
    menuModel() {
      return [
        {
          hover: 'Rehook',
          text: 'Rehook',
          icon: 'iconfont icon-help',
          class: 'text-[16px]',
          textClass: 'transform scale-80',
          click: () => {
            this.activeComponent = 'Rehook'
          },
        },
      ]
    },
  },
  mounted() {
    console.log('mounted', this)
  },
}
</script>

<style></style>
