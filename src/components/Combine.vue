<template>
  <div>

    <el-card class="box-card" style="background: powderblue">
      <div class="a">进行组卷</div>
      <div class="b">出卷老师:李华玲</div>
    </el-card>
    <el-radio-group v-model="radio" style="width: 100%"  @change="show5f(radio)">
    <el-card class="b">

        <ul>
          <el-radio :label="1">从试题库中选题</el-radio>
        </ul>




      <div></div>
      <div v-show="show5">
        <div class="d">

          组卷方式:
          <el-button style="margin-right: 55px"> 选题组卷</el-button>
          <el-button style="margin-right: 55px"> 抽题组卷</el-button>
          <el-button style="margin-right: 55px"> 随机组卷</el-button>
        </div>
        <router-link :to="'/teacherExam/'+this.examName+'/'+this.course">
          <el-button> 下一步</el-button>
        </router-link>
      </div>
    </el-card>

    <el-card class="b" style="background: powderblue">
        <ul>
          <el-radio :label="2" >手工录入试题</el-radio>
        </ul>

      <div></div>
      <div v-show="show6">
        <el-button> 下一步</el-button>
      </div>
    </el-card>
    <bottom></bottom>
    </el-radio-group>
  </div>

</template>

<script>
  import bottom from './bottom'

  export default {
    name: "combine",
    mounted() {
      this.s();

    },
    component: {
      bottom
    },
    data() {
      return {
        radio2: 2,
        show5: false,
        show6: false,
        examName: '',
        course: '',

      }


    },
    methods: {

      s: function () {
        this.examName = this.$route.params.examName;
        this.course = this.$route.params.course;
      },
      show5f: function (lable) {
        console.log(lable)
        switch (lable) {
          case 1:
            this.show5 = true
            this.show6 = false
            break;
          case 2:
            this.show5 = false
            this.show6 = true;
        }

      }
    }

  }
</script>

<style scoped>

  .box-card {
    background: powderblue;
    height: 140px;
    border: 0px;
  }

  .a {

    text-align: left;
    font-size: 30px;

  }

  .b {
    text-align: center;

  }

  .el-input__inner {
    border-radius: 44px;
    width: 50px;
  }

  .d {

  }

</style>
