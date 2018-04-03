<template>
  <div class="result-page">
    <Menu></Menu>
    <UserPop></UserPop>
    <div>
      <el-card class="msg">历史考试</el-card>
      <el-row>
        <el-col :span="12">
          <div v-for="item in data" class="card" :key='item' >
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span> 试卷编号：{{item.pagesId}}</span>
                <router-link :to="{path:'detail',query:{pageId:item.pagesId,studentId:item.studentId}}">
                  <el-button style="float: right; padding: 3px 0" type="text">详情</el-button>
                </router-link>
              </div>
              <div>分数：{{item.score}}</div>
            </el-card>
          </div>
          <!--<div v-for="item in 100" class="card">-->
            <!--<el-card><el-button></el-button></el-card>-->
          <!--</div>-->
        </el-col>
        <el-col :span="10">
          <div :class="carfixed==true? 'isfixed':''">
          <el-card class="line-chart" id="carbar">
            <div class="t4">
              得分趋势
              <ve-line :data="chartData" :settings="chartSettings"></ve-line>
            </div>
          </el-card>
          </div>
        </el-col>
        <el-col :span="2">
          <div>&nbsp;</div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import Menu from "./Menu";
  import UserPop from "./UserPop";
  export default {
    name: "result-page",
    components: {
      Menu,
      UserPop
    },
    data() {
      return {
        carfixed:false,

        studentId: 0,
        data: [
          {
            pagesId: "",
            studentId: "",
            score: "",
            time: ""
          }
        ],
        score: []
      };
    },
    created: function() {},
    mounted() {
      this.getStudentId(), this.getResultPages();
      window.addEventListener("scroll",this.lis)
    },
    methods: {
      lis:function() {
      var scrollTop=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop
      var offsetTop=document.querySelector("#carbar").offsetTop
      //滚轮大于car到顶部的距离并且小于car到底部的距离
        if (scrollTop>offsetTop+50){
        this.carfixed=true
      }else {
        this.carfixed=false
      }
      },
      getStudentId: function() {
        this.studentId = this.$route.query.studentId;
      },
      getResultPages: function() {
        this.axios
          .get("/page/listScore", {
            params: {
              studentId: JSON.parse(window.localStorage.getItem("user")).id
            }
          })
          .then(res => {
            this.data = res.data.data;

            (this.chartData = {
              columns: ["score", "date"],
              rows: []
            }),
              (this.chartSettings = {
                metrics: ["score"],
                dimension: ["date"]
              });
            console.log("this is " + this.chartData);
            for (let i = 0; i < res.data.data.length; i++) {
              this.chartData.rows.push({
                date: i + 1,
                score: res.data.data[i].score
              });
            }
          })
          .catch(err => {
            console.log(err);
            this.$notify({
              title: "数据获取失败",
              message: "服务器请求失败，请检查网络或联系管理员",
              type: "error"
            });
          });
      },
      getlinechart: function() {
        this.axios.get().then();
      }
    }
  };
</script>

<style scoped>
  .isfixed{
    width: 40%;
    position: fixed;
    /*top: 200px;*/
    magrin-bottom:200px;
  }
  .msg {
    text-align: center;
    margin-top: 5px;
  }

  .card {
    width: 80%;
    margin: 20px;
  }

  .line-chart {
    margin: 20px;
    width: 80%;
    height: auto;
    text-align: center;
  }
</style>
