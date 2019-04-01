
import axios from 'axios'
import baseURL from '@/assets/js/config'

//获取核心库当前 && 当日数据总量
export const getCloumnData = params => {
    const url = `${baseURL}/ruleApplyResult/selectRegularByTable2`
    return axios.post(url, { params: params })
}
