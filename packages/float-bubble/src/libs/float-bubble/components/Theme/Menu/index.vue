<template>
  <div
    class="bg-primary text-white rounded-lg overflow-hidden flex transition-all shadow shadow-primary-700"
    :class="[adsorbClass]"
  >
    <div
      v-if="adsorbed && adsorbType === 'right'"
      class="flex items-center justify-center w-6 iconfont icon-arrow-left-bold"
      @click.stop="handleCollapse"
    />

    <div class="">
      <component
        :is="item.component || 'div'"
        v-for="(item, index) of model"
        :key="index"
        class="flex items-center justify-center w-12 min-h-12 py-[6px] hover:bg-primary-600 !active:bg-primary-700"
        :title="item.hover"
      >
        <div
          class="flex flex-col justify-center items-center"
          v-on="{
            ...(item.click ? { click: item.click } : {}),
          }"
        >
          <i v-if="item.icon" :class="[item.class, item.icon]" />
          <img
            v-else-if="item.img"
            :src="item.img"
            alt=""
            class="w-1/3"
            :class="[item.class]"
          >

          <span v-if="item.text" class="text-sm pt-[2px]">
            {{ item.text }}
          </span>
        </div>
      </component>

      <div v-if="!data || !data.length" class="write-vertical-left py-4 px-3">
        暂无数据
      </div>

      <div
        v-if="adsorbed && adsorbType === 'left'"
        class="flex items-center justify-center w-6 iconfont icon-arrow-right-bold"
        @click.stop="handleCollapse"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    adsorbed: {
      type: Boolean,
      default: false,
    },
    adsorbType: {
      type: String,
      default: '',
    },
    setAdsorbed: {
      type: Function,
      default: () => () => {},
    },
    updateAdsorb: {
      type: Function,
      default: () => () => {},
    },
    data: {
      type: Array,
      default: () => [],
      demo: [
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
    },
  },
  data() {
    return {}
  },
  computed: {
    model() {
      return this.data
    },
    adsorbClass() {
      if (!this.adsorbed) {
        return ''
      }

      const value = ['transform']

      if (this.adsorbType === 'left') {
        value.push('-translate-x-12')
      }
      else if (this.adsorbType === 'right') {
        value.push('translate-x-6')
      }

      return value.join(' ')
    },
  },
  methods: {
    handleCollapse() {
      this.setAdsorbed(false)

      setTimeout(() => {
        this.updateAdsorb()
      }, 3000)
    },
  },
}
</script>

<style scoped lang="postcss"></style>
