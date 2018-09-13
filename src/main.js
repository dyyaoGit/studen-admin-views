// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import $axios from './util/$axios'
import api from './util/api'
import store from './store/store'
import pagination from './components/pagination'

Vue.config.productionTip = false
Vue.prototype.$api = api
Vue.use(ElementUI);
Vue.use(pagination);
Vue.component('pagination', pagination);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App ,pagination},
  template: '<App/>'
})
