<template>
  <div class="teacherIndex">
    <el-row>
      <el-col :span="3">
        <div class="grid-content"></div>
      </el-col>
      <el-col :span="18">
        <div class="bg-purple-light">
          <div class="grid-content ">

            <div class="box-dis">
              <div class="box-top">
                <el-card class="box-card">
                  <div>
                    <h2>正在进行({{ing1}})</h2>
                  </div>
                </el-card>
              </div>
            </div>

            <el-row :body-style="{margin:'10px', padding:'10px'}">

              <div class="box-dis">
                <el-col :span="8" v-for="(o, index) in 1" :key="o" :offset="index > 0 ? 2 : 0">
                  <el-card :body-style="{padding: '0px',height:'250px',marginLeft:'10px'}">
                    <div style="padding: 14px;">
                      <h3><span>暂无正在进行的考试</span></h3>
                    </div>
                  </el-card>
                </el-col>
              </div>
            </el-row>

            <div class="box-dis">
              <el-card class="box-card">
                <div>
                  <h2>最近添加({{ing2}})</h2>
                </div>
              </el-card>
            </div>

            <el-row :body-style="{margin:'10px', padding:'10px'}">

              <div class="box.dis">
                <el-col :span="8" v-for="( item,o) in items" :key="o" :offset="index > 0 ? 2 : 0" class="box-left">
                  <el-card :body-style="{ padding: '0px',height:'350px',marginLeft:'10px'}">
                    <div style="padding: 14px;">
                      <h3><span>{{item.examName}}</span></h3>
                      <p>出卷老师：李华玲</p>
                      <p>考试时间：{{item.startTime}} 到 {{item.endTime}}</p>
                      <p>考试班级：{{item.classId}}</p>
                      <p>类型：选题组卷</p>
                      <p>答题时间: 120min</p>
                      <div class="button-position">
                        <el-button type="primary" class="button" icon="el-icon-edit-outline"></el-button>
                      </div>
                      <div class="button-info">
                        <el-button type="info" class="">信息按钮</el-button>
                      </div>
                    </div>
                  </el-card>
                </el-col>
              </div>

              <div class="box.dis">
                <el-col :span="8" v-for="(o, index) in 1" :key="o" :offset="index > 0 ? 2 : 0" class="box-left">
                  <el-card :body-style="{ padding: '0px',height:'300px',marginLeft:'10px'}">
                    <div style="padding: 14px;">
                      <router-link :to="'/create'">
                        <div class="button-position2">
                          <el-button type="primary" class="button1"><img src="../assets/edit.png" width="50px"
                                                                         height="50px"></el-button>
                        </div>

                        <div class="head-position"><h3>创建考试</h3></div>
                      </router-link>
                    </div>
                  </el-card>
                </el-col>
              </div>
            </el-row>
          </div>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="grid-content"></div>
      </el-col>
    </el-row>
    <Bottom></Bottom>
  </div>
</template>

<script>
  export default {
    name: "teacherIndex.vue",
    mounted() {

      this.y();

    },
    methods: {

      y: function () {
        this.axios.get('http://localhost:8085/demand/listAllDemands', {})
          .then(res => {
            console.log(res)
            this.items = res.data.data
            for (let i = 0; i < this.items.length; i++) {
              console.log(this.items[i])
            }
            console.log(this.items.examName);
          })
          .catch(err => {
            console.log(err)

          })
      },

    },
    data() {
      return {

        ing1: 0,
        ing2: 2,
        time1: "20180118",
        time2: "20180119",
        currentDate: new Date(),
        items: [
          {examName: ""},
          {course: ""},
          {classId: ""},
          {teachername: "李华玲"},
          {way: "选题组卷"},
          {infor: "登陆答题"},
          {answertime: 120}
        ]

      }
    }
  };


</script>

<style scoped>
  .bg-purple-light {
    background-color: #e9f3fe;
    /*background-color:rgba(0,152,50,0.2)*/
    /*opacity: 0.8;*/
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

  .box-dis {
    margin: 10px;
  }

  .box-left {
    margin-left: 10px;
    margin-top: 10px;
    margin-bottom: 15px;
  }

  .box-top {
    margin-top: 20px;
    padding-top: 20px;
  }

  .button {
    border-radius: 25px;
    width: 50px;
    height: 50px;
  }

  .button1 {
    border-radius: 60px;
    width: 120px;
    height: 120px;
  }

  .button-position {
    padding-left: 5px;
    margin-left: 5px;
    float: left;
  }

  .button-info {
    float: right;
    padding-right: 70px;
    padding-top: 7px;
  }

  .button-position2 {
    padding-top: 75px;
    padding-left: 100px;
    /*float: top;*/
  }

  .head-position {
    padding-left: 120px;
  }

  .head-position h3 {
    color: #0093dd;
  }
</style>
