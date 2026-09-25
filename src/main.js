import Vue from 'vue'
import VueScrollTo from 'vue-scrollto'
import App from './App.vue'
import router from './router'
import store from './store'


Vue.use(VueScrollTo)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
