<template>
  <div class="userPop">
    <el-popover class="popover"
                ref="popover1"
                placement="bottom-start"
                width="auto"
                disable="true"
                trigger="hover">
      <div style="width: 180px;height: 110px">
        <div>
          <p class="headleft"><img src="../assets/userimg.jpg" alt="xxx" class="userimg">     &nbsp; {{username}}</p>

        </div>

        <div style="text-align: center;margin: 0px">
          <div class="contentLeft">
            <i class="el-icon-circle-check-outline"></i>
            <p>所获荣誉</p>
          </div>
          <div class="contentLeft">
            <i class="el-icon-document"></i>
            <p>所教课程</p>
          </div>
          <div class="contentLeft">
            <i class="el-icon-date"></i>
            <p>个人中心</p>
          </div>
        </div>
      </div>
    </el-popover>

    <el-button v-popover:popover1>{{username}}</el-button>
  </div>
</template>

<script>
  export default {
    name: "user-pop",
    data() {
      return {
        username: '胡毅',
      }
    },
    mounted(){
      this.emit()
    },
    methods:{
      emit:function () {
        this.$emit('getStudentName',this.studentName)
      }
    }
  }
</script>

<style scoped>
.popover{
  width: 800px;
}


  .contentLeft {
    float: left;
    width: 60px;
    height: 30px;

  }

  .userimg {
    margin-top: 0px;
    padding: 0px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

.el-button{
  border: 0px;
}

</style>
