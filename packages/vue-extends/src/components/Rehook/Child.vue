<template>
  <div class="pt-4">
    This is Child
  </div>
</template>

<script>
export default {
  name: 'Child',
  data() {
    return {}
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
}
</script>

<style></style>
