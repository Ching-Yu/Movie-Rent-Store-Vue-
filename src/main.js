// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'bootstrap'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.min.css';
import VeeValidate from 'vee-validate';
import zhTWValidate from 'vee-validate/dist/locale/zh_Tw';

import App from './App'
import router from './router'
import './bus.js'
import currencyFilter from './filters/currency'
import dateFilter from './filters/date';
// import VueFilterDateFormat from 'vue-filter-date-format'

Vue.config.productionTip = false
Vue.component('Loading', Loading);
Vue.filter('currency', currencyFilter)
Vue.filter('date', dateFilter);
// Vue.use(VueFilterDateFormat)
Vue.use(VeeValidate);

VeeValidate.Validator.localize('zh_TW', zhTWValidate)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});

router.beforeEach((to, from, next) => {
  if(to.meta.requiresAuth){
    const api = `${process.env.APIPATH}/api/user/check`;
    axios.post(api).then((response) => {
      console.log(response.data);
      if(response.data.success){
        next();
      } else{
        next({
          path: "/login",
        });
      }          
    });  
  } else {
    next()
  }
})