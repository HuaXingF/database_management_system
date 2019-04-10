
import axios from 'axios'
import baseURL from '@/assets/js/config'

// 本周核心数据库数据总量变化图
export const selectotle_week = params => {
    const url = `${baseURL}/tabAllRows/selectTotalDay?name=total`
    return axios.post(url, { params: params })
}
//核心数据库数据总量月变化趋势图
export const selectotle_month = params => {
    const url = `${baseURL}/tabAllRows/selectTotalMonth?name=total`
    return axios.post(url, { params: params })
}
//核心库单表数据总量变化趋势
export const selectotle_trend = params => {
    const url = `${baseURL}/tabAllRows/${params.value1}?name=${params.value}`
    return axios.post(url, { params: params })
}
// 核心库表数据增量变化趋势
export const select_trend = params => {
    const url = `${baseURL}/tabAllRows/${params.value1}?name=${params.value}`
    return axios.post(url, { params: params })
}

// 核心数据库数据监控(库)
// 本周核心数据库中各库数据总量变化趋势图
export const SystemDataNowWeek = params => {
    const url = `${baseURL}/tabAllRows/selectAllBaseDay`
    return axios.post(url, { params: params })
}

// 核心数据库数据监控(库)
// 每月核心数据库中各库数据总量变化趋势图
export const SystemDataNowMonth = params => {
    const url = `${baseURL}/tabAllRows/selectAllBaseMonth`
    return axios.post(url, { params: params })
}

// 核心数据库数据监控(库)
// 本周核心数据库中各库数据增量比例图
export const SystemDataAddWeek = params => {
    const url = `${baseURL}/tabAllRows/selectAddWeekPie`
    return axios.post(url, { params: params })
}

// 核心数据库数据监控(表)
// 本周核心数据库中各表数据总量变化趋势图
export const SystemTableAllWeek = params => {
    const url = `${baseURL}/tabAllRows/selectAllTabDay?baseName=${params.baseName}`
    return axios.post(url, { params: params })
}

// 核心数据库数据监控(表)
// 每月核心数据库中各表数据总量变化趋势图
export const SystemTableAllMonth = params => {
    const url = `${baseURL}/tabAllRows/selectAllTabMonth?baseName=${params.baseName}`
    return axios.post(url, { params: params })
}