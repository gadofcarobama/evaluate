<template>
  <div class="box">
    <div class="stu">
      <div class="stu1">
        <el-dropdown split-button type="primary" @click="handleClick">
          请选择学年
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>2017-2018学年第一学期</el-dropdown-item>
            <el-dropdown-item>2016-2017学年第二学期</el-dropdown-item>
            <el-dropdown-item>2016-2017学年第一学期</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="stu2">
        <el-dropdown split-button type="primary" @click="handleClick">
          请选择班级
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>15级Y01、Y02、Y03班</el-dropdown-item>
            <el-dropdown-item>15级A01、A02、A03班</el-dropdown-item>
            <el-dropdown-item>15级B01、B01、Z01班</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="stu3">
        <el-dropdown split-button type="primary" @click="handleClick">
          请选择相关课程
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>面向对象程序设计</el-dropdown-item>
            <el-dropdown-item>JAVAEE框架与应用开发</el-dropdown-item>
            <el-dropdown-item>云计算与大数据</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <br/><br/><br/>

    <div class="box1">
      <div class="box1-word">
        正在进行的考试
      </div>
      <div class="box1-line">
        <hr>
      </div>

      <el-card class="box-card1">
        <div class="text item">
          <!--考试名称：{{this.examMessage.examName}}-->
          <!--考试章节：{{this.examMessage.chapter}}-->
          <!--班级信息：{{this.examMessage.classId}}-->
        </div>

          <div class="button1">

            <div v-for="i in this.items" class="text item">
              <el-card>
                考试名称：{{i.examName}} <br>
                考试章节：{{i.chapter}} <br>
                班级信息：{{i.classId}} <br>
                <router-link :to="'/exam/'+i.id"><el-button type="primary" round>开始考试</el-button> </router-link>
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
          考试名称：{{this.examMessage1.examName1}}
          考试章节：{{this.examMessage1.chapter1}}
          班级信息：{{this.examMessage1.classId1}}
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
      <el-card class="box-card1">
        <!--<div class="text item" v-for="item in examMessage">-->
          <!--考试名称：{{this.examMessage.examName}}-->
          <!--考试章节：{{this.examMessage.chapter}}-->
          <!--班级信息：{{this.examMessage.classId}}-->
        <!--</div>-->
        <div class="button1">
          <el-button type="primary" round>查看分数</el-button>
          <el-button type="danger" round>查看错题</el-button>
        </div>
      </el-card>
    </div>
  </div>


</template>

<script>
  export default {
    name: "student-index",
    mounted() {
      // this.get(),
      //   this.tolocalTime()
      this.dateFormat()
    },
    data() {
      return {
        examMessage: [
          {classId: ""},
          {examName: ""},
          {chapter: ""},
          {examId: ""}
        ],
        examMessage1: {
          classId1: "",
          examName1: "",
          chapter1: "",
          examId1: ""
        },
        items:[
          {classId:''},
          {examName:''},
          {chapter:''},
          {examId:''},
          {id:''}
        ],
        timestamp:1500250800000
      }
    },
    methods: {
      // getExamId: function () {
      //   this.axios.get('http://localhost8085/stdent').then(res => {
      //     console.log(res)
      //     this.examMessage.examId = res.data.data.id
      //   })
      // },

      dateFormat:function () {
         var thedate=new Date();
         var _year=thedate.getFullYear();
         var _month=thedate.getMonth();
         var _day=thedate.getDate();
         var _hour=thedate.getHours();
         var _miuntes=thedate.getMinutes();
         var _seconds=thedate.getSeconds()
        _month=_month+1;
        if(_month<10){
          _month="0"+_month
        };
        if(_day<10){
          _day="0"+_day
        };
        if(_hour<10){
          _hour="0"+_hour
        };
        if(_miuntes<10){
          _miuntes="0"+_miuntes
        };
        if(_seconds<10){
          _seconds="0"+_seconds
        }
        var formateDate=_year+"-"+_month+"-"+_day+" "+_hour+":"+_miuntes+":"+_seconds;
        // alert(formateDate)
        var nowseconds=new Date(formateDate).getTime()
        alert(nowseconds)
        var now=new Date().getTime()
        alert(now)
        return formateDate
        //   var day=thedate.getDay();该方法是一周的第几天，想知道是一个月中的具体的第几天应该是用getDate方法
        //   alert(day)
      },
      tolocalTime:function(){
        var unixTimestamp = new Date(this.timestamp);
        var commonTime = unixTimestamp.toLocaleString();
        alert(commonTime)
        var nowTime=new Date();
        var nowSecond=nowTime.toLocaleString()
        alert(nowSecond)
      },
      get: function () {
        this.axios.get('http://localhost:8085/student/getAllDemand', {
          params: {
            "id": 1
          }
        })
          .then(res => {
            console.log('res is '+res)
            this.items= res.data.data
            console.log(res)
            // this.examMessage = res.data.data
            // this.examMessage.examName=res.data.data.examName
            // this.examMessage.chapter=res.data.data.chapter
            // this.examMessage.classId1 = res.data.data[1].classId
            // this.examMessage.examName1 = res.data.data[1].examName
            // this.examMessage.chapter1 = res.data.data[1].chapter
            console.log(this.examMessage)
          })
          .catch(err => {
            console.log(err)
          })
      }

    }
  }

</script>

<style scoped>
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
