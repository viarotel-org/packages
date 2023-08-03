<template>
  <div class="h-full flex flex-col items-center justify-center">
    <button class="btn btn-accent" @click="handleChild">
      RehookChild
    </button>
    <div class="pt-4">
      请点击 RehookChild 并通过控制台查看钩子函数触发情况
    </div>

    <Child ref="child" />
  </div>
</template>

<script>
import Child from './Child.vue'

export default {
  components: {
    Child,
  },
  methods: {
    handleChild() {
      this.$refs.child.$rehook()
    },
  },
}
</script>

<style></style>
