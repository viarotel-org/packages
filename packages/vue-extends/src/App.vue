<template>
  <div class="h-full flex flex-col bg-gray-100">
    <div class="navbar bg-base-100 flex-none">
      <div class="navbar-start">
        <a class="btn btn-ghost normal-case text-xl">vue-extends-demo</a>
      </div>
      <div class="navbar-end hidden lg:flex">
        <ul class="menu menu-horizontal px-1">
          <li><a>ReDemo</a></li>
        </ul>
      </div>
    </div>
    <div
      class="flex-1 h-0 overflow-y-auto overflow-x-hidden float-bubble-container relative"
    >
      <component :is="activeComponent"></component>
    </div>
  </div>
</template>

<script>
import Redemo from './components/Redemo/index.vue'

export default {
  components: {
    Redemo,
  },
  data() {
    return {
      activeComponent: 'Redemo',
    }
  },
  computed: {
    menuModel() {
      return [
        {
          hover: 'Redemo',
          text: 'Redemo',
          icon: 'iconfont icon-help',
          class: 'text-[16px]',
          textClass: 'transform scale-80',
          click: () => {
            this.activeComponent = 'Redemo'
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
