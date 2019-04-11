import axios from 'axios'
import baseURL from '@/assets/js/config'

//数据规则列表
export const selectAll = params => {
    const url = `${baseURL}/tabRule/selectAll`
    return axios.post(url, { params: params })
}

//关键字查询
export const selectByRuleName = params => {
    console.log(params,"666")
    const url = `${baseURL}/tabRule/selectByRuleName?fRuleName=${params}`
    return axios.post(url, { params: params })
}

//添加
export const insert = params => {
    const url = `${baseURL}/tabRule/insert`
    return axios.get(url,{params:params})
}

//删除
export const deleteTabRule = params => {
    const url = `${baseURL}/tabRule/delete?fRuleId=${params}`
    return axios.post(url, { params: params })
}

//编辑
export const update = params => {
    const url = `${baseURL}/tabRule/update`
    return axios.get(url, { params: params })
}

//查询有哪些库
export const selectAllBase = params => {
    const url = `${baseURL}/tabRule/selectAllBase`
    return axios.post(url, { params: params })
}

//根据库查表
export const selectBaseTab = params => {
    const url = `${baseURL}/tabRule/selectBaseTab?fBaseName=${params}`
    return axios.post(url, { params: params })
}

//根据表查字段
export const selectTabFile = params => {
    const url = `${baseURL}/tabRule/selectTabFile?fTableName=${params}`
    return axios.post(url, { params: params })
}
