let baseURL = ''

if (process.env.NODE_ENV === 'production') {
    //根据.env文件中的VUE_APP_FLAG判断是生产环境还是测试环境
    if (process.env.VUE_APP_TITLE === 'production') {
        //production 生产环境
        baseURL = ''
    } else {
        //test 测试环境
        baseURL = ''
    }
} else {
    //development 开发环境
    baseURL = 'http://192.168.10.21:8080'
}

export default baseURL
