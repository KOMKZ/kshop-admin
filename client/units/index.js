import Vue from 'vue'
import Message from 'vue-bulma-message'
import Notification from 'vue-bulma-notification'

// 新建message组件
const MessageComponent = Vue.extend(Message)
const openMessage = (propsData) => {
  let defaultPropsData = {
	title: '',
	message: '',
	type: '',
	duration: 5000,
  }
  propsData = {
	  ...defaultPropsData,
	  ...propsData
  }
  return new MessageComponent({
	el: document.createElement('div'),
	propsData
  })
}

// 新建一个通知组件
const NotificationComponent = Vue.extend(Notification)
const openNotification = (propsData) => {
  let defaultPropsData = {
	title: '',
	message: '',
	type: '',
	duration: 5000,
  }
  propsData = {
	  ...defaultPropsData,
	  ...propsData
  }
  return new NotificationComponent({
	el: document.createElement('div'),
	propsData
  })
}

/**
 * 填充字段的定义的默认值到model中
 * 会将fields中定义地字段的默认值填充到model中来
 * @param  {[type]} model  定义用于v-model的绑定
 * ```
 * {
 *     username : null
 *     email : null
 * }
 * ```
 * @param  {[type]} fields [description]
 * ```
 * {
 *      username : {
 *          default : 'lartik'
 *      }
 *      ,email : {
 *          emial : 'philisp@qq.com'
 *      }
 * }
 * ```
 * @return {[type]}        [description]
 */
function populateDefValToModel(model, fields){
	Object.entries(model).forEach(([key, val]) => {
		if(fields[key] && fields[key]['default']){
			model[key] = fields[key]['default']
		}
	})
}

/**
 * 填充后端验证返回的错误字段回来给this.errors
 * @param  {[type]} modelErrors [description]
 * vue-validate 中绑定的this.errors
 * @param  {[type]} bkErrors    后端返回的错误
 * eg:
 * ```json
 * {
 *  username : ['error1', 'error2']
 *  ,email : ['error1', 'error2']
 * }
 * ```
 * @return {[type]}             [description]
 */
function populateBkErrsToModel(modelErrors, bkErrors){
    if('object' == typeof bkErrors){
        Object.entries(bkErrors).forEach(([field, fieldErrors]) => {
            fieldErrors.forEach(msg => {
                modelErrors.add(field, msg)
            })
        })
    }
}

export {
	openMessage
	,openNotification
	,populateDefValToModel
    ,populateBkErrsToModel
}
