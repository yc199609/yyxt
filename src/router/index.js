import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

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
    component: Layout,
    redirect: '/dashboard',
    meta: { title: '首页', icon: 'component' },
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },
  {
    path: '/OperationSystem',
    component: Layout,
    name: 'OperationSystem',
    meta: { title: '业务系统', icon: 'nested' },
    children: [
      {
        path: 'organize',
        component: () => import('@/views/OperationSystem/organize'),
        name: 'Organize',
        meta: { title: '机构列表' }
      }
    ]
  },
  {
    path: '/systemSetup',
    component: Layout,
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
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
