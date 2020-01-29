import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store'
import './bootstrap';
import Paginate from 'vuejs-paginate';
import Validator from './plugins/validator';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPencilAlt, faTrash, faBan, faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Loading from 'vue-loading-overlay';

library.add(faPencilAlt, faTrash, faBan, faCheck);

Vue.config.productionTip = false;
Vue.component('paginate', Paginate);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(Validator);
Vue.use(Loading);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
