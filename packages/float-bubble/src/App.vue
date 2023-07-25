<template>
  <div class="h-full relative overflow-hidden flex items-center justify-center">
    <div class="float-bubble-container w-100 h-200 border border-red-500">
      <FloatBubble
        ref="floatBubble"
        :magnet="true"
        parent=".float-bubble-container"
        :gap="0"
        :position="{
          top: 'center',
          left: 0,
        }"
      >
        <template #default="handler">
          <FloatBubbleTheme v-bind="handler" />
        </template>
      </FloatBubble>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {},
}
</script>

<style scoped></style>
