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
                    component: () => import(/* webpackChunkName: "SystemTime" */ '@/views/SystemTime/SystemTime.vue')
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
                    component: () => import(/* webpackChunkName: "SystemDataLake" */ '@/views/SystemDataLake/SystemDataLake.vue')
                }
            ]
        },
        {
            path: '/',
            name: '核心数据库数据监控',
            iconCls: 'messageSearch',
            component: Home,
            flagHidden: false,
            children: [
                {
                    path: '/SystemKernelData',
                    name: '核心数据库总量监控',
                    component: () => import(/* webpackChunkName: "SystemKernelData" */ '@/views/SystemKernelData/SystemKernelData.vue')
                },
                {
                    path: '/SystemKernelMonitorData',
                    name: '核心数据库数据监控(库)',
                    component: () => import(/* webpackChunkName: "SystemKernelMonitorData" */ '@/views/SystemKernelData/SystemKernelMonitorData.vue')
                },
            ]
        },

        {
            path: '/',
            name: '数据关联信息监控',
            iconCls: 'expertLink',
            component: Home,
            flagHidden: false,
            children: [
                {
                    path: '/SystemAssociation',
                    name: '数据当前关联信息监控',
                    component: () => import(/* webpackChunkName: "SystemAssociation" */ '@/views/SystemAssociation/SystemAssociation.vue')
                },
                {
                    path: '/SystemHistory',
                    name: '数据历史关联信息监控',
                    component: () => import(/* webpackChunkName: "SystemHistory" */ '@/views/SystemHistory/SystemHistory.vue')
                },
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
                    path: '/SystemETL',
                    name: 'ETL信息监控',
                    component: () => import(/* webpackChunkName: "SystemETL" */ '@/views/SystemETL/SystemETL.vue')
                }
            ]
        },
        {
            path: '/',
            name: '数据规则管理与监控',
            iconCls: 'indexingCheck',
            component: Home,
            flagHidden: false,
            children: [
                {
                    path: '/SystemRule',
                    name: '数据规则管理',
                    component: () => import(/* webpackChunkName: "SystemRule" */ '@/views/SystemRule/SystemRule.vue')
                },
                {
                    path: '/SystemStatistics',
                    name: '数据规则当前信息统计',
                    component: () => import(/* webpackChunkName: "SystemStatistics" */ '@/views/SystemStatistics/SystemStatistics.vue')
                },
                {
                    path: '/SystemRuleHistoryData',
                    name: '数据规则历史信息统计',   //数据规则历史统计信息(数据库)
                    component: () => import(/* webpackChunkName: "SystemRuleHistoryData" */ '@/views/SystemRuleHistory/SystemRuleHistoryData.vue')
                },
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
                    component: () => import(/* webpackChunkName: "SystemDictionary" */ '@/views/SystemDictionary/SystemDictionary.vue')
                }
            ]
        },
        {
            path: '/',
            name: '',
            iconCls: '',
            component: Home,
            leaf: true,
            flagHidden: true,
            children: [
                {
                    path: '/SystemRuleHistoryTable',
                    name: '数据规则历史统计信息(表)',
                    component: () => import(/* webpackChunkName: "SystemRuleHistoryTable" */ '@/views/SystemRuleHistory/SystemRuleHistoryTable.vue')
                }
            ]
        },
        {
            path: '/',
            name: '',
            iconCls: '',
            component: Home,
            leaf: true,
            flagHidden: true,
            children: [
                {
                    path: '/SystemRuleHistoryStr',
                    name: '数据规则历史统计信息(字段)',
                    component: () => import(/* webpackChunkName: "SystemRuleHistoryStr" */ '@/views/SystemRuleHistory/SystemRuleHistoryStr.vue')
                }
            ]
        },

        {
            path: '/',
            name: '',
            iconCls: '',
            component: Home,
            leaf: true,
            flagHidden: true,
            children: [
                {
                    path: '/SystemKernelMonitorTable',
                    name: '核心数据库数据监控(表)',
                    component: () => import(/* webpackChunkName: "SystemKernelMonitorTable" */ '@/views/SystemKernelData/SystemKernelMonitorTable.vue')
                }
            ]
        },
    ]
})
