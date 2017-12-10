<template>
  <div class="tile is-ancestor">
	  <div class="tile is-parent">
		  <div class="tile is-child box">
			  <v-server-table ref="grid" url="" :columns="columns" :options="options">
            	<template slot="u_created_at" slot-scope="props">
                    {{props.row.u_created_at | datetime}}
            	</template>
                <template slot="u_auth_status" slot-scope="props">
                    {{props.row.u_auth_status | covertToLabel('u_auth_status')}}
            	</template>
                <template slot="u_status" slot-scope="props">
                    <span :class="getUStatusTextClasses(props.row.u_status)">{{props.row.u_status | covertToLabel('u_status')}}</span>
            	</template>
                <template slot="u_updated_at" slot-scope="props">
                    {{props.row.u_updated_at | datetime}}
            	</template>
                <template slot="operations" slot-scope="props">
                    <router-link
                    :to="{ path: '/user/update', query : {u_id : props.row.u_id}}"
                    class="button is-small is-info  "
                    >
                    修改</router-link>

                    <button @click="toggleUserStatus(props.row, $event)" v-if="'locked' == props.row.u_status" type="button" class="button is-small is-primary" name="button">解锁</button>
                    <button @click="toggleUserStatus(props.row, $event)" type="button" v-else class="button is-small is-warning" name="button">锁定</button>
            	</template>

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
let moment = require('moment');

const customFields = [
	'u_id',
	'u_username',
	'u_email',
	'u_auth_status',
	'u_status',
	'u_created_at',
	'u_updated_at',
    'operations'
]
let customFieldLabels = {
    operations : '操作'
}
customFields.forEach(name => {
    if(UserSchema[name]){
        customFieldLabels[name] = UserSchema[name]['label']
    }
})

export default {
  name: 'test',
  data(){
	return {
	  columns: customFields
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
  ,methods:{
      toggleUserStatus(user, event){
          console.log(event.target)
          // 需要判断是不是本人自己
          UserModel.updateUserByUid(user.u_id, {
              u_status : 'locked' == user.u_status ? "active" : "locked"
          })
          .then(res => {
              this.$refs.grid.refresh()
          })
      }
      ,getUStatusTextClasses(u_status){
          return 'locked' != u_status ?
                 "has-text-info"
                 :
                 "has-text-danger"
      }
  }
  ,filters:{
      datetime(value){
          return moment(Number(value) * 1000).format("YY/MM/DD hh:mm a")
      }
      ,covertToLabel(value, name){
          if(UserSchema[name] && UserSchema[name] && UserSchema[name]['enums'].hasOwnProperty(value)){
              return UserSchema[name]['enums'][value];
          }
          return value
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
