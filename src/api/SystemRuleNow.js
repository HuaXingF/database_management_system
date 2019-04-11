import axios from 'axios'
import baseURL from '@/assets/js/config'

// 数据规则当前信息统计
export const SystemRuleNowRule = params => {
    const url = `${baseURL}/ruleApplyResult/selectAllRuleHeGeLv`
    return axios.post(url, { params: params })
}