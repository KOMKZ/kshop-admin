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

// 填充字段的定义的默认值到model中
function populateDefValToModel(model, fields){
	Object.entries(model).forEach(([key, val]) => {
		if(fields[key] && fields[key]['default']){
			model[key] = fields[key]['default']
		}
	})
}

export {
	openMessage
	,openNotification
	,populateDefValToModel
}
