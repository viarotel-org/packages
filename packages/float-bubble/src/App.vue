<script setup>
const magneted = true

const onAdsorb = (event) => {
  console.log('onAdsorb.event', event)
}
const onUnadsorb = (event) => {
  console.log('onUnadsorb.event', event)
}
</script>

<template>
  <div class="h-full relative float-bubble-container">
    <float-bubble
      ref="floatBubble"
      parent=".float-bubble-container"
      :magnet="magneted"
      :position="{
        right: 24,
        bottom: 'center',
      }"
      @adsorb="onAdsorb"
      @unadsorb="onUnadsorb"
    ></float-bubble>
  </div>
</template>

<style scoped></style>
