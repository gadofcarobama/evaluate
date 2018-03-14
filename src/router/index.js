import Vue from 'vue'
import Router from 'vue-router'
import Course from '@/components/Course'
import Index from '@/components/Index'
import Score from '@/components/Score'
import Course2 from '@/components/Course2'
import Course3 from '@/components/Course3'
import Course4 from '@/components/Course4'
import Exam from '@/components/Exam'
import PageScore from '@/components/PageScore'
import Success from '@/components/Success'
import Create from '@/components/Create'
import Combine from '@/components/Combine'
import TeacherExam from '@/components/TeacherExam'
import CreateTest from '@/components/CreateTest'
import TeacherIndex from '@/components/TeacherIndex'
import Login from '@/components/Login'
import GetPageById from '@/components/GetPageById'
import PageIndex from '@/components/PageIndex'
import PageOne from '@/components/PageOne'
import ResultPage from '@/components/ResultPage'
import Detail from '@/components/Detail'
import EventHub from '@/components/EventHub'
import Blank from '@/components/Blank'
import App from '../App'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: '',
      component: Login
    }, {
      path: '/course',
      component: Course
    }, {
      path: '/request',
      component: Request
    }, {
      path: '/score',
      component: Score
    },
    {
      path: '/course2',
      component: Course2
    },
    {
      path: '/course3',
      component: Course3
    },
    {
      path: 'course4',
      component: Course4
    },

    {
      path: '/exam/:id',
      component: Exam
    },
    {
      path: '/pagescore',
      component: PageScore
    },

    {
      path: '/success',
      component: Success
    },
    {
      path: '/create',
      component: Create
    },
    {
      path: '/combine/:examName/:course',
      component: Combine
    },
    {
      path: '/teacherExam/:examName/:course',
      component: TeacherExam
    },
    {path: '/createtest/:examName',
      component:CreateTest
    },
    {
      path: '/teacherIndex',
      component: TeacherIndex
    },
    {
      path:'/studentLogin',
      name: "studentLogin",
      component:Login
    },
    {
      path:'/getPageById',
      component:GetPageById
    },
    {
      path:'/pageIndex',
      component:PageIndex,
      // meta: {allowBack: false}
    },
    {
      path:'/pageOne',
      component:PageOne
    },
    {
      path:'/resultPage',
      component:ResultPage
    },
    {
      path:'/detail',
      component:Detail
    },
    {
      path:'/eventHub',
      component:EventHub
    },
    {
      path:'/blank',
      component:Blank
    }
  ]
})
