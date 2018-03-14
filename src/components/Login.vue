<template>
  <div>
    <Menu></Menu>
    <el-row>
      <el-col :span="16">
        <div id="img"></div>
      </el-col>
      <el-col :span="8">
        <div>
          <el-card class="box-card" id="login">
            <div v-show="msg">您输入的用户名或密码错误</div>
            <el-input placeholder="请输入用户名：" v-model="username" class="username" v-on:focus="errmiss">
              <template slot="prepend">用户名：</template>
            </el-input>
            <el-input placeholder="请输入密码：" class="password" v-model="password" v-on:focus="errmiss" type="password">
              <template slot="prepend">密码：&nbsp&nbsp&nbsp</template>
            </el-input>
            <div v-show="notnull">用户名或密码不能为空</div>
            <el-button class="el-button--primary" v-on:click="console">登录</el-button>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
 <script>
  import ElCard from "element-ui/packages/card/src/main";
  import store from '../vuex/store.js'
  import Menu from './Menu'
  export default {
    mounted() {
      //window.addEventListener()
    },
    components: {
      ElCard,
      Menu
    },
    created() {
      console.log(this.user.id)
      if (this.user.id) {
        this.$router.push({path: '/pageIndex', query: {idclass: this.user.classId, studentId: this.user.id}})
        console.log("a")
      }
      console.log("ab")

    },
    name: "login",
    data() {
      return {
        msg: false,
        username: '',
        password: '',
        notnull: false,
        classId: '',

      }
    }
    ,
    methods: {
      errmiss: function () {
        if (this.msg == true || this.notnull == true) {
          this.msg = false
          this.notnull = false
        }
      }
      ,
      console: function () {
        // console.log(this.username)
        // alert(this.username)
        if (this.username == '' || this.password == '') {
          this.notnull = true;
        } else {
          this.axios.post('/user/login', {
              "username": this.username,
              "password": this.password
            }, {emulateJSON: true}
          ).then(res => {
            console.log(res);
            console.log(res.data.code);
            if (res.data.code == 200) {
              let classId = res.data.data.classId
              let studentId = res.data.data.id
              let studentName = res.data.data.name
              console.log('studentName::' + studentName)
              // console.log('classId::'+classId)
              // console.log('studentId::'+studentId)
              // console.log('thisclassId::'+this.classId)可以使用了
              window.localStorage.setItem('user', JSON.stringify(res.data.data))
              //分发登录的action
              store.dispatch("login")
              //this.$router.replace('/eventHub')

              this.$router.push({path: '/pageIndex', query: {idclass: classId, studentId: studentId}})
            } else {
              this.msg = true;
            }
          }).catch(err => {
            console.log(err)
          })
        }
      }
    }
    ,
    computed: {
      user() {
        return JSON.parse(window.localStorage.getItem('user') || '[]')
      }
    }
  }
</script>

<style scoped>
  #login {
    width: 350px;
    height: 350px;
    margin-top: 50px;
    margin-left: 870px;
  }

  .password {
    margin-top: 10px;
  }

  .el-button--primary {
    float: right;
    margin-right: 10px;
    margin-top: 10px;
  }

  template {
    background-color: antiquewhite;
  }

  #img {
    margin-left: 50px;
    float: left;
    width: 800px;
    height: 355px;
    margin-top: 50px;
    position: fixed;
    background-image: url("http://img.zcool.cn/community/0142135541fe180000019ae9b8cf86.jpg@1280w_1l_2o_100sh.png");
    background-color: red;
  }
</style>
