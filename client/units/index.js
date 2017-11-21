import Vue from 'vue'
import Message from 'vue-bulma-message'
import Notification from 'vue-bulma-notification'

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

export {
	openMessage
	,openNotification
}
