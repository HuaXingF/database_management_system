
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
