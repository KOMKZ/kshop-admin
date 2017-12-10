<template lang="html">
	<div class="tile is-ancestor">
		<div class="tile is-parent is-4">
			<div class="tile is-child box">
				<form v-on:submit.prevent="sendUpdate">
					<div class="block">
						<active-field :disabled="true" :loading="loading" :field="schema.u_username" v-model="body.u_username"></active-field>
						<active-field :scenario="'update'" :loading="loading" :field="schema.password" v-model="body.password"></active-field>
						<active-field :scenario="'update'" :loading="loading" :field="schema.password_confirm" v-model="body.password_confirm"></active-field>
						<active-field :disabled="true" :loading="loading" :field="schema.u_email" v-model="body.u_email"></active-field>
						<active-field :loading="loading" :type="'dropdown'" :field="schema.u_status" v-model="body.u_status"></active-field>
						<active-field :loading="loading" :type="'dropdown'" :field="schema.u_auth_status" v-model="body.u_auth_status"></active-field>
						<p class="control">
						  <button :class="['button', 'is-primary', caculateLoadingClass]">修改</button>
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
import schema from 'models/user/UserSchema'

export default {
	watch : {
		'$route' : function(to, from){
			this.getUser(to.query['u_id'])
			.catch(err => {
				if(err.from_server){
					this.$router.replace('/user/list')
				}else{
					console.log(err)
				}
			})
		}
	}
	,data () {
		return {
			schema,
			loading: true,
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
	,methods : {
		toggleLoading(){
			this.loading = !this.loading
		}
		,sendUpdate(){
			this.$validator.validateAll()
			.then((validateResult) => {
				return validateResult ? Promise.resolve(true) : Promise.reject({
					from_server : false
					,code : 1
					,message : this.errors.collect()
				})
			})
			.then((result) => {
				return api.post('/user/update', this.body)
			})
			.then((result) => {
				openNotification({message : "修改用户成功", type : "success"})
			})
			.catch(err => {
				if(err.from_server){
					populateBkErrsToModel(this.errors, err.message)
				}else{
					console.log(err)
				}
			})
		}
		,getUser(u_id){
			return api.get('/user/view', {u_id : u_id}).then(res => {
				Object.assign(this.body, res.data)
				this.toggleLoading()
			})
		}
	}
	,computed:{
		caculateLoadingClass(){
			return this.loading ? "is-loading" : null
		}
	}
	,created : function(){
		let query = this.$router.currentRoute.query
		this.getUser(query['u_id'])
		.catch(err => {
			if(err.from_server){
				this.$router.replace('/user/list')
			}else{
				console.log(err)
			}
		})
	}
}
</script>

<style lang="scss">
</style>
