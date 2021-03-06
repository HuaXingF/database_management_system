import axios from 'axios'
import baseURL from '@/assets/js/config'

export const selectTiem = params => {
  const url = `${baseURL}/ruleApplyResult/selectTableRegularTime2?startTime=${params.startTime}&endTime=${params.endTime}`
  return axios.post(url, { params: params })
}

export const selectBing = params => {
  const url = `${baseURL}/ruleApplyResult/selectBing?startTime=${params.startTime}&endTime=${params.endTime}`
  return axios.post(url, { params: params })
}

export const selectRuleTable = params => {
  const url = `${baseURL}/ruleApplyResult/selectRuleHeGe?startTime=${params.startTime}&endTime=${params.endTime}&baseName=${params.baseName}`
  return axios.post(url, { params: params })
}

export const selectRuleComTable = params => {
  const url = `${baseURL}/ruleApplyResult/selectTabHeGe?startTime=${params.startTime}&endTime=${params.endTime}&baseName=${params.baseName}`
  return axios.post(url, { params: params })
}

export const selectRuleHistoryStr = params => {
  const url = `${baseURL}/ruleApplyResult/selectFieldHeGe?startTime=${params.startTime}&endTime=${params.endTime}&tableName=${params.baseName}`
  return axios.post(url, { params: params })
}

export const selectRuleHistoryPieStr = params => {
  const url = `${baseURL}/ruleApplyResult/selectFieldBing?startTime=${params.startTime}&endTime=${params.endTime}&tableName=${params.baseName}`
  return axios.post(url, { params: params })
}
