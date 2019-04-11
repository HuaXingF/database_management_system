
import axios from 'axios'
import baseURL from '@/assets/js/config'

//初始化本周数据湖数据总量变化图
export const selectTotalDay = params => {
    const url = `${baseURL}/hive/selectTotalDay?name=total`
    return axios.post(url, { params: params })
}

//数据湖数据总量月变化趋势图
export const selectTotalMonth = params => {
    const url = `${baseURL}/hive/selectTotalMonth?name=total`
    return axios.post(url, { params: params })
}

//单表数据总量变化趋势 || 单表数据增量变化趋势 根据表名查询||周期查询
export const selectTotal = params => {
    const url = `${baseURL}/hive/${params.value2}?name=${params.value1}`
    return axios.post(url, { params: params })
}

