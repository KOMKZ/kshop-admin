<template>
	<div class="tile is-ancestor">
		<div class="tile is-parent is-4">
			<div class="tile is-child box">
				<form v-on:submit.prevent="sendCreate">
					<div class="block">
						<active-field :field="dataFields.u_username" v-model="data.body.u_username"></active-field>
						<active-field :field="dataFields.password" v-model="data.body.password"></active-field>
						<active-field :field="dataFields.password_confirm" v-model="data.body.password_confirm"></active-field>
						<active-field :field="dataFields.u_email" v-model="data.body.u_email"></active-field>
						<active-field :type="'dropdown'" :field="dataFields.u_status" v-model="data.body.u_status"></active-field>
						<active-field :type="'dropdown'" :field="dataFields.u_auth_status" v-model="data.body.u_auth_status"></active-field>

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
import activeField from "components/form/activeField"
import {openNotification} from 'units'

export default {
	components : {
		activeField
	},
	data () {
		let vue = this
		return {
			dataFields : {
				u_username : {
					label : '用户名',
					name : 'u_username',
					rules : 'required'
				}
				,password : {
					label : '密码',
					name : 'password',
					rules : 'required',
					type: 'password'
				}
				,password_confirm : {
					label : '确认密码',
					name : 'password_confirm',
					rules : 'required',
					type: 'password'
				}
				,u_email : {
					label : '邮箱',
					name : 'u_email',
					rules : 'required|email',
				}
				,u_auth_status : {
					label : '验证状态',
					name : 'u_email',
					rules : 'required',
					default : 'had_auth',
					enums : {
						no_auth: '没有验证'
						,had_auth: '已经验证'
					}
				}
				,u_status : {
					label : '用户状态',
					name : 'u_email',
					rules : 'required',
					default : 'active',
					enums : {
						active: '激活状态'
						,not_auth: "未激活状态"
					}
				}
			},
			data : {
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
	},
	methods : {
		sendCreate : function(){
			this.$emit('formSubmit')
			return true
			api.post('/user/create', this.data.body)
			.then((res) => {
				console.log("succ", res)
			})
			.catch(error => {
				console.log(error)
			})
		}
	}
}
</script>

<style lang="scss">
</style>
