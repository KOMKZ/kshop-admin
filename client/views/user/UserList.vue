<template>
	<div class="">
		<div class="tile is-primary notification">
			<button type="button" class="button" @click="getUserList">send</button>
		</div>
	</div>
</template>

<script>
export default {
	methods: {
		getUserList : function(){
			let url = "http://localhost:8011/user/list"
			this.$http.get(url).then((response) => {
			  console.log(response)
			})
		}
	}
}
</script>

<style lang="scss">
</style>
