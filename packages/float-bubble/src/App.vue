<template>
  <div
    class="h-200 w-200 border border-blue-500 mx-auto mt-12 flex items-center justify-center"
  >
    <div
      class="h-150 w-150 border border-red-500 float-bubble-container overflow-hidden"
    >
      <FloatBubble
        ref="floatBubble"
        parent=".float-bubble-container"
        :magnet="magneted"
        :gap="24"
        :position="{
          top: 'center',
          right: 24,
        }"
      >
        <template #default="handler">
          <FloatBubbleTheme v-bind="handler" :data="menuData" />
        </template>
      </FloatBubble>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      magneted: true,
      menuData: [
        {
          hover: '帮助中心',
          text: '帮助',
          icon: 'iconfont icon-help',
          class: 'text-[16px]',
          // eslint-disable-next-line no-alert
          click: () => alert('帮助中心'),
        },
        {
          hover: '反馈问题',
          text: '反馈',
          icon: 'iconfont icon-fankui',
          class: 'text-[16px]',
          // eslint-disable-next-line no-alert
          click: () => alert('帮助中心'),
        },
      ],
    }
  },
  mounted() {},
  methods: {},
}
</script>

<style scoped></style>
