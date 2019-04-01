
import axios from 'axios'
import baseURL from '@/assets/js/config'

// 数据湖当前数据统计
export const select_shujuhu = params => {
    const url = `${baseURL}/hive/selectDayByTableName?tableNameArr=employee_bucket_orc_test,total`
    return axios.post(url, { params: params })
}
// 核心数据库当前数据统计
export const select_shujuku = params => {
    const url = `${baseURL}/tabAllRows/selectByBase`
    return axios.post(url, { params: params })
}
// 当前ETL流程状态分布统计
export const select_containerCircle = params => {
    const url = `${baseURL}/pipelien/queryPopelienCountAndStatus`
    return axios.post(url, { params: params })
}
// 当前各表数据合格率统计
export const select_hegelu = params => {
    const url = `${baseURL}/ruleApplyResult/selectRegularByTable2`
    return axios.post(url, { params: params })
}
// 当前所有表关联成功比例
export const select_conGetAllTab = params => {
    const url = `${baseURL}/relationShip/selectRate`
    return axios.post(url, { params: params })
}
// 当前所有表关联成功比例
export const selectotle_week = params => {
    const url = `${baseURL}/tabAllRows/selectTotalDay?tableName=total`
    return axios.post(url, { params: params })
}

