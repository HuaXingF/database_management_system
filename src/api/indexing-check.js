import axios from 'axios'
import baseURL from '@/assets/js/config'
//数据规则列表
///tabRule/selectAll
export const selectAll = params => {
    const url = `${baseURL}/tabRule/selectAll`
    return axios.post(url, { params: params })
}
//关键字查询
///tabRule/selectByRuleName?fRuleName=
export const selectByRuleName = params => {
    console.log(params,"666")
    const url = `${baseURL}/tabRule/selectByRuleName?fRuleName=${params}`
    return axios.post(url, { params: params })
}
//添加
/* fRuleType,
 fRuleName,
 fRuleDefine,
 fTableField,
 fTableName,
 fBaseName*/
///tabRule/insert?fRuleType=0&fRuleName=0&fRuleDefine=0&fRuleDes=0&fTableField=0&fTableName=0
export const insert = params => {
    const url = `${baseURL}/tabRule/insert`
    return axios.get(url,{params:params})
}
//删除
///tabRule/delete?fRuleId=
export const deleteTabRule = params => {
    const url = `${baseURL}/tabRule/delete?fRuleId=${params}`
    return axios.post(url, { params: params })
}
//编辑
/*fRuleId,
fRuleName,
fRuleDefine,
fTableField,
fTableName,
fRuleDes,
fBaseName*/
///tabRule/update?fRuleId=
    //?fRuleId=${params.fRuleId}&&fRuleName=${params.fRuleName}&&fRuleDefine=${params.fRuleDefine}
    //     &&fTableField=${params.fTableField}&&fTableName=${params.fTableName}&&fRuleDes=${params.fRuleDes}&&fBaseName=${params.fBaseName}
export const update = params => {
    const url = `${baseURL}/tabRule/update`
    return axios.get(url, { params: params })
}
//查询有哪些库
//tabRule
export const selectAllBase = params => {
    const url = `${baseURL}/tabRule/selectAllBase`
    return axios.post(url, { params: params })
}
//根据库查表
//selectBaseTab
export const selectBaseTab = params => {
    const url = `${baseURL}/tabRule/selectBaseTab?fBaseName=${params}`
    return axios.post(url, { params: params })
}
//根据表查字段
//selectTabFile
export const selectTabFile = params => {
    const url = `${baseURL}/tabRule/selectTabFile?fTableName=${params}`
    return axios.post(url, { params: params })
}
