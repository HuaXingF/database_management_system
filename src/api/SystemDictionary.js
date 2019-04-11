import axios from 'axios'
import baseURL from '@/assets/js/config'

// 分页查询所有数据
export const queryPage = params => {
    const url = `${baseURL}/tabDictionary/queryPage?pageNum=${params.pageNum}&pageSize=${params.pageSize}`
    return axios.post(url, { params: params })
}

// 根据条件分页查询数据
export const queryPage1 = params => {
    const url = `${baseURL}/tabDictionary/queryPage?pageNum=${params.pageNum}&pageSize=${params.pageSize}&category=${params.category}`
    return axios.post(url, { params: params })
}

// 插入数据
export const insert = params => {
    const url = `${baseURL}/tabDictionary/insert`
    return axios.post(url, params)
}

// 更改插入数据
export const updateById = params => {
    const url = `${baseURL}/tabDictionary/updateById`
    return axios.post(url, params)
}

//删除数据
export const deleteById = params => {
    const url = `${baseURL}/tabDictionary/deleteById?id=`+ params
    return axios.post(url, { params: params })
}

// 扩展项插入数据
export const insertById = params => {
    const url = `${baseURL}/tabExtension/insertById`
    return axios.post(url, params)
}

// 扩展项查询数据
export const queryByDictionaryId = params => {
    const url = `${baseURL}/tabExtension/queryByDictionaryId?dictionaryId=`+ params
    return axios.post(url, { params: params })
}

// 扩展项删除数据
export const deleteById_kz = params => {
    const url = `${baseURL}/tabExtension/deleteById?id=` + params
    return axios.post(url, { params: params })
}

// 扩展更改插入数据
export const updateById_kz = params => {
    const url = `${baseURL}/tabExtension/updateById`
    return axios.post(url, params)
}
