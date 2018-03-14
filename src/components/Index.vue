<template>
  <div class="index">
    <menu></menu>
    <carousel></carousel>
  </div>
</template>

<script>
  import Menu from './Menu'
import Carousel from './Carousel'
  export default {
    name: "index.vue",
    components: {
      Menu,
      Carousel
    }
  }
</script>

<style scoped>

</style>
