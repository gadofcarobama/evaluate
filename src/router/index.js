import Vue from 'vue'
import Router from 'vue-router'
import Success from '@/components/Success'
import Login from '@/components/Login'
import PageIndex from '@/components/PageIndex'
import PageOne from '@/components/PageOne'
import ResultPage from '@/components/ResultPage'
import Detail from '@/components/Detail'

Vue.use(Router)
export default new Router({
  mode:'history',
  routes: [
    {
      path:'*',
      redirect:'/pageIndex'
    },
    {
      path: '/',
      name: '',
      component: Login
    },
    {
      path: '/success',
      component: Success
    },
    {
      path: '/studentLogin',
      name: "studentLogin",
      component: Login
    },
    {
      path: '/pageIndex',
      component: PageIndex,
      // meta: {allowBack: false}
    },
    {
      path: '/pageOne',
      component: PageOne
    },
    {
      path: '/resultPage',
      component: ResultPage
    },
    {
      path: '/detail',
      component: Detail
    }
  ]
})
