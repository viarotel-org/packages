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

<template>
  <div
    class="h-200 w-200 border border-blue-500 mx-auto mt-12 flex items-center justify-center"
  >
    <div class="h-100 w-100 border border-red-500 float-bubble-container">
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
  </div>
</template>

<style scoped></style>
