import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import db from './utils/db';

Vue.config.productionTip = false;
Vue.prototype.$db = db;
new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');