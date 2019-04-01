import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import echarts from 'echarts'

//引入全局样式
import './assets/css/index.scss'
import 'font-awesome/css/font-awesome.min.css'
import './assets/css/myProject.scss'


Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
Vue.prototype.$http=axios;
Vue.prototype.$http.defaults.baseURL = 'http://192.168.10.21:8080/';

Vue.use(ElementUI)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
