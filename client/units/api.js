import axios from 'axios'
import qs from 'qs'
import NProgress from 'nprogress'
import {openNotification} from 'units'
import router from 'src/router'

axios.interceptors.request.use(config => {
	NProgress.start()
	return config
}, error => {
	return Promise.reject(error)
})

axios.interceptors.response.use(response => response, error => Promise.resolve(error.response))

function checkStatus(response) {
	NProgress.done()
	if (response.status === 200 || response.status === 304) {
		return response
	}
	return {
		data: {
			code: response.status,
			message: response.statusText,
			data: response.data,
		}
	}
}

function checkCode(res) {
	if (res.data.code != 0) {
		openNotification({
			message: res.data.data.message || res.data.message,
			type: "danger"
		})
		if(401 == res.data.code){
			router.replace({
				path: '/login',
				query: {redirect: router.currentRoute.fullPath}
			})
			return Promise.reject(res)
		}
	}
	return res.data
}


export default {
	post(url, data) {
		return axios({
			method: 'post',
			url,
			data: qs.stringify(data),
			timeout: 30000,
			headers: {
				'X-Requested-With': 'XMLHttpRequest',
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			}
		})
		.then(checkStatus)
		.then(checkCode)
	},
	get(url, params) {
		return axios({
			method: 'get',
			url,
			params,
			timeout: 30000,
			headers: {
				'X-Requested-With': 'XMLHttpRequest'
			}
		})
		.then(checkStatus)
		.then(checkCode)
	}
}
