<template>
  <component :is="activeComponent" v-bind="$attrs" />
</template>

<script>
import ThemeMenu from './Menu/index.vue'

export default {
  components: {
    ThemeMenu,
  },
  props: {
    type: {
      type: String,
      default: 'menu',
    },
  },
  data() {
    return {
      componentMap: {
        menu: 'ThemeMenu',
      },
    }
  },
  computed: {
    activeComponent() {
      return this.componentMap[this.type]
    },
  },
}
</script>

<style></style>
