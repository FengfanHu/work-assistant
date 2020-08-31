import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import db from './utils/db'
import axios from './utils/axios'
// eslint-disable-next-line import/no-extraneous-dependencies
import mavonEditor from 'mavon-editor'
// eslint-disable-next-line import/no-extraneous-dependencies
import 'mavon-editor/dist/css/index.css'

Vue.config.productionTip = false
Vue.prototype.$db = db
Vue.prototype.$axios = axios
Vue.use(mavonEditor)

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
}).$mount('#app')
