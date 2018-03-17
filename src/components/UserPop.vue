<template>
 <div class="userPop">
   <div class="bar" v-if="user.name">
     <el-button type="text" class="logout" v-on:click="logout">注销</el-button>
    <div class="user">
      <h3 v-text="user.name" class="userName">
      </h3>

     <ul>
      <li><p v-text="user.school" class="school"></p></li>
      <li><p v-text="user.major" class="major"></p></li>
     </ul>
      <p class="address" v-text="user.cenRegister"></p>
    </div>
   </div>
 </div>
</template>

<script>
    export default {
        name: "user-pop",
    computed:{
          user() {
            return JSON.parse(window.localStorage.getItem('user'))
          }
    },
    methods:{
      logout:function () {
        window.localStorage.removeItem('user')
        window.location.reload()

      }
    }
    }

</script>

<style scoped>
   .bar{
     background-image: url("../assets/temp1.png");
     width: 100%;
     height: 150px;
     background-size: cover;
     position: relative;
     margin: 0;
     padding: 0;
   }
  .userName{
    font-weight: 600;
    text-align: left;
    font-size: 24px;
    color: #FFF;
    margin-top: 0;
    line-height: 65px;
    padding-bottom: 0px;
    margin-bottom: 0px;
    margin-left: 300px;
  }
  .major{
    font-weight: 400;
    text-align: center;
    font-size: 15px;
    color: #FFF;
    margin-top: 0;
    line-height: 0px;
    margin-left: 50px;
  }
  .school{
    font-weight: 400;
    text-align: center;
    font-size: 15px;
    color: #FFF;
    margin-top: 0;
    line-height: 0px;

  }
 ul li{
   float: left;
   list-style: none;
 }
  ul{
    margin-left: 200px;
  }
  .address{
    margin-top: 35px;
    color: #FFF;
    margin-left: 270px;
  }
  .logout{
    font-size: 18px;
    color: red;
    float: right;
    margin-right: 20px;
  }

</style>
