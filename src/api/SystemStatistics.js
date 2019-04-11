import axios from 'axios'
import baseURL from '@/assets/js/config'

// 数据规则当前信息统计
export const SystemRuleNowRule = params => {
    const url = `${baseURL}/ruleApplyResult/selectAllRuleHeGeLv`
    return axios.post(url, { params: params })
}

// 当前各表数据合格率排行榜
export const SystemRuleNowTable = params => {
    const url = `${baseURL}/ruleApplyResult/selectAllTabHeGeLv`
    return axios.post(url, { params: params })
}

// 当前各库数据合格率排行榜
export const SystemRuleNowData = params => {
    const url = `${baseURL}/ruleApplyResult/selectAllBaseHeGeLv`
    return axios.post(url, { params: params })
}

// 当前各字段数据合格率排行榜
export const SystemRuleNowStr = params => {
    const url = `${baseURL}/ruleApplyResult/selectAllFieldHeGeLv`
    return axios.post(url, { params: params })
}
