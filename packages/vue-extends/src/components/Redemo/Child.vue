<template>
  <div class="pt-4 flex flex-col items-center">
    <div class="">
      {{ text }}
    </div>
    <button class="btn btn-accent block mt-4" @click="handleClick">
      change text
    </button>
    <div class="pt-2 text-gray-500">
      请在控制台中查看效果
    </div>
  </div>
</template>

<script>
export default {
  name: 'Child',
  data() {
    return {
      text: 'This is Child',
    }
  },
  beforeCreate() {
    console.log('Trigger beforeCreate', this)
  },
  created() {
    console.log('Trigger created', this)
  },
  beforeMount() {
    console.log('Trigger beforeMount', this)
  },
  mounted() {
    console.log('Trigger mounted', this)
  },
  methods: {
    handleClick() {
      this.text = 'Changed text'
    },
  },
}
</script>

<style></style>
