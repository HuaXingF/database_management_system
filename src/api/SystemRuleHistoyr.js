import axios from 'axios'
import baseURL from '@/assets/js/config'


export const selectTiem = params => {
  const url = `${baseURL}/ruleApplyResult/selectTableRegularTime2?startTime=${params.startTime}&endTime=${params.endTime}`
  // const url1 = `${baseURL}/pipelien/selectOneTimeAtamp?fPipelineId=${params.fPipelineId}&&startTime=${params.startTime}&&endTime=${params.endTime}`
  return axios.post(url, { params: params })
}

export const selectBing = params => {
  const url = `${baseURL}/ruleApplyResult/selectBing`
  // const url1 = `${baseURL}/pipelien/selectOneTimeAtamp?fPipelineId=${params.fPipelineId}&&startTime=${params.startTime}&&endTime=${params.endTime}`
  return axios.post(url, { params: params })
}

export const selectRuleTable = params => {
  const url = `${baseURL}/ruleApplyResult/selectRuleHeGe?startTime=${params.startTime}&endTime=${params.endTime}`
  // const url1 = `${baseURL}/pipelien/selectOneTimeAtamp?fPipelineId=${params.fPipelineId}&&startTime=${params.startTime}&&endTime=${params.endTime}`
  return axios.post(url, { params: params })
}

export const selectRuleComTable = params => {
  const url = `${baseURL}/ruleApplyResult/selectTabHeGe?startTime=${params.startTime}&endTime=${params.endTime}`
  // const url1 = `${baseURL}/pipelien/selectOneTimeAtamp?fPipelineId=${params.fPipelineId}&&startTime=${params.startTime}&&endTime=${params.endTime}`
  return axios.post(url, { params: params })
}