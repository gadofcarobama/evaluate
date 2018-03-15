<template>
  <div id="success">
    <Menu></Menu>
    <el-card class="msg">
      <div>试卷已提交！</div>
      <div>正在等待判卷结果，您可以进入考试结果查看历史考试结果统计，也可以返回主页</div>
      <div class="btn">
        <el-button size="mini" type="primary" @click="intoResultPage">历史成绩</el-button>
        <el-button size="mini" type="primary" @click="intoIndex">返回主页</el-button>
      </div>
    </el-card>
  </div>

</template>

<script>
  import Menu from './Menu'

  export default {
    name: "success",
    components: {
      Menu
    },
    mounted() {
      // this.score();
      // this.sum();
      this.getStudentId()
    },
    data() {
      return {
        studentId: 0

      }
    },
    methods: {
      intoResultPage: function () {
        this.$router.push({path: '/resultPage', query: {studentId: this.studentId}})
      },
      intoIndex: function () {
        this.$router.replace('/studentLogin')
      },
      getStudentId: function () {
        this.studentId = this.$route.query.studentId
        console.log('this studentSuccess studentId is ::' + this.studentId)
      },


    }
  }

</script>

<style scoped>
  .msg {
    width: 500px;
    height: 500px;
    margin-top: 50px;
    margin-left: 150px;
    background: pink;
    color: green;
  }

  .btn {
    margin-top: 100px;
  }
</style>
