<template>
  <div class="h-full flex flex-col items-center justify-center">
    <div class="flex flex-col space-y-8 sm:flex-row sm:space-y-0 sm:space-x-8">
      <div class="flex flex-col items-center">
        <button class="btn btn-accent block" @click="handleRehook">
          Rehook
        </button>
        <div class="pt-4">
          重新触发子组件的钩子函数
        </div>
      </div>
      <div class="flex flex-col items-center">
        <button class="btn btn-accent block" @click="handleRedata">
          Redata
        </button>
        <div class="pt-4">
          重置子组件 $data 中的数据
        </div>
      </div>
      <div class="flex flex-col items-center">
        <button class="btn btn-accent block" @click="handleReload">
          Reload
        </button>
        <div class="pt-4">
          同时具有 Rehook & Redata 的效果
        </div>
      </div>
    </div>
    <div class="mt-4 border-t w-full text-center">
      <Child ref="child" />
    </div>
  </div>
</template>

<script>
import Child from './Child.vue'

export default {
  components: {
    Child,
  },
  methods: {
    handleRedata() {
      this.$refs.child.$redata()
    },
    handleRehook() {
      this.$refs.child.$rehook()
    },
    handleReload() {
      this.$refs.child.$reload()
    },
  },
}
</script>

<style></style>
