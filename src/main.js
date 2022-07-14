import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI, { Message, MessageBox } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import '@/icons' // icon
import '@/permission' // permission control
import { hasBtnPermission } from './utils/permission' // button permission

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import VueApexCharts from 'vue-apexcharts'

Vue.use(ElementUI, { locale })
Vue.use(Antd)
Vue.config.productionTip = false
Vue.prototype.hasPerm = hasBtnPermission
Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
