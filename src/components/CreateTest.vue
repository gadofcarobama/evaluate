<template>
  <div class="createtest">

    <el-card class="box-card" style="background: powderblue ">
      <div class="a">创建考试</div>
      <div class="b">出卷老师</div>
    </el-card>
    <div class="g">
      <el-card class="box-card" style="height: 400px;background: whitesmoke">
        <div style="margin-top: auto">考试名称: {{this.$route.params.examName}}

        </div>
        <div style="margin-top: 10px">考试时间</div>
        <div class="block">
          <span class="demonstration"></span>
          <el-date-picker
            v-model="value1"
            type="datetimerange"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right">
          </el-date-picker>
        </div>
        <div style="margin-top: 10px">答卷时间
          <el-input type="input" size="small" style="width:70px" ></el-input>
          min
        </div>

        <div style="margin-top: 10px">及格分数  <el-input type="input" size="small" style="width: 50px" ></el-input></div>
        <div style="margin-top: 10px">考试说明 <input type="input" size="small" style="height: 100px" ></input></div>
        <div class="t">
          <router-link to="/teacherIndex">
            <el-button type="primary" style="margin-right: 75px" @click="post">生成</el-button>
          </router-link>
          <el-button type="danger">重置</el-button>
        </div>

      </el-card>

    </div>

    <bottom></bottom>

  </div>

</template>

<script>
  import bottom from './bottom'
  export default {
    name: "Create",
    component:{
      bottom
    },
    data() {
      return {
        examName:'',
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]

        },
        // totaltime:[end-start],
        value1: [new Date(2018, 0, 10, 10, 10), new Date(2018, 0, 11, 10, 10)],

      };


    },

  }
</script>

<style scoped>

  .box-card {

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

  .t {
    text-align: center;

  }

  .x {
    border-radius: 44px;
    width: 52px;
  }
  .w{
  width: 500px;
  }

</style>
