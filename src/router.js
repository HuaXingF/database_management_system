import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home/home'

Vue.use(Router)

export default new Router({
    mode: 'hash',
    base: process.env.BASE_URL,
    linkActiveClass: 'is-active',
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
            flagHidden: false,
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
            flagHidden: false,
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
            flagHidden: false,
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
            flagHidden: false,
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
            flagHidden: false,
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
            flagHidden: false,
            children: [
                {
                    path: '/SystemDictionary',
                    name: '字典规范',
                    component: () => import('./views/System-dictionary/SystemDictionary.vue')
                }
            ]
        },

        // {
        //   path: 'SystemAddRule',
        //   name: '新增数据规则',
        //   component: () => import('./views/SystemAddRule')
        // }

        {
            path: '/',
            name: '',
            iconCls: 'indexingCheck',
            component: Home,
            leaf: true,
            flagHidden: false,
            children: [
                {
                    path: '/SystemETL',
                    name: 'ETL信息监控',
                    component: () => import(/* webpackChunkName: "indexingCheck" */ '@/views/SystemETL/SystemETL.vue')
                }
            ]
        },
        // {
        //   path: '/',
        //   name: '',
        //   iconCls: 'indexingCheck',
        //   component: Home,
        //   leaf: true,
        //   flagHidden: true,
        //   children: [
        //     {
        //       path: '/SystemAddRule',
        //       name: '新增数据规则',
        //       component: () => import('./views/SystemAddRule/SystemAddRule.vue')
        //     }
        //   ]
        // },
        /*{
            path: '/',
            name: '数据规则历史信息统计',
            iconCls: 'indexingCheck',
            component: Home,
            flagHidden: false,
            children: [
                {
                    path: '/SystemRuleHistoryData',
                    name: '数据规则历史统计信息(数据库)',
                    component: () => import('./views/SystemRuleHistory/SystemRuleHistoryData.vue')
                },
                {
                    path: '/SystemRuleHistoryTable',
                    name: '数据规则历史统计信息(表)',
                    component: () => import('./views/SystemRuleHistory/SystemRuleHistoryTable.vue')
                },
                {
                    path: '/SystemRuleHistoryStr',
                    name: '数据规则历史统计信息(字段)',
                    component: () => import('./views/SystemRuleHistory/SystemRuleHistoryStr.vue')
                },
            ]
        },*/
        {
            path: '/',
            name: '',
            iconCls: 'indexingCheck',
            component: Home,
            leaf: true,
            flagHidden: false,
            children: [
                {
                    path: '/SystemRule',
                    name: '数据规则管理',
                    component: () => import(/* webpackChunkName: "indexingCheck" */ '@/views/indexing-check/indexing-check.vue')
                }
            ]
        },
        {
          path: '/',
          name: '数据规则历史信息统计',
          iconCls: 'indexingCheck',
          component: Home,
          flagHidden: false,
          children: [
            {
              path: '/SystemRuleHistoryData',
              name: '数据规则历史统计信息(数据库)',
              component: () => import('./views/SystemRuleHistory/SystemRuleHistoryData.vue')
            },
            {
              path: '/SystemRuleHistoryTable',
              name: '数据规则历史统计信息(表)',
              component: () => import('./views/SystemRuleHistory/SystemRuleHistoryTable.vue')
            },
            {
              path: '/SystemRuleHistoryStr',
              name: '数据规则历史统计信息(字段)',
              component: () => import('./views/SystemRuleHistory/SystemRuleHistoryStr.vue')
            },
          ]
        },
    ]
})
