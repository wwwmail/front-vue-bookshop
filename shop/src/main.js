// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue';
Vue.use(BootstrapVue);

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import store from './store'
Vue.config.productionTip = true


import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
Vue.component('icon', Icon)

var VueCookie = require('vue-cookie');
// Tell Vue to use the plugin
Vue.use(VueCookie);


import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(VueAxios, axios);

const vueConfig = require('vue-config')
const configs = {
  API: 'http://new-rest.test',
  expiresCookie: '1h' // It's better to require a config file
}

Vue.use(vueConfig, configs)

// A param named `$config` will be injected in to every component, so in your component, you can get config easily

/* eslint-disable no-new */
new Vue({

  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',


})
