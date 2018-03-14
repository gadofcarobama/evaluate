<template>
  <div class="request">
    这个是考试
    <div>
      <el-input v-model="input" placeholder="请输入内容"></el-input>
    </div>

    <div>
      <el-button type="danger" round>删除</el-button>
    </div>
    <div id="input"  v-on:click="del()"></div>
  </div>
</template>

<script>
  export default {
    name: "request",
    date()  {
      return {
      input: ''
    }
  },methods:{

    }
  }
</script>

<style scoped>

</style>
