<template>
  <div class="score">
    <p> 班级成绩平局分</p>
    <ve-histogram :data="chartData" :settings="chartSettings"></ve-histogram>
  </div>
</template>
<script>
  export default {
    name: "score",
    data: {
      return: {
        pageId:'1',
        studentId:'14'
      }
    },
    mounted:function () {
      this.axios.get('http://http://193.112.6.35:8080',
        {params:{'pageId':this.pageId,'studentId':this.studentId}}).then(
           res=>{
             console.log(res)
           }
      ).catch(
        err=>{
          console.log(err)
        }
      )
    },
    created: function () {
      this.chartData = {
        columns: ['考试名称', 'Y01', 'Y02', 'Y03', 'Y04'],
        rows: [
          {'考试名称': '第一章测试', 'Y01': 88, 'Y02': 89, 'Y03': 87, 'Y04': 86},
          {'考试名称': '第二章测试', 'Y01': 87, 'Y02': 85, 'Y03': 85, 'Y04': 84},
          {'考试名称': '第三章测试', 'Y01': 82, 'Y02': 85, 'Y03': 83, 'Y04': 85},
          {'考试名称': '第四章测试', 'Y01': 89, 'Y02': 85, 'Y03': 83, 'Y04': 84}
        ]
      }
      this.chartSettings = {
        label: {
          normal: {show: true, position: 'top'}
        }
      }
    }
  }
</script>

<style scoped>

</style>
