import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store'
import './bootstrap';
import Paginate from 'vuejs-paginate';
import Validator from './plugins/validator';

Vue.config.productionTip = false;
Vue.component('paginate', Paginate);

Vue.use(Validator);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
