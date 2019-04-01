
import axios from 'axios'
import baseURL from '@/assets/js/config'

//初始化本周数据湖数据总量变化图
///hive/selectTotalDay?tableName=total
export const selectTotalDay = params => {
    const url = `${baseURL}/hive/selectTotalDay?tableName=total`
    return axios.post(url, { params: params })
}
//数据湖数据总量月变化趋势图
//hive/selectTotalMonth?tableName=total
export const selectTotalMonth = params => {
    const url = `${baseURL}/hive/selectTotalMonth?tableName=total`
    return axios.post(url, { params: params })
}
//单表数据总量变化趋势 || 单表数据增量变化趋势 根据表名查询||周期查询
///hive/selectTotalWeek?tableName=
export const selectTotal = params => {
    //console.log(params,"0000000000000000")
    const url = `${baseURL}/hive/${params.value2}?tableName=${params.value1}`
    return axios.post(url, { params: params })
}

