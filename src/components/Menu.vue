<template>
  <div id="menu">
    <el-menu :default-active="activeIndex"  mode="horizontal"  router=true background-color="black">
      <el-menu-item class="left" index="/index">
        <img src="../assets/50xlogo.png"/>
      </el-menu-item>
      <el-menu-item class="left" v-on:click="pushpageIndex" index="/">
        <div>考试信息</div>
      </el-menu-item>
      <el-menu-item class="left" v-on:click="pushpageResult" index="/resultPage">
        <div>考试成绩分析</div>
      </el-menu-item>

      <!--<el-menu-item index="/index"  class="right" v-if="user.name" v-on:click="loginout">-->
       <!--<div>注销</div>-->
      <!--</el-menu-item>-->

      <el-menu-item class="right" index="/000">
        <!--<div v-if="user.name">{{user.name}}</div>-->
      </el-menu-item>
      <el-menu-item index="/studentLogin" class="right">
        <div v-if="!user.name">登录</div>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<style scoped>
.right {
  float: right;
}

</style>

<script scoped>

// import Login from './Login'
import store from "../vuex/store";
import index from 'vue';

export default {
  data() {
    return {
      index: "/pageIndex",
      flag: false,
      flag1: true,
      // studentName:'',
      items: [],
      resultPage: "/resultPage"
    };
  },
  created() {
    if (!this.user.name) {
      this.index = "/studentLogin";
      this.resultPage = "/studentLogin";
    }
  },
  methods: {
    pushpageIndex: function() {
      this.$router.replace(this.index);
    },
    pushpageResult: function() {
      this.$router.replace(this.resultPage);
    },
    // handleSelect(key, keyPath) {
    //   this.$router.replace(this.index);
    // },
    loginout: function() {
      window.localStorage.removeItem("user");
      this.$router.push({path: this.index})
    },
    reloade: function() {
      // location.reload()
    }
  },
  components: {

    // Login
    store
  },
  computed: {
    user() {
      return JSON.parse(window.localStorage.getItem("user") || "[]");
      // return this.$store.state.user
    }
  }
};
</script>
