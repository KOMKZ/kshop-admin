import lazyLoading from './lazyLoading'

export default {
  name: '用户管理',
  path: '/user',
  meta: {
	icon: 'fa-bar-chart-o',
	expanded: false,
	link: 'user/list.vue'
  },
  component: lazyLoading('user', true),

  children: [
	{
	  name: '用户列表',
	  path: 'list',
	  component: lazyLoading('user/list'),
	  meta: {
		link: 'user/list.vue'
	  }
	}
	,{
	  name: '创建用户',
	  path: 'create',
	  component: lazyLoading('user/create'),
	  meta: {
		link: 'user/create.vue'
	  }
	}
  ]
}
