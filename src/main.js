import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import Print from 'vue-print-nb'
import 'element-ui/lib/theme-chalk/index.css'
import './mock/'
// import '@/icons'

Vue.config.productionTip = false
Vue.use(ElementUI, { size: 'small' })
Vue.use(Print)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
