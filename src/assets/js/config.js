let baseURL = ''

if (process.env.NODE_ENV === 'production') {
    //根据.env文件中的VUE_APP_FLAG判断是生产环境还是测试环境
    if (process.env.VUE_APP_TITLE === 'production') {
        //production 生产环境
        baseURL = 'http://192.168.10.21:8080'
    } else {
        //test 测试环境
        baseURL = 'http://192.168.10.21:8080'
    }
} else {
    //development 开发环境
<<<<<<< HEAD
    baseURL = 'http://192.168.10.21:8080'
=======
    baseURL = 'http://192.168.10.21:8080/'
>>>>>>> f913baec2f286af84c59b486a2f337fd22b0f77b
}

export default baseURL
