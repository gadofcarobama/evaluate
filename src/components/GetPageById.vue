<template>
  <div>
    <p>hello</p>
  </div>
</template>

<script>
    export default {
      data() {
        return{
          pageId:1,
          classId:14
        }
      },
        name: "get-page-by-id",
        mounted(){
          var nowTime=new Data()
          var now=nowTiem.getTime()
          alert(now)
          this.axios.get(
            'http://193.112.6.35:8080/page/listPagesByClassId',
            {params:{
              'classId':this.classId
              }}
          ).then(
            res=>{
              console.log(res)

            }
          ).catch(
            err=>{
              console.log(err)
            }
          )
        //   this.axios.get(
        //     'http://http://193.112.6.35:8080/page/onePage',
        //   {params:
        //       {
        //         'pageId':this.pageId,
        //         'classId':this.classId
        //     }
        //   }
        //   ).then(res=>{
        //     console.log(res)
        //   })
        //     .catch(
        //     err=>{
        //       console.log(err)
        //     }
        //
        //   )
        }
    }
</script>

<style scoped>

</style>
