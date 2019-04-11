
import axios from 'axios'
import baseURL from '@/assets/js/config'

//ETL信息监控
export const selectOneTimeAtamp = params => {
    const url = `${baseURL}/pipelien/selectOneTimeAtamp?fPipelineId=${params.fPipelineId}&&startTime=${params.startTime}&&endTime=${params.endTime}`
    return axios.post(url, { params: params })
}

//查询所有管道id
export const selectAllId = params => {
    const url = `${baseURL}/pipelien/selectAllId`
    return axios.post(url, { params: params })
}
