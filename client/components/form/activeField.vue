<template>
	<div class="block" v-if="!type">
		<label class="label">{{field.label}}</label>
		<p :class="['control', 'has-icon', 'has-icon-right', caculateLoadingClass]">
		  <input
		  :disabled="disabled"
		  v-validate="getRules"
		  :class="{'input':true, 'is-danger': errors.has(field.name)}"
		  :value="value"
		  :name="field.name"
		  v-on:input="updateValue($event.target.value)"
		  :type="field.type ? field.type : 'text'"
		  :placeholder="field.placeholder ? field.placeholder : ''"
		  >
		  <span class="icon is-small" v-show="errors.has(field.name)">
			<i class="fa fa-warning"></i>
		  </span>
		  <span class="help is-danger" v-show="errors.has(field.name)">{{errors.first(field.name)}}</span>
		</p>
	</div>
	<div class="block" v-else-if="'dropdown'">
		<label class="label">{{field.label}}</label>
		<p class="control">
		  <span class="select is-danger">
			<select
			:disabled="disabled"
			v-validate="field.rules"
			v-on:change="updateValue($event.target.value)"
			:value="value"
			:name="field.name">
			  <option :value="null">请选择</option>
			  <option v-for="(label, val) in field.enums" :value="val">{{label}}</option>
			</select>
		  <span class="help is-danger" v-show="errors.has(field.name)">{{errors.first(field.name)}}</span>
		  </span>
		</p>
	</div>
</template>

<script>
import bus from "units/bus"
import { find, propEq } from 'ramda'


export default {
	props : [
		"field",
		"value",
		"type",
		"loading",
		"disabled",
		"scenario"
	]
	,name : 'active-field'
	,inject : ["$validator"]
	,computed:{
		caculateLoadingClass(){
			return this.loading ? "is-loading" : null
		}
		,getRules(){
			if('object' == typeof this.field.rules){
				if(!this.scenario){
					return this.field.rules['default']
				}
				return this.field.rules[this.scenario]
			}
			return this.field.rules
		}
	}
	,methods : {
		updateValue(value){
			this.$emit('input', value)
		}
	}
}
</script>

<style lang="sass">
</style>
