<template lang="html">
	<button type="button" name="button" :class="getBtnClass">
		<slot></slot>
	</button>
</template>

<script>
import LoaderBus from "components/ui/LoaderBus"
export default {
	data : () => {
		return {
			loading : false
		}
	}
	,created: function(){
		let self = this
		LoaderBus.$on('begin-loading', (event) => {
			if(self.$el == event.target){
				this.loading = true
			}
		})
	}
	,computed:{
		getBtnClass(){
			let defaultClass = {button: true, "is-loading": this.loading}
			return defaultClass
		}
	}
}
</script>

<style lang="css">
</style>
