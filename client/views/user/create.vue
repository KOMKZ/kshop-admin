<template>
	<div class="tile is-ancestor">
		<div class="tile is-parent is-4">
			<div class="tile is-child box">
				<form v-on:submit.prevent="sendCreate">
					<div class="block">
						<active-field :field="dataFields.u_username" v-model="body.u_username"></active-field>
						<active-field :field="dataFields.password" v-model="body.password"></active-field>
						<active-field :field="dataFields.password_confirm" v-model="body.password_confirm"></active-field>
						<active-field :field="dataFields.u_email" v-model="body.u_email"></active-field>
						<active-field :type="'dropdown'" :field="dataFields.u_status" v-model="body.u_status"></active-field>
						<active-field :type="'dropdown'" :field="dataFields.u_auth_status" v-model="body.u_auth_status"></active-field>
						<p class="control">
						  <button class="button is-primary">创建</button>
						</p>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
import api from "units/api"
import {
	openNotification
	,populateDefValToModel
	,populateBkErrsToModel
} from 'units'
import bus from "units/bus"

export default {
	data () {
		let vue = this
		return {
			dataFields : {
				u_username : {
					label : '用户名'
					,name : 'u_username'
					,rules : 'required'
					,default : 'abc'
				}
				,password : {
					label : '密码'
					,name : 'password'
					,rules : 'required'
					,type: 'password'
					,default : 'philips'
				}
				,password_confirm : {
					label : '确认密码'
					,name : 'password_confirm'
					,rules : 'required|ksConfirmed:password'
					,type: 'password'
					,default: 'philips'
				}
				,u_email : {
					label : '邮箱'
					,name : 'u_email'
					,rules : 'required|email'
					,default: 'philips@qq.com'
				}
				,u_auth_status : {
					label : '验证状态'
					,name : 'u_auth_status'
					,rules : 'required'
					,default : 'had_auth'
					,enums : {
						no_auth: '没有验证'
						,had_auth: '已经验证'
					}
				}
				,u_status : {
					label : '用户状态'
					,name : 'u_status'
					,rules : 'required'
					,default : 'active'
					,enums : {
						active: '激活状态'
						,not_auth: "未激活状态"
					}
				}
			},
			body : {
				u_username : null,
				password : null,
				password_confirm: null,
				u_email: null,
				u_auth_status : null,
				u_status : null
			}

		}
	}
	,beforeMount(){
		populateDefValToModel(this.body, this.dataFields)
	}
	,methods : {
		sendCreate : function(){
			this.$validator.validateAll()
			.then((validateResult) => {
				return validateResult ? Promise.resolve(true) : Promise.reject({
					from_server : false
					,code : 1
					,message : this.errors.collect()
				})
			})
			.then((result) => {
				return api.post('/user/create', this.body)
			})
			.then((result) => {
				openNotification({message : "创建用户成功", type : "success"})
			})
			.catch(err => {
				if(err.from_server){
					populateBkErrsToModel(this.errors, err.message)
				}else{
					console.log(err)
				}
			})
		},
	}
}
</script>

<style lang="scss">
</style>
