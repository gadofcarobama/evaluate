<template>
  <div class="pagescore">
    <el-card class="box-card" id="t1">
       2018年JavaEE成绩分析
    </el-card>
    <el-card >

      <div class="t2">
      <div class="t1">试卷得分</div>
      <el-progress type="circle" :percentage="65" class="round"></el-progress>
      <div class="core">65分</div>
      </div>
      <div class="t4">
        得分趋势<ve-line :data="chartData" :settings="chartSettings" ></ve-line>
      </div>
      <table class="x">
        <tr>
          <td class="el-icon-view">排名</td><td><font color="blue">65</font>名</td>
        </tr>
        <tr>
          <td class="el-icon-time">答题时间</td><td><font color="blue">55/120</font></td>
        </tr>
        <tr>
          <td class="el-icon-document">答题量</td><td><font color="blue">22/22</font></td>
        </tr>
        <tr>
          <td class="el-icon-menu">平均分</td><td><font color="blue">70</font></td>
        </tr>
      </table>

    </el-card>
    <el-card>
      <div class="y"><el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="type"
          label="试题类型"
          width="180">
        </el-table-column>
        <el-table-column
          prop="truth"
          label="做对试题"
          width="180">
        </el-table-column>
        <el-table-column
          prop="false"
          label="做错试题">
        </el-table-column>
        <el-table-column
          prop="notdone"
          label="未做的题">
        </el-table-column>

        <el-table-column
          prop="accuracy"
          label="正确率">
        </el-table-column>
      </el-table>
      </div>
    </el-card>
  </div>
  </template>
<script>
    import ElCard from "element-ui/packages/card/src/main";

    export default {
      data() {
        return{
          tableData: [{
            type: '单选题',
            truth: '4',
            false: '6',
            notdone:'0',
            accuracy:'40%'
          }, {
            type: '填空题',
            truth: '3',
            false: '2',
            notdone:'0',
            accuracy:'60%'
          }, {
            type: '简答题',
            truth: '3',
            false: '2',
            notdone:'0',
            accuracy:'60%'
          }, {
            type: '程序题',
            truth: '0',
            false: '2',
            notdone:'0',
            accuracy:'0%'
          }]
        }

      },
      created: function () {
        this.chartData = {
          columns: ['成绩'],
          rows: [
            {'成绩':0,'日期':0},
            {'成绩':40,'日期':1},
            {'成绩':78,'日期':2},
            {'成绩':57,'日期':3},
            {'成绩':90,'日期':4},
            {'成绩':62,'日期':5},
          ]
        },
        this.chartSettings = {
          metrics: ['成绩'],
          dimension: ['日期']
        }
      },


      components: {ElCard},
      name: "page-score"
    }
</script>

<style scoped>

    #t1{
      text-align: center;
      margin-top: 50px;
    }
  .round{
    margin-top: 25px;
  }
 .core{
   margin-top: 25px;
   margin-left: 50px;
 }

  .t2{
    float: left;
  }
  .t4{
  width: 250px;
    height: 250px;
    float: left;
    margin-left: 650px;
  }
  .el-icon-view{
    float: left;
    margin-left: 350px;
    font-size: 14px;

  }
  .el-icon-time{
   margin-left: 350px;
    font-size: 14px;
  }
    .el-icon-document{
      margin-left: 350px;
      font-size: 14px;
    }
  .el-icon-menu{
    margin-left: 350px;
    font-size: 14px;
  }

  /*.x{*/
    /*margin-bottom: 250px;*/
     /*}*/
    /*.y{*/
      /*margin-top: 100px;*/
           /*}*/

</style>
