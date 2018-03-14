<template>
  <div>

    <el-card class="box-card" style="background: powderblue ">
      <div class="a">创建试卷</div>
      <div class="b">出卷老师:李华玲</div>
    </el-card>
    <el-radio-group style="width: 100%" v-model="radio" @change="show5f(radio)">
      <el-card style="text-align: center">

        <ul>
          <el-radio name="create" v-model="radio" :label="1">创建新试卷</el-radio>
        </ul>





        <div v-show="show5">
          <div>
            <div style="font-size: 15px" >试卷名称:
              <el-input v-model="examName" style="width: 150px"/>
            </div>
          </div>
          <div>
            <div style="font-size: 15px">试卷科目:
              <el-input v-model="course" style="width: 150px"/>
            </div>
          </div>
          <router-link :to="'/combine/'+this.examName+'/'+this.course">
            <el-button> 下一步</el-button>
          </router-link>
        </div>
      </el-card>
      <div class="e">
        <el-card class="b" style="background: powderblue">

          <ul>
            <el-radio name="create" v-model="radio" :label="2" >从试题库中选择一张试卷</el-radio>
          </ul>

          <div></div>
          <div v-show="show6">

            <el-button>下一步</el-button>

          </div>
        </el-card>
      </div>
    </el-radio-group>

    <bottom></bottom>
  </div>

</template>

<script>
  import bottom from './bottom'

  export default {
    name: "Create",
    component: {
      bottom
    },
    data() {
      return {
        radio: 1,
        show5: true,
        show6: false,
        examName: "",
        course: "",


      }
    },
    methods: {
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

  .d {

  }

</style>
