<template>
	<div class="">
		<div class="styles-box">

		</div>
		<button type="button" name="button" class="button" @click="getUserList">send</button>
	</div>
</template>

<script>
import api from "units/api"

export default {
	methods : {
		getUserList(){
			let url = '/user/list'
			api.get(url)
			.then((res) => {
				// console.log(res)
			})
		}
	}
}
</script>

<style lang="scss">
</style>
