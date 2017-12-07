<template>
  <div class="tile is-ancestor">
	  <div class="tile is-parent">
		  <div class="tile is-child box">
			  <v-server-table ref="grid" url="" :columns="columns" :options="options">
			  </v-server-table>
		  </div>
	  </div>

  </div>
</template>

<script>
import {Schema} from "models"
import UserModel from "models/user/UserModel"
import UserSchema from "models/user/UserSchema"

/**
console.log(...Schema.exportAsArray(UserSchema, [
		  'u_id',
		  'u_username',
		  'u_email',
		  'u_auth_status',
		  'u_status',
		  'u_created_at',
		  'u_updated_at'
	  ], {name : 'field'}))
 */
const customFields = [
	'u_id',
	'u_username',
	'u_email',
	'u_auth_status',
	'u_status',
	'u_created_at',
	'u_updated_at'
]
let customFieldLabels = {}
customFields.forEach(name => {
	customFieldLabels[name] = UserSchema[name]['label']
})
export default {
  name: 'test',
  data(){
	return {
	  columns: customFields
	  ,rows: [
	  ]
	  ,options: {
		  requestFunction : function (data) {
			  this.$router.replace({path : '/user/list', query : data})
			  return UserModel.getUserList(data)
							  .catch(function(err){
								  this.dispatch('error', err)
							  }.bind(this))
		  }
		  ,responseAdapter : function(res){
			  return {data : res.data.items, count : res.data.count}
		  }
		  ,perPage : 10
		  ,requestKeys : {
			  limit : 'per-page'
		  }
		  ,headings : customFieldLabels
	  }
	}
  }
  ,watch : {
	  '$route'(to, from){
		  if(to.query.page != from.query.page){
			  this.$refs.grid.setPage(to.query.page)
		  }
		  if(to.query['per-page'] != from.query['per-page']){
			  this.$refs.grid.setLimit(to.query['per-page'])
		  }
		  if(to.query['orderBy'] != from.query['orderBy']){
			  this.$refs.grid.setOrder(to.query['orderBy'], to.query['ascending'])
		  }
	  }
  }
};
</script>

<style lang="scss">
</style>
