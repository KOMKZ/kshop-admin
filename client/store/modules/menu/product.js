import lazyLoading from './lazyLoading'

export default {
  name: '产品管理',
  path: '/product',
  meta: {
	icon: 'fa-bar-chart-o',
	expanded: false,
	link: 'product/list.vue'
  },
  component: lazyLoading('user', true),

  children: [
	{
	  name: '产品列表',
	  path: 'list',
	  component: lazyLoading('product/list'),
	  meta: {
		link: 'product/list.vue'
	  }
	}
  ]
}
