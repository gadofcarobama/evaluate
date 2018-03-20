<template>
  <div v-show="classId">
    <Menu></Menu>
    <UserPop></UserPop>
    <div v-show="msg">
      <el-card class="login">请先登录</el-card>
    </div>
    <div class="MClass">
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item title="正在进行的考试" name="1">
          <div v-for="(item,index) in starting" :key="index" class="box-card1" v-if="index%2==0">
            <div class="leftC">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span class="testNum">试卷编号：{{starting[index].pageId}}</span>
                  <router-link
                    :to="{path:'pageOne',query:{classId:starting[index].classId,pageId:starting[index].pageId}}">
                    <el-button style="float: right; padding: 3px 0;color: limegreen" type="text">开始考试</el-button>
                  </router-link>
                </div>
                <div class="text item">
                  <b>开始时间：</b>{{starting[index].startingExam}}<br/>
                  <b>结束时间：</b>{{starting[index].startingExam1}}<br/>
                  <b>考试班级：</b>{{starting[index].classId}}<br/>
                </div>
              </el-card>
            </div>
            <div class="rightC" v-if="index<starting.length-1">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span class="testNum">试卷编号：{{starting[index+1].pageId}}</span>
                  <router-link
                    :to="{path:'pageOne',query:{classId:starting[index+1].classId,pageId:starting[index+1].pageId}}">
                    <el-button style="float: right; padding: 3px 0;color: limegreen" type="text">开始考试</el-button>
                  </router-link>
                </div>
                <div class="text item">
                  <b>开始时间：</b>{{starting[index+1].startingExam}}<br/>
                  <b>结束时间：</b>{{starting[index+1].startingExam1}}<br/>
                  <b>考试班级：</b>{{starting[index+1].classId}}<br/>
                </div>
              </el-card>
            </div>
          </div>
        </el-collapse-item>

        <el-collapse-item title="尚未开始的考试" name="2">
          <div v-for="(item,index) in willing" :key="index" class="box-card1" v-if="index%2==0">
            <div class="leftC">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span class="testNum">试卷编号：{{willing[index].testNum}}</span>
                  <el-button style="float: right; padding: 3px 0;color: dimgrey" type="text">尚未开始</el-button>
                </div>
                <div class="text item">
                  <b>开始时间：</b>{{willing[index].willStartExam}}<br/>
                  <b>结束时间：</b>{{willing[index].willStartExam1}}<br/>
                  <b>考试班级：</b>{{willing[index].classId}}
                </div>
              </el-card>
            </div>
            <div class="rightC" v-if="index<willing.length-1">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span class="testNum">试卷编号：{{willing[index+1].testNum}}</span>
                  <el-button style="float: right; padding: 3px 0;color: dimgrey" type="text">尚未开始</el-button>
                </div>
                <div class="text item">
                  <b>开始时间：</b>{{willing[index+1].willStartExam}}<br/>
                  <b>结束时间：</b>{{willing[index+1].willStartExam1}}<br/>
                  <b>考试班级：</b>{{willing[index+1].classId}}
                </div>
              </el-card>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item title="已经结束的考试" name="3">
          <div v-for="(item,index) in this.ending" :key="index" class="box-card1" v-if="index%2==0">
            <div class="leftC">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span class="testNum">试卷编号：{{ending[index].testNum}}</span>
                  <el-button style="float: right; padding: 3px 0" type="text">考试结束</el-button>
                </div>
                <div class="text item">
                  <b>开始时间：</b>{{ending[index].endingExam}}<br/>
                  <b>结束时间：</b>{{ending[index].endingExam1}}<br/>
                  <b>考试班级：</b>{{ending[index].classId}}
                </div>
              </el-card>
            </div>
            <div class="rightC" v-if="index<ending.length-1">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span class="testNum">试卷编号：{{ending[index+1].testNum}}</span>
                  <el-button style="float: right; padding: 3px 0" type="text">考试结束</el-button>
                </div>
                <div class="text item">
                  <b>开始时间：</b>{{ending[index+1].endingExam}}<br/>
                  <b>结束时间：</b>{{ending[index+1].endingExam1}}<br/>
                  <b>考试班级：</b>{{ending[index+1].classId}}
                </div>
              </el-card>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>
<script>
  import Menu from './Menu'
  import UserPop from "./UserPop";
  export default {
    name: "page-index",
    mounted() {
      this.get(),
        history.pushState(null, null, document.URL);
      window.addEventListener('popstate', function () {
        history.pushState(null, null, document.URL);
      })
      if (this.refresh == true) {
        this.$nextTick(function () {
          // setTimeout(this.reloade, 1000);
          clearTimeout()
        })
        this.refresh = false
      }
    },
    components: {
      Menu,
      UserPop
    },
    data() {
      return {
        activeNames: ['1', '2', '3'],
        refresh: true,
        studentId: 0,
        classId: true,
        msg: false,
        classIdArr: [],
        starting: [
          // startingExam: '',//正在开始的考试的开始时间
          // startingExam1: '',//正在开始的考试的结束时间
        ]
        ,
        ending: [
          // {
          //   endingExam: '',//已经结束的考试的开始时间
          //   endingExam1: ''//已经结束的考试的结束时间
          // }
        ],
        willing: [
          // {
          //   willStartExam: '',//未开始的考试的开始时间
          //   willStartExam1: ''//已经开始的考试时间的结束时间
          // }
        ],
        data: [
          {id: ''},
          {pagesId: ''},
          {classId: ''},
          {startTime: []},
          {endTime: []}
        ]
      }
    },
    methods: {

      // //接收登录页面传过来的classId值
      // getClassId(){
      //   this.classId=
      //   console.log('pageIndexId::'+this.classId)
      // },
      reloade: function () {
        location.reload()
      },
      get: function () {
        let classId = this.$route.query.idclass

        // this.$router.push({query:{studentId:studentId}})
        if (classId == '') {
          this.classId = false
          this.msg = true
        }
        this.axios.get(
          '/page/listPagesByClassId',
          {
            params: {
              'classId': JSON.parse(window.localStorage.getItem('user')).classId
            }
          }
        ).then(
          res => {
            console.log(res)
            this.data = res.data.data
            for (let i = 0; i < res.data.data.length; i++) {
              var nowTime = new Date().getTime()
              //尚未开始的考试
              if (nowTime < res.data.data[i].startTime) {
                let newObj1 = {}
                let willingExam = res.data.data[i].startTime
                let willingExam1 = res.data.data[i].endTime
                let testNum = res.data.data[i].pagesId
                let date = new Date(willingExam).toLocaleString()
                let date1 = new Date(willingExam1).toLocaleString()
                newObj1.willStartExam = date
                newObj1.willStartExam1 = date1
                newObj1.testNum = testNum
                newObj1.classId = res.data.data[i].classId
                this.willing.push(newObj1)
                //正在进行的考试
              } else if (res.data.data[i].startTime < nowTime && nowTime < res.data.data[i].endTime) {
                let newObj = {}
                this.starting.startingExam = res.data.data[i].startTime
                this.starting.startingExam1 = res.data.data[i].endTime
                let startingExam = res.data.data[i].startTime
                let date = new Date(startingExam).toLocaleString()
                let startingExam1 = res.data.data[i].endTime
                let date1 = new Date(startingExam1).toLocaleString()
                let classId = res.data.data[i].classId
                let pageId = res.data.data[i].pagesId
                // console.log('pageId:: '+pageId)
                newObj.startingExam = date
                newObj.startingExam1 = date1
                let studentId = this.$route.query.studentId
                // console.log('studentId2::'+studentId)
                newObj.classId = classId
                newObj.pageId = pageId
                newObj.studentId = studentId
                console.log('new obj' + this.starting)
                this.starting.push(newObj)
                //已经结束的考试
              } else {
                let newObj = {}
                let endingExam1 = res.data.data[i].startTime
                let endingExam2 = res.data.data[i].endTime
                let testNum = res.data.data[i].pagesId
                let date = new Date(endingExam1).toLocaleString()
                let date1 = new Date(endingExam2).toLocaleString()
                newObj.classId = res.data.data[i].classId
                newObj.endingExam = date
                newObj.endingExam1 = date1
                newObj.testNum = testNum
                this.ending.push(newObj)
              }
            }
            console.log('length' + this.starting.length)
          }
        ).catch(
          err => {
            console.log(err)
          })
      },
    }
  }

</script>

<style scoped>
  .login {
    height: 100px;
    width: 100px;
    margin-top: 200px;
    margin-left: 150px;
  }

  .el-dropdown + .el-dropdown {
    margin-left: 15px;
  }

  .box1 {
    /*margin-top: 35px;*/
    margin-left: 13%;
    margin-right: 13%;
    background: red;
  }

  .box1-word {
    /*margin-top: 35px;*/
    margin-right: 2px;
    float: left;
  }

  .box1-line {
    float: right;
    padding-top: 3px;
  }

  .box-card1 {
    margin-top: 20px;
    width: 100%;
    /*background-color: #f1f1f1;*/
  }

  .text {
    font-size: 15px;
  }

  .item {
    padding: 18px 0;
  }

  .testNum {
    font-size: 18px;
  }

  .button1 {
    /*float: right;*/
    padding-bottom: 10px;
  }

  .leftC {
    float: left;
    width: 48%;
    margin-top: 6px;
    margin-bottom: 6px;
  }

  .rightC {
    width: 48%;
    float: right;
    margin-top: 6px;
    margin-bottom: 6px;
  }

  .MClass {
    width: 90%;
    margin-left: 5%;
  }

  el-collapse-item {
    width: 90%;
  }
</style>

