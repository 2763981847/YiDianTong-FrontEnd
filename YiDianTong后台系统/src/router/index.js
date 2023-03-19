import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },
  {
    path: '/hosp',
    name: '医院管理',
    alwaysShow: true,
    redirect: '/hosp/index',
    meta: { title: '医院管理', icon: 'el-icon-edit' },
    component: Layout,
    children: [
      {
        path: 'index',
        name: '医院管理',
        component: () => import('@/views/hosp'),
        meta: { title: '医院管理', icon: 'el-icon-edit' }
      },
      {
        path: 'detail',
        name: '医院详情页',
        component: () => import('@/views/hosp/detail'),
        meta: { title: '医院详情页', icon: 'el-icon-edit' },
        hidden: true
      },
      {
        path: 'schedule/:hoscode',
        name: '医院排班',
        component: () => import('@/views/hosp/schedule'),
        meta: { title: '医院排班', icon: 'el-icon-edit' },
        hidden: true
      },
      {
        path: 'set/index',
        name: '医院设置管理',
        component: () => import('@/views/hospSet'),
        meta: { title: '医院设置管理', icon: 'el-icon-edit' }
      },
      {
        path: 'set/add',
        name: '医院设置添加',
        component: () => import('@/views/hospSet/add'),
        meta: { title: '医院设置添加', icon: 'el-icon-edit' },
        hidden: true
      },
      {
        path: 'set/update/:id',
        name: '医院设置修改',
        component: () => import('@/views/hospSet/add'),
        meta: { title: '医院设置修改', icon: 'el-icon-edit' },
        hidden: true
      }
    ]
  },
  {
    path: '/cmn',
    component: Layout,
    name: '数据管理',
    alwaysShow: true,
    meta: { title: '数据管理', icon: 'example' },
    children: [
      {
        path: 'index',
        name: '数据字典',
        component: () => import('@/views/dict/index'),
        meta: { title: '数据字典', icon: 'form' }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/userInfo/list',
    name: 'userInfo',
    meta: { title: '用户管理', icon: 'table' },
    alwaysShow: true,
    children: [
      {
        path: 'userInfo/list',
        name: '用户列表',
        component: () => import('@/views/user/userInfo/list'),
        meta: { title: '用户列表', icon: 'table' }
      },
      {
        path: 'userInfo/details/:id',
        name: '用户详情',
        component: () =>import('@/views/user/userInfo/details'),
        meta: { title: '用户详情' },
        hidden: true
      },
      {
        path: 'userInfo/authList',
        name: '认证审批列表',
        component: () =>import('@/views/user/userInfo/authList'),
        meta: { title: '认证审批列表', icon: 'table' }
      }


    ]
  },
  {
    path: '/statistics',
    component: Layout,
    redirect: '/statistics/order/index',
    name: 'BasesInfo',
    meta: { title: '统计管理', icon: 'table' },
    alwaysShow: true,
    children: [
      {
        path: 'order/index',
        name: '预约统计',
        component: () =>import('@/views/statistics/order/index'),
        meta: { title: '预约统计' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
