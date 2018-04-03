<template>
  <div id="app">
    <!--<Menu></Menu>-->
    <div class="content">
      <router-view/>
    </div>
    <div class="footer">
      <div class="contain">
        <div class="main">
          <div class="text">
            <p>版权所有 中北大学软件学院&nbsp;&nbsp;&nbsp;&nbsp;综合科：0351-3924578&nbsp;&nbsp;&nbsp;&nbsp;教学科：0351-3925275&nbsp;&nbsp;&nbsp;&nbsp;学生科、团委：0351-3924613&nbsp;&nbsp;&nbsp;&nbsp;科研与对外合作科：0351-3924595</p>
            <p>邮箱：sti@nuc.edu.cn&nbsp;&nbsp;&nbsp;&nbsp;本站由中北大学软件学院维护&nbsp;&nbsp;&nbsp;&nbsp;
              <!-- <a href="#" target="_blank">后台管理</a> -->
            </p>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>
<script>
  export default {
    name: 'app',
    data() {
      // eventHub: new Vue()
    },
    methods: {},
    components: {
      // Menu,
      //Login
    }
  }
</script>
<style scoped>
  html, body {
    height: 100%;
  }
  .content {
    min-height: calc(100vh - 83px);
    /*margin-bottom: 83px;*/
  }
  .footer {
    height: 83px;
    width: 100%;
    background-color: black;
    /*position: fixed;*/
  }
  .main{
    /*width: 1200px;*/
    text-align: center;
    line-height: 35px;
    color: #fff;
    font-size: 12px;

  }

</style>
