<template>
    <div class="result-page">
      <Menu></Menu>
     <el-card class="msg">历史考试结果展示</el-card>
      <el-col :span="14">
      <div v-for="item in data" class="card">
        <el-card>
         <div> 试卷编号：{{item.pagesId}}</div>
          <div>分数：{{item.score}}</div>
          <!--<div>考试时间：{{item.time}}</div>-->
          <div>试卷详情：<router-link :to="{path:'detail',query:{pageId:item.pagesId,studentId:item.studentId}}"><el-button>详情</el-button></router-link></div>
        </el-card>
      </div>
      </el-col>
      <el-col :span="10">
      <el-card class="line-chart" >
        <div class="t4">
          得分趋势<ve-line :data="chartData" :settings="chartSettings" ></ve-line>
        </div>
      </el-card>
      </el-col>
    </div>
</template>

<script>
    import Menu from './Menu'
    export default {
        name: "result-page",
      components:{
        Menu
      },
         data() {
          return{
          studentId:0,
            data:[
              {
                pagesId: '',
                studentId:'',
                score:'',
                time:''
              }
            ],
            score:[]
         }
        },
      created: function () {

      },
      mounted() {
        this.getstudentId(),
          this.getResultPages()
    },
        methods:{
          getstudentId:function () {
            // let newObj={}
            // newObj.studentId=this.$route.query.studentId
            // this.data.push(newObj)
            // console.log('result studentId is::'+this.studentId)
            this.studentId=this.$route.query.studentId
            console.log('result studentId is :'+this.studentId)
          },
          getResultPages:function () {
            this.axios.get('/page/listScore',
              {params:{'studentId':JSON.parse(window.localStorage.getItem('user')).id}}).
            then(res=> {
              console.log(res)
              this.data=res.data.data
              for (let i=0;i<res.data.data.length;i++){
              this.score.push(res.data.data[i].score)
                this.chartData = {
                  columns: ['score'],
                  rows: []
                },
                  this.chartSettings = {
                    metrics: ['score'],
                    dimension: ['date']
                  }
                  for(let i=1;i<=this.score.length;i++){
                  var newObj={}
                  newObj.score=this.score[i]
                    newObj.date=i
                   this.chartData.rows.push(newObj)
                  }
             // console.log('this.score is::'+this.score)}
              // for(let i=0;i<this.data.length;i++){
              //   let newObj={}
              //   var time=res.data.data[i].time
              //   var localTime=new Date(time).toLocaleString()
              //   newObj.localTime=localTime
              //   this.data.push(newObj)
              // }
            }
            }).
            catch(err=> {
              console.log(err)
            })
          },
          // details: function () {
          //   this.$router.push({path:'',query:{studentId:this.studentId}})
          // }
          getlinechart: function () {
            this.axios.get().then()
          }
        }
    }
</script>

<style scoped>
.msg{
  text-align: center;
  margin-top: 5px;

}
  .result-page{
    background-color: pink;
  }
  .card{
    width: 300px;
    margin-left: 300px;
  }
  .line-chart{
    width: 400px;
    height: auto;
  text-align: center;
    position: fixed;


  }
</style>
