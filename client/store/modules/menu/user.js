import lazyLoading from './lazyLoading'

export default {
  name: '用户管理',
  path: "/user",
  meta: {
	icon: 'fa-bar-chart-o',
	expanded: false
  },
  component: lazyLoading('user', true),
  children: [
	{
	  name: '用户列表',
	  path: 'list',
	  component: lazyLoading('user/UserList'),
	  meta: {
		link: 'user/UserList'
	  }
	}
	,{
	  name: '创建用户',
	  path: 'add',
	  component: lazyLoading('user/UserAdd'),
	  meta: {
		link: 'user/UserAdd'
	  }
	}
  ]
}
