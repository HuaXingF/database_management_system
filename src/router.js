import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home/home'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  linkActiveClass : 'is-active',
  routes: [
    {
      path: '/',
      redirect: '/SystemTime',
      hidden: true
    },
    {
      path: '/',
      name: '',
      iconCls: 'systemSetting',
      component: Home,
      leaf: true,
      children: [
        {
          path: '/SystemTime',
          name: '系统实时监控',
          component: () => import(/* webpackChunkName: "systemSetting" */ '@/views/system-setting/system-setting.vue')
        }
      ]
    },
    {
      path: '/',
      name: '',
      iconCls: 'medicalTheme',
      component: Home,
      leaf: true,
      children: [
        {
          path: '/SystemDataLake',
          name: '数据湖数据监控',
          component: () => import(/* webpackChunkName: "messageSearch" */ '@/views/medical-theme-list/medical-theme-list.vue')
        }
      ]
    },
    {
      path: '/',
      name: '',
      iconCls: 'messageSearch',
      component: Home,
      leaf: true,
      children: [
        {
          path: '/SystemKernelData',
          name: '核心数据库数据监控',
          component: () => import(/* webpackChunkName: "messageSearch" */ '@/views/message-search/message-search.vue')
        }
      ]
    },
    {
      path: '/',
      name: '',
      iconCls: 'expertLink',
      component: Home,
      leaf: true,
      children: [
        {
          path: '/SystemAssociation',
          name: '数据关联信息监控',
          component: () => import(/* webpackChunkName: "expertLink" */ '@/views/expert-link/expert-link.vue')
        }
      ]
    },
    {
      path: '/',
      name: '',
      iconCls: 'handleIndexing',
      component: Home,
      leaf: true,
      children: [
        {
          path: '/SystemHistory',
          name: '数据历史关联信息监控',
          component: () => import(/* webpackChunkName: "expertLink" */ '@/views/medical-theme-manage/medical-theme-manage.vue')
        }
      ]
    },
    {
      path: '/',
      name: '',
      iconCls: 'indexingCheck',
      component: Home,
      leaf: true,
      children: [
        {
          path: '/indexingCheck',
          name: '数据规则统计信息',
          component: () => import(/* webpackChunkName: "indexingCheck" */ '@/views/indexing-check/indexing-check.vue')
        }
      ]
    }
  ]
})