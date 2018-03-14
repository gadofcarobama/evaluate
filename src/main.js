// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VCharts from 'v-charts'
Vue.config.productionTip = false
Vue.prototype.axios = axios
Vue.use(ElementUI)
Vue.prototype.$axios = axios.create({
  baseURL: 'http://193.112.6.35:8080/'
})
axios.defaults.baseURL='http://193.112.6.35:8080/'
Vue.use(VCharts)
Vue.use(axios)
// router.beforeEach((to,next)=>{
//   if(to.path=='/pageIndex'&&store.state.user!==null){
//     router.replace('/pageIndex')
//   }else {
//     next.path=='/studentLogin'
//   }
// })
new Vue({
  el: '#app',
  router,
  // vuex,
  // store,
  template: '<App/>',
  components: {App}
})

