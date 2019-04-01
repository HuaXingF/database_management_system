
import axios from 'axios'
import baseURL from '@/assets/js/config'

//患者/医生/费用/mesh 数据历史关联信息统计 指定时间段内
///tabDimStatistic/selectDimRelatedCountSum/
export const selectDimRelatedCountSum = params => {
    const url = `${baseURL}/tabDimStatistic/selectDimRelatedCountSum?fDimId=${params.fDimId}&&startTime=${params.startTime}&&endTime=${params.endTime}`
    return axios.post(url, { params: params })
}
