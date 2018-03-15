<template>
  <div class="result-page">
    <Menu></Menu>

    <el-card class="msg">历史考试</el-card>

    <el-col :span="14" class="main">


      <div v-for="item in data" class="card" :key='item'>
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


    </el-col>

    <el-col :span="8" class="main">
      <el-card class="line-chart">
        <div class="t4">
          得分趋势
          <ve-line :data="chartData" :settings="chartSettings"></ve-line>
        </div>
      </el-card>
    </el-col>

    <el-col :span="2" class="main"/>
  </div>
</template>

<script>
  import Menu from './Menu'

  export default {
    name: "result-page",
    components: {
      Menu
    },
    data() {
      return {
        studentId: 0,
        data: [
          {
            pagesId: '',
            studentId: '',
            score: '',
            time: '',

          }
        ],
        score: []
      }
    },
    created: function () {

    },
    mounted() {
      this.getStudentId(),
        this.getResultPages()
    },
    methods: {
      getStudentId: function () {
        this.studentId = this.$route.query.studentId
      },
      getResultPages: function () {
        this.axios.get('/page/listScore',
          {params: {'studentId': JSON.parse(window.localStorage.getItem('user')).id}}).then(res => {
          this.data = res.data.data


          this.chartData = {
            columns: ['score', 'date'],
            rows: []
          },
            this.chartSettings = {
              metrics: ['score'],
              dimension: ['date']
            }
          console.log("this is " + this.chartData)
          for (let i = 0; i < res.data.data.length; i++) {
            this.chartData.rows.push({'date': i + 1, 'score': res.data.data[i].score})

          }
        }).catch(err => {
          console.log(err)
          this.$notify({
            title: '数据获取失败',
            message: '服务器请求失败，请检查网络或联系管理员',
            type: "error"
          });
        })
      },
      getlinechart: function () {
        this.axios.get().then()
      }
    }
  }
</script>

<style scoped>
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
    width: 45%;
    height: auto;
    text-align: center;
    position: fixed;

  }

  .main {
    margin-top: 20px;
    width: 50%;
  }
</style>
