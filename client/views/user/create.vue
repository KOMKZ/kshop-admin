<template>
	<div class="tile is-ancestor">
		<div class="tile is-parent is-4">
			<div class="tile is-child box">
				<form v-on:submit.prevent="create">
					<div class="block">
						<label class="label">用户名</label>
						<p class="control" :class="[getHasIconClass]">
						  <input class="input is-danger" v-model="data.body.u_username" type="text" placeholder="">
						  <span class="icon is-small">
							<i class="fa fa-warning"></i>
						  </span>
						  <span class="help is-danger">{{error.u_username}}</span>
						</p>

						<label class="label">密码</label>
						<p class="control">
						  <input class="input" v-model="data.body.password" type="password" placeholder="">
						</p>

						<label class="label">密码确认</label>
						<p class="control">
						  <input class="input" v-model="data.body.password_confirm" type="password" placeholder="">
						</p>

						<label class="label">邮箱</label>
						<p class="control">
						  <input class="input" v-model="data.body.u_email" type="email" placeholder="">
						</p>

						<label class="label">状态</label>
						<p class="control">
						  <span class="select">
							<select v-model="data.body.u_status">
							  <option>请选择</option>
							  <option v-for="(label, val) in enums.u_status" :value="val">{{label}}</option>
							</select>
						  </span>
						</p>

						<label class="label">验证状态</label>
						<p class="control">
						  <span class="select">
							<select v-model="data.body.u_auth_status">
							  <option>请选择</option>
							  <option v-for="(label, val) in enums.u_auth_status" :value="val">{{label}}</option>
							</select>
						  </span>
						</p>

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
export default {
	data () {
		return {
			data : {
				body : {
					u_username : null,
					password : null,
					password_confirm: null,
					u_email: null,
					u_auth_status : 'had_auth',
					u_status : 'active'
				}
			}
			,error : {
				u_username : null,
				u_email : null
			}
		}
	},
	methods : {
		create : function(){
			api.post('/user/create', this.data.body)
			.then((res) => {
				console.log("succ", res)
			})
			.catch(error => {
				console.log(error, vue)
			})
		}
	},
	computed : {
		getHasIconClass(name){
			return this.error.name ? ['has-icon has-icon-right'] : ''
		},
		enums (){
			return {
				u_auth_status : {
					no_auth: '没有验证'
					,had_auth: '已经验证'
				}
				,u_status: {
					active: '激活状态'
					,not_auth: "未激活状态"
				}
			}
		}
	}
}
</script>

<style lang="scss">
</style>
