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
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      magneted: true,
    }
  },
  methods: {
    onAdsorb(event) {
      console.log("onAdsorb.event", event)
    },
    onUnadsorb(event) {
      console.log("onUnadsorb.event", event)
    },
  },
}
</script>

<style scoped></style>
