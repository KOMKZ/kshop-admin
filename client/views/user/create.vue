<template>
	<div class="tile is-ancestor">
		<div class="tile is-parent is-4">
			<div class="tile is-child box">
				<loader-btn @click.native="demo($event)">btn1</loader-btn>
				<loader-btn @click.native="demo($event)">btn2</loader-btn>
				<form v-on:submit.prevent="sendCreate">
					<div class="block">
						<active-field :field="schema.u_username" v-model="body.u_username"></active-field>
						<active-field :field="schema.password" v-model="body.password"></active-field>
						<active-field :field="schema.password_confirm" v-model="body.password_confirm"></active-field>
						<active-field :field="schema.u_email" v-model="body.u_email"></active-field>
						<active-field :type="'dropdown'" :field="schema.u_status" v-model="body.u_status"></active-field>
						<active-field :type="'dropdown'" :field="schema.u_auth_status" v-model="body.u_auth_status"></active-field>
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
import schema from 'models/user/UserSchema'
import LoaderBus from "components/ui/LoaderBus"
export default {
	data () {
		let vue = this
		return {
			schema,
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
		populateDefValToModel(this.body, this.schema)
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
		}
		,demo($event){
			LoaderBus.$emit('begin-loading', $event);
		}
	}
}
</script>

<style lang="scss">


</style>
