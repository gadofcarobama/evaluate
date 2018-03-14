import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const state = {
  // logined: false,
  // LoginedUser: {
  //   studentName: '',
  //   // studentId: ''
  // }
  user:''
}
const mutations = {
  LOGIN(state) {
    //将登录状态设置成已经登录
    // state.logined = true
    //将存进session的值进行解析分发
    // let user = JSON.parse(sessionStorage.getItem('user'))
    state.user=JSON.parse(window.localStorage.getItem('user'))
    //state.LoginedUser.studentName = user
    // state.LoginedUser.studentId = user.id
  }
}

const actions = {
  login(context) {
    context.commit('LOGIN')
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
// export default store
