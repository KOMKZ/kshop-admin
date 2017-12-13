import lazyLoading from './lazyLoading'

export default {
  name: '商品管理',
  path: '/goods',
  meta: {
	icon: 'fa-bar-chart-o',
	expanded: false,
	link: 'goods/list.vue'
  },
  component: lazyLoading('goods', true),

  children: [
	{
	  name: '商品列表',
	  path: 'list',
	  component: lazyLoading('goods/list'),
	  meta: {
		link: 'goods/list.vue'
	  }
	}
    ,{
	  name: '创建商品',
	  path: 'create',
	  component: lazyLoading('goods/create'),
	  meta: {
		link: 'goods/create.vue'
	  }
	}
  ]
}
