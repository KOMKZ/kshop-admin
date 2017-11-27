<template>
  <div>
    <vue-good-table
      title="Demo Table"
      :columns="columns"
      :rows="rows"
      :paginate="true"
      :lineNumbers="true"/>
  </div>
</template>

<script>
import {Schema} from "models"
import UserModel from "models/user/UserModel"
import UserSchema from "models/user/UserSchema"
export default {
  name: 'test',
  data(){
    return {
      columns: [
		  ...Schema.exportAsArray(UserSchema, [
		  			'u_id',
		  			'u_username',
		  			'u_email',
		  			'u_auth_status',
		  			'u_status',
		  			'u_created_at',
		  			'u_updated_at'
		  		], {name : 'field'})
      ],
      rows: [
      ]
    }
  }
  ,created(){
	  this.getUserListData()
  }
  ,methods: {
	  getUserListData(){
		  UserModel.getUserList()
		  .then(res => {
			  this.rows = res.data.items
		  })
		  .catch(err => {
			  console.log(err)
		  })
	  }
  }
};
</script>

<style lang="scss">
</style>
