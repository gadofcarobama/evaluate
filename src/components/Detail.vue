<template>
  <div class="detail">
    <Menu></Menu>
    <el-card class="box1">当前考卷详情解析</el-card>
    <div v-for="(item,index) in res" class="content-card" :key="index">
      <el-card>{{index+1}}<br>
        <font color="red">题目：</font>{{item.title}}<br>
        <font color="red">你的答案：</font>{{item.answer}}<br>
        <font color="red">标准答案：</font>{{item.standardAnswer}}<br>
        <font color="red">该题得分：</font>{{item.score}}
      </el-card>
    </div>
  </div>
</template>

<script>
  import Menu from './Menu'

  export default {
    name: "detail",
    mounted() {
      this.getErrDateil()
    },
    components: {
      Menu
    },
    data() {
      return {
        res: []
      }
    },

    methods: {
      getErrDateil: function () {
        var studentId = this.$route.query.studentId
        console.log('finally studentId is::' + studentId)
        var pageId = this.$route.query.pageId
        console.log('finally pageId is::' + pageId)
        this.axios.get('/page/getScore', {params: {studentId: studentId, pageId: pageId}})
          .then(res => {
            console.log(res)
            this.res = res.data.data.ansList
            console.log('this.res is:' + this.res)
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
  }
</script>

<style scoped>
  .box1 {
    text-align: center;
    margin: 20px;
  }

  .content-card{
    margin-bottom: 20px;
  }
</style>
