import axios from 'axios'
import baseURL from '@/assets/js/config'

//当前各表据关联总量排行榜
export const selectTableSumDesc = params => {
    const url = `${baseURL}/tabDimStatistic/selectrelatedCountSumDesc`
    return axios.post(url, { params: params })
}

//当前 患者/医生/费用/mesh 关联总量比例
export const selectDimRatio = params => {
    const url = `${baseURL}/tabDimStatistic/selectDimRatio?fDimId=${params}`
    return axios.post(url, { params: params })
}
