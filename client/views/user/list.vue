<template>
  <div class="tile is-ancestor">
      <div class="tile is-parent">
          <div class="tile is-child box">
              <v-server-table url="" :columns="columns" :options="options">
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
  ,created(){
  }
  ,methods: {
  }
};
</script>

<style lang="scss">
</style>
