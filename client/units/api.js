import axios from 'axios'
import qs from 'qs'
import NProgress from 'nprogress'
import {openNotification} from 'units'
import router from 'src/router'

axios.interceptors.request.use(config => {
	NProgress.start()
	console.log(config)
	return config
}, error => {
	return Promise.reject(error)
})

// axios.interceptors.response.use(response => response, error => {
// 	Promise.resolve(error.response)
// })

function checkRes(res){
	if(res.status != 200 && res.status != 302){
		return Promise.reject({
			code : res.status,
			message : res.statusText
		})
	}
	let resData = res.data
	if(resData.code > 0){
		return Promise.reject({
			code : resData.code,
			message : resData.message
		})
	}
	return resData
}

function handleError(error){
	if(new Set([400, 500, 401]).has(error.code)){
		openNotification({
			message : error.message,
			type: 'danger'
		})
	}
	if(401 == error.code){
		router.replace({
			path: '/login',
			query: {redirect: router.currentRoute.fullPath}
		})
	}
	return Promise.reject(error)
}


export default {
	base : 'http://localhost:8011',
	getUrl (api) {
		return this.base.trim('/') + api;
	},
	post(url, data) {
		return axios({
			method: 'post',
			url: this.getUrl(url),
			data: qs.stringify(data),
			timeout: 30000,
			headers: {
				'X-Requested-With': 'XMLHttpRequest',
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			}
		})
		.then(checkRes)
		.catch(handleError)

	},
	get(url, params) {
		return axios({
			method: 'get',
			url: this.getUrl(url),
			params,
			timeout: 30000,
			headers: {
				'X-Requested-With': 'XMLHttpRequest'
			}
		})
		.then(checkRes)
		.catch(handleError)
	}
}
