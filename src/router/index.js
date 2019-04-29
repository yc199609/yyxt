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
  },
  {
    path: '/OperationSystem',
    component: Layout,
    redirect: '/OperationSystem/organize',
    alwaysShow: true,
    name: 'OperationSystem',
    meta: { title: '业务系统', icon: 'nested' },
    children: [
      {
        path: 'organize',
        component: () => import('@/views/OperationSystem/organize'),
        name: 'Organize',
        meta: {
          title: '机构列表',
          affix: false,
          noCache: true
        }
      }
    ]
  },
  {
    path: '/systemSetup',
    component: Layout,
    alwaysShow: true,
    redirect: '/systemSetup/dataBase',
    name: 'systemSetup',
    meta: { title: '系统设置', icon: 'form' },
    children: [
      {
        path: 'dataBase',
        component: () => import('@/views/systemSetup/dataBase/index.vue'),
        name: 'dataBase',
        meta: { title: '数据库设置' }
      },
      {
        path: 'system',
        component: () => import('@/views/systemSetup/system/index.vue'),
        name: 'system',
        meta: { title: '系统参数' }
      }
    ]
  },
  {
    path: '/demo',
    component: Layout,
    alwaysShow: true,
    name: 'demo',
    meta: { title: 'demo', icon: 'nested' },
    children: [
      {
        path: '',
        component: () => import('@/views/demo'),
        name: 'demo',
        meta: {
          title: 'demo'
        }
      }
    ]
  },
  {
    path: '/Hr',
    alwaysShow: true,
    redirect: '/Hr/staff',
    component: Layout,
    name: 'Hr',
    meta: { title: '人事管理', icon: 'user' },
    children: [
      {
        path: 'staff',
        component: () => import('@/views/Hr/staff'),
        name: 'staff',
        meta: {
          title: '员工管理'
        }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
