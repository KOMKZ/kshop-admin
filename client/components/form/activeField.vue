<template>
	<div class="block" v-if="!type">
		<label class="label">{{field.label}}</label>
		<p class="control has-icon has-icon-right">
		  <input
		  v-validate="field.rules"
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
		"type"
	]
	,inject : ["$validator"]
	,methods : {
		updateValue(value){
			this.$emit('input', value);
		}
	}
}
</script>

<style lang="sass">
</style>
