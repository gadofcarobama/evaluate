<template>
  <div class="box" v-show="classId">
    <Menu></Menu>
    <div v-show="msg">
      <el-card class="login">请先登录</el-card>
    </div>
    <div class="box1">
      <div class="box1-word">
        正在进行的考试
      </div>
      <div class="box1-line">
        <hr>
      </div>

      <el-card class="box-card1">
        <div class="text item">
        </div>
        <div class="button1">
          <div v-for="i in starting">
            <el-card>
              开始时间：{{i.startingExam}}<br/>
              结束时间：{{i.startingExam1}}
              <router-link :to="{path:'pageOne',query:{classId:i.classId,pageId:i.pageId}}">
                <el-button type="primary" round>开始考试</el-button>
              </router-link>
            </el-card>
          </div>
        </div>
      </el-card>
    </div>
    <div class="box1">
      <div class="box1-word">
        尚未开始的考试
      </div>
      <div class="box1-line">
        <hr>
      </div>
      <el-card class="box-card1">
        <div class="text item">
          <div v-for="i in willing">
            <el-card>
              开始时间：{{i.willStartExam}}
              结束时间：{{i.willStartExam1}}
            </el-card>
          </div>
        </div>
      </el-card>
    </div>
    <div class="box1">
      <div class="box1-word">
        已经完成的考试
      </div>
      <div class="box1-line">
        <hr>
      </div>
      <div class="ending">
        <div v-for="i in this.ending" class="endingExam1">
          <el-card>
            开始时间：{{i.endingExam}}
            结束时间：{{i.endingExam1}}
          </el-card>
        </div>
        <!--<div v-for="j in this.ending" class="endingExam">-->
        <!--结束时间：{{j}}-->
        <!--</div>-->
      </div>
    </div>
  </div>
</template>
<script>
  import Menu from './Menu'
  export default {
    name: "page-index",
    mounted() {
      this.get(),
      history.pushState(null, null, document.URL);
      window.addEventListener('popstate', function () {
        history.pushState(null, null, document.URL);
      })
         if (this.refresh==true){
           this.$nextTick(function () {
             // setTimeout(this.reloade, 1000);
             clearTimeout()
           })
           this.refresh=false
         }
    },
    components:{
      Menu
    },
    data() {
      return {
        refresh:true,
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
      reloade:function () {
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
                let date = new Date(willingExam).toLocaleString()
                let willingExam1 = res.data.data[i].endTime
                let date1 = new Date(willingExam1).toLocaleString()
                newObj1.willStartExam = date
                newObj1.willStartExam1 = date1
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
                //console.log('classid :: '+classId)
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
                //   console.log(this.starting)
                //已经结束的考试
              } else {
                let newObj = {}
                let endingExam1 = res.data.data[i].startTime
                let date = new Date(endingExam1).toLocaleString()
                let endingExam2 = res.data.data[i].endTime
                let date1 = new Date(endingExam2).toLocaleString()
                newObj.endingExam = date
                newObj.endingExam1 = date1
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

  .el-dropdown {
    vertical-align: top;
  }

  .el-dropdown + .el-dropdown {
    margin-left: 15px;
  }

  .el-icon-arrow-down {
    font-size: 12px;
  }

  .stu {
    margin-top: 35px;

  }

  .stu1 {
    float: left;
    margin-left: 200px;
  }

  .stu2 {
    margin-left: 200px;
    float: left;
  }

  .stu3 {
    float: left;
    margin-left: 200px;
  }

  .box1 {
    margin-top: 35px;
    margin-left: 200px;
    margin-right: 270px;
  }

  .box1-word {
    /*margin-top: 35px;*/
    margin-right: 10px;
    float: left;
  }

  .box1-line {
    padding-top: 3px;
  }

  .box-card1 {
    margin-top: 60px;
    width: 400px;
    background-color: #f1f1f1;
  }

  .text {
    font-size: 20px;
  }

  .item {
    padding: 18px 0;
  }

  .button1 {
    float: right;
    padding-bottom: 10px;
  }
</style>

