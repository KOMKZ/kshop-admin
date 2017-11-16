import lazyLoading from './lazyLoading'

export default {
  name: '产品管理',
  path: "/product",
  meta: {
	icon: 'fa-bar-chart-o',
	expanded: false
  },
  component: lazyLoading('product', true),
  children: [
	{
	  name: '产品列表',
	  path: 'list',
	  component: lazyLoading('product/ProductList'),
	  meta: {
		link: 'product/ProductList.vue'
	  }
	}
  ]
}
