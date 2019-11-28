import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../layout'

/**
* hidden: true if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true if set true, will always show the root menu, whatever its child routes length
* if not set alwaysShow, only more than one route under the children
* it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name' the name is used by <keep-alive> (must set!!!)
* meta : {
title: 'title' the name show in subMenu and breadcrumb (recommend set)
icon: 'svg-name' the icon show in the sidebar
breadcrumb: false if false, the item will hidden in breadcrumb(default is true)
}
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  {
    path: '/',
    fullPath: '/dashboard',
    component: Layout,
    redirect: '/dashboard',
    name: '/dashboard',
    meta: {
      roles: ['test2', '18888888888'], // 设置该路由进入的权限，支持多个权限叠加
      title: '首页',
      icon: 'home'
    },
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  }
]

export const asyncRouterMap = [
  {
    path: '/OperationSystem',
    component: Layout,
    redirect: '/OperationSystem/organize',
    alwaysShow: true,
    name: 'OperationSystem',
    meta: { title: '业务系统', icon: 'nested', code: '9200' },
    children: [
      {
        path: 'organize',
        component: () => import('@/views/OperationSystem/organize'),
        name: 'organize',
        meta: { title: '机构列表', icon: 'organize', code: '920001' }
      },
      {
        path: 'fnTree',
        component: () => import('@/views/OperationSystem/fnTree'),
        name: 'fnTree',
        meta: { title: '功能树', icon: 'organize', code: '920001' }
      }
    ]
  },
  {
    path: '/systemSetup',
    component: Layout,
    alwaysShow: true,
    redirect: '/systemSetup/dataBase',
    name: 'systemSetup',
    meta: { title: '系统设置', icon: 'form', code: '9300' },
    children: [
      {
        path: 'dataBase',
        component: () => import('@/views/systemSetup/dataBase/index.vue'),
        name: 'dataBase',
        meta: { title: '数据库设置', icon: 'dataBase', code: '930001' }
      },
      {
        path: 'system',
        component: () => import('@/views/systemSetup/system/index.vue'),
        name: 'system',
        meta: { title: '系统参数', icon: 'system', code: '930002' }
      }
    ]
  },
  {
    path: '/personnel',
    alwaysShow: true,
    redirect: '/personnel/employees',
    component: Layout,
    name: 'personnel',
    meta: { title: '人事管理', icon: 'user', code: '9400' },
    children: [
      {
        path: 'employees',
        component: () => import('@/views/personnel/employees/index.vue'),
        name: 'employees',
        meta: { title: '员工', icon: 'employees', code: '940001' }
      },
      {
        path: 'department',
        component: () => import('@/views/personnel/department'),
        name: 'department',
        meta: { title: '部门', icon: 'department', code: '940002' }
      },
      {
        path: 'Role',
        component: () => import('@/views/personnel/role'),
        name: 'Role',
        meta: { title: '角色', icon: 'role', code: '940003' }
      }
      // {
      //   path: 'test',
      //   component: () => import('@/views/personnel/test'),
      //   name: 'test',
      //   meta: { title: '调试用的页面', icon: 'test' }
      // }
    ]
  },
  {
    path: '/instructions',
    alwaysShow: true,
    redirect: '/instructions/',
    component: Layout,
    name: 'instructions',
    meta: { title: '指令管理', icon: 'user', code: '9200' },
    children: [
      {
        path: 'type',
        component: () => import('@/views/instructions/type/index.vue'),
        name: 'type',
        meta: { title: '指标类型', icon: 'employees', code: '9200' }
      },
      {
        path: 'field',
        component: () => import('@/views/instructions/field/index.vue'),
        name: 'field',
        meta: { title: '指令指标', icon: 'field', code: '9200' }
      }
    ]
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
