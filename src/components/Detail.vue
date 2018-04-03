<template>
  <div class="detail">
    <Menu></Menu>
    <UserPop></UserPop>
    <el-card class="box1">当前考卷详情解析</el-card>
    <div v-for="(item,index) in choices" class="content-card" :key="index" v-if="choices.length!==0">
      <el-card>
        <font color="red">题目：</font><pre>{{item.title}}</pre><br>
        <font color="red">选项：</font><pre>A:{{item.sectionA}}</pre><br>
        <pre>B:{{item.sectionB}}</pre><br>
        <pre>C:{{item.sectionC}}</pre><br>
        <pre>D:{{item.sectionD}}</pre><br>
        <font color="red">你的答案：</font><pre>{{item.answer}}</pre><br>
        <font color="red">标准答案：</font><pre>{{item.standardAnswer}}</pre><br>
        <font color="red">该题得分：</font>{{item.score}}
      </el-card>
    </div>
    <div v-for="(item,index) in blanks" class="content-card" v-if="blanks.length!==0">
      <el-card>
      <font color="red">题目：</font><pre>{{item.title}}</pre><br>
      <font color="red">你的答案：</font><pre>{{item.answer}}</pre><br>
      <font color="red">标准答案：</font><pre>{{item.standardAnswer}}</pre><br>
      <font color="red">该题得分：</font>{{item.score}}
      </el-card>
    </div>
    <div v-for="(item,index) in ans" class="content-card" v-if="ans.length!==0">
      <el-card>
        <font color="red">题目：</font><pre>{{item.title}}</pre><br>
        <font color="red">你的答案：</font><pre>{{item.answer}}</pre><br>
        <font color="red">标准答案：</font><pre>{{item.standardAnswer}}</pre><br>
        <font color="red">该题得分：</font>{{item.score}}
      </el-card>
    </div>
  </div>
</template>

<script>
  import Menu from './Menu'
  import UserPop from './UserPop'
  export default {
    name: "detail",
    mounted() {
      this.getErrDateil()
    },
    components: {
      Menu,
      UserPop
    },
    data() {
      return {
        res: [],
        choices:[],
        blanks:[],
        ans:[],
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
            this.choices=res.data.data.select
            this.blanks=res.data.data.blank
            this.ans=res.data.data.ans
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
