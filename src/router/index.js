import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/TheLogin'
import Container from '@/container/Container'
import board from '@/views/board'
import users from '@/views/users/user'
import teacher from '@/views/users/teacher'
import records from '@/views/records'
import configs from '@/views/configs/grademanage'
import classmanage from '@/views/configs/classmanage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'Container',
      component: Container,
      children: [
        {
          path: '/',
          name: '看板管理',
          component: board
        },
        {
          path: '/user',
          name: '用户管理',
          component: users,
        },
        {
          path: '/teacher',
          name: '教师管理',
          component: teacher,
        },
        {
          path: '/',
          name: '档案管理',
          component: records
        },
        {
          path: '/grademanage',
          name: '年级管理',
          component: configs
        },
        {
          path: '/classmanage',
          name: '班级管理',
          component: classmanage
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }

  ]
})
