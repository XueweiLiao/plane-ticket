import Vue from 'vue'
import App from './App.vue'

import store from './store'

import VueRouter from 'vue-router'

import router from './router'

import qs from 'qs'


Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.prototype.$qs = qs

new Vue({
  render: h => h(App),
  router:router,
  store
}).$mount('#app')
