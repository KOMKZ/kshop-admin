import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueAuth from '@websanova/vue-auth'
import NProgress from 'vue-nprogress'
import { sync } from 'vuex-router-sync'
import App from './App.vue'
import router from './router'
import store from './store'
import * as filters from './filters'
import { TOGGLE_SIDEBAR } from 'vuex-store/mutation-types'
import VeeValidate, {Validator} from 'vee-validate';
import ValidateCnMessage from "vee-validate/dist/locale/zh_CN"
import activeField from "components/form/activeField"




Vue.router = router
// add global components
Vue.component('active-field', activeField)
// vee-validate plugins
Validator.addLocale(ValidateCnMessage);
Vue.use(VeeValidate, {
	locale : 'zh_CN'
})
Vue.use(VueAxios, axios)
Vue.use(VueAuth, {
  auth: {
	request: function (req, token) {
	  this.options.http._setHeaders.call(this, req, {Authorization: 'Bearer ' + token})
	},
	response: function (res) {
	  let resData = res.data;
	  if(resData.code == 0){
		  return resData.data.jwt
	  }
	}
  },
  http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
  router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
  loginData: { url: 'http://localhost:8011/auth/login', fetchUser: false }
  ,refreshData: { enabled: false }
  // ,fetchData: { enabled: false}
})

Vue.use(NProgress)

// Enable devtools
Vue.config.devtools = true

sync(store, router)

const nprogress = new NProgress({ parent: '.nprogress-container' })

const { state } = store

router.beforeEach((route, redirect, next) => {
  if (state.app.device.isMobile && state.app.sidebar.opened) {
	store.commit(TOGGLE_SIDEBAR, false)
  }
  next()
})

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

const app = new Vue({
  router,
  store,
  nprogress,
  ...App
})
axios.interceptors.response.use(response => {return response}, error => {
	if(401 == error.response.status){
		if(app.$auth.check()){
			app.$auth.logout({makeRequest:false, redirect: ''})
		}
		return Promise.reject({
			message : error.response.data.message
			,code : error.response.data.code
			,from_server : true
		})
	}
	return error.response
})
Validator.extend('ksConfirmed', {
  getMessage(field, args){
	  return `${field} 和 ${args[0]} 的值不匹配`
  },
  validate(value, args){
	  if(args.length > 0){
		  let el = app.$el.querySelector(`input[name=${args[0]}]`)
		  if(!el){
			  return false
		  }
		  if(String(value) === String(el.value)){
			  return true
		  }else{
			  return false
		  }
	  }
  }
});
export { app, router, store }
