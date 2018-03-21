<template>
  <div class="Login">
    <Menu></Menu>
    <el-row>
      <el-col :span="16">
        <div id="img"></div>
      </el-col>
      <el-col :span="8">
        <div>
          <el-card class="box-card" id="login">
            <div v-show="msg">您输入的学号或密码错误</div>
            <el-input placeholder="请输入用户名" v-model="username" class="username" v-on:focus="errmiss">
              <template slot="prepend">学&nbsp;&nbsp;&nbsp;号</template>
            </el-input>
            <el-input placeholder="请输入密码" class="password" v-model="password" v-on:focus="errmiss" type="password">
              <template slot="prepend">密&nbsp;&nbsp;&nbsp;码</template>
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
      if (this.user.id) {
        this.$router.push({path: '/pageIndex', query: {idclass: this.user.classId, studentId: this.user.id}})
      }
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
        if (this.msg === true || this.notnull === true) {
          this.msg = false
          this.notnull = false
        }
      }
      ,
      console: function () {
        // console.log(this.username)
        // alert(this.username)
        if (this.username === '' || this.password === '') {
          this.notnull = true;
        } else {
          this.axios.post('/user/login', {
              "username": this.username,
              "password": this.password
            }, {emulateJSON: true}
          ).then(res => {
            if (res.data.code === 200) {
              let classId = res.data.data.classId
              let studentId = res.data.data.id
              let studentName = res.data.data.name
              window.localStorage.setItem('user', JSON.stringify(res.data.data))
              //分发登录的action
              store.dispatch("login")
              this.$notify({
                title: '登录成功',
                message: '欢迎' + res.data.data.name + "登录",
                type: "success"
              })
              this.$router.push({path: '/pageIndex', query: {idclass: classId, studentId: studentId}})
            } else {
              this.msg = true;
            }
          }).catch(err => {
            this.$notify({
              title: '登录失败',
              message: '服务器请求失败，请检查网络或联系管理员',
              type: "error"
            });
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
  .Login {
    /*background-image: url("../assets/schoolLogo.jpg");*/
  }
  #login {
    width: 400px;
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
    height: 350px;
    margin-top: 50px;
    position: fixed;
    background-image: url("../assets/schoolLogo.jpg");
  }
</style>
