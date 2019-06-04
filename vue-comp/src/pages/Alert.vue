<template>
  <div>
    <button @click="alert">显示</button>
  </div>
</template>

<script>
export default {
  methods: {
    alert () {
      this.$Alert({
        content: 'toast',
        duration: 10
      })
    }
  }
}
</script>

<style>

</style>
