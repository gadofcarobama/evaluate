<template>
    <div class="event-hub">
      <menu></menu>
      <login v-on:getStudentName="getStudentName"></login>
      学生姓名：{{this.studentName}}
    </div>
</template>

<script>
  import Menu from './Menu'
  import Login from './Login'
    export default {
        name: "event-hub",
      data (){
          return{
          studentName:''
          }
      },
      mounted() {
          this.getStudentName()
       // this.$on('getStudentName',function (studentName) {
       //   this.studentName=studentName
       //   console.log('this.studentName is ::'+this.studentName)
       // })
      },
      components:{
          Menu,
          Login
      },
      methods:{
        getStudentName (studentName) {
          console.log('aaa'+studentName)
          this.studentName=studentName
          console.log('ssss'+this.studentName)
        }
      }
    }
</script>

<style scoped>

</style>
