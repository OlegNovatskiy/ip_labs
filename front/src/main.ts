import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
axios.defaults.baseURL = 'http://localhost:8081/'
axios.interceptors.request.use(function (config) {
  if (config.headers.common.Accept && config.headers.common.Accept.indexOf('*/*') !== -1) {
    config.headers.accept = 'application/json'
  }

  return config
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
