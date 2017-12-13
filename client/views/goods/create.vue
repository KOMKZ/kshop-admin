<template>
    <div class="tile is-ancestor">
        <div class="tile is-parent">
            <div class="tile is-child box">
                <tabs type="boxed">
                    <tab-pane label="商品基础信息">
                        <form v-on:submit.prevent="sendCreate">
                            <div class="columns">
                                <div class="column">
                                    <div class="block">
                                        <p class="control">
                                            <button class="button is-primary">保存</button>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="columns">
                                <div class="column is-one-quarter">
                                    <div class="block">
                                        <active-field :field="schema.g_primary_name" v-model="body.g_primary_name"></active-field>
                                        <active-field :field="schema.g_secondary_name" v-model="body.g_secondary_name"></active-field>
                                    </div>
                                </div>
                            </div>
        				</form>
                    </tab-pane>
                </tabs>
            </div>
        </div>
    </div>
</template>

<script>
import { Tabs, TabPane } from 'vue-bulma-tabs'
import api from "units/api"
import Vue from "vue"
import {
	openNotification
	,populateDefValToModel
	,populateBkErrsToModel
} from 'units'
import schema from 'models/goods/GoodsSchema'
import Bus from "components/Bus"

export default {
    components : {
        TabPane
        ,Tabs
    }
    ,data () {
		let vue = this
		return {
			schema,
			body : {
				g_primary_name : null,
				g_secondary_name : null,
			}
		}
	}
    ,methods:{
        sendCreate(){
            console.log(this.$validator.validateAll())
        }
    }
}
</script>
