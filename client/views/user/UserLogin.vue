<template>
<div class="content has-text-centered">
  <h1 class="is-title is-bold">Login</h1>

  <div class="columns is-vcentered">
	<div class="column is-6 is-offset-3">
	  <div class="box">
		<div v-show="error" style="color:red; word-wrap:break-word;">{{ error }}</div>
		<form v-on:submit.prevent="login">
		  <label class="label">Email</label>
		  <p class="control">
			<input v-model="data.body.u_email" class="input" type="text" placeholder="email@example.org">
		  </p>
		  <label class="label">Password</label>
		  <p class="control">
			<input v-model="data.body.password" class="input" type="password" placeholder="password">
		  </p>

		  <p class="control">
			<label class="checkbox">
			  <input type="checkbox" v-model="data.rememberMe">
			  Remember me
			</label>
		  </p>

		  <hr>
		  <p class="control">
			<button type="submit" class="button is-primary">Login</button>
			<button class="button is-default">Cancel</button>
		  </p>
		</form>
	  </div>
	</div>
  </div>
</div>
</template>

<script>
export default {

  data () {
	return {
	  data: {
		body: {
		  username: null,
		  password: null
		},
		rememberMe: false
	  },
	  error: null
	}
  },
  mounted () {
	if (this.$auth.redirect()) {
	  console.log('Redirect from: ' + this.$auth.redirect().from.name)
	}
	// Can set query parameter here for auth redirect or just do it silently in login redirect.
  },
  methods: {
	login () {
	  var redirect = this.$auth.redirect()
	  this.$auth.login({
		headers: {
		  'Content-Type': 'application/json'
		},
		data: {
			...this.data.body,
			type : "token",
		},
		rememberMe: this.data.rememberMe,
		redirect: {name: redirect ? redirect.from.name : 'Home'},
		success (res) {
			//
		},
		error (err) {
			this.error = err.message
		}
	  })
	}
  }
  // filters: {
  //   json: function (value) {
  //     console.log(value)
  //     return value
  //   }
  // }

}
</script>

<style lang="scss" scoped>
.is-title {
	text-transform: capitalize;
}
</style>
