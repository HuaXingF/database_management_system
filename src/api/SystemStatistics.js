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