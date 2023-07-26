<template>
  <div class="h-full relative flex items-center justify-center">
    <div class="float-bubble-container w-200 h-200 border border-red-500">
      <FloatBubble
        ref="floatBubble"
        :magnet="true"
        parent=".float-bubble-container"
        :gap="24"
        :position="{
          top: 'center',
          right: 24,
        }"
      >
        <template #default="handler">
          <FloatBubbleTheme
            ref="floatBubbleTheme"
            v-bind="handler"
            :data="menuData"
          />
        </template>
      </FloatBubble>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuData: [
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
    }
  },
  mounted() {},
  methods: {},
}
</script>

<style scoped></style>
