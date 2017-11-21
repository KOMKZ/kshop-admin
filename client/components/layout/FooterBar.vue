<template>
  <footer class="footer" :style="[hiddenSidebarStyle]">
	<div class="container">
	  <div class="content has-text-centered">
		<p class="social">
		  <a :href="'https://github.com/' + repository">
			<span class="icon">
			  <i class="fa fa-github"></i>
			</span>
		  </a>
		  <a href="https://twitter.com/_fundon">
			<span class="icon">
			  <i class="fa fa-twitter"></i>
			</span>
		  </a>
		</p>
		<p><span class="icon"><i class="fa fa-code"></i></span> with <span class="icon"><i class="fa fa-heart"></i></span> by <a href="https://github.com/fundon">fundon</a>.</p>
		<p>Code licensed under <a :href="'https://github.com/' + repository + '/blob/master/LICENSE'">{{ license }}</a>.</p>
	  </div>
	</div>
  </footer>
</template>

<script>
export default {
  props : [
	  "isSiderBarHide"
  ],
  data () {
	return this.$store.state.pkg
  }
  ,computed : {
	  hiddenSidebarStyle () {
		return this.isSiderBarHide ? { 'margin-left': 0 } : null
	  }
  }
}
</script>

<style lang="scss">
@import '~bulma/sass/utilities/mixins';

.footer {
  margin-left: 180px;

  @include mobile() {
	margin-left: 0;
  }

  .social a {
	border-bottom: none !important;
  }

  .fa.fa-heart {
	color: red;
  }
}
</style>
