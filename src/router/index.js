import Vue from 'vue'
import Router from 'vue-router'

// 页面，按需动态加载
// 首页
const Home = resolve => require(['pages/Home/Home.vue'], resolve)
// 闪送超市
const Category = resolve => require(['pages/Category/Category.vue'], resolve)
// 购物车页
const Cart = resolve => require(['pages/Cart/Cart.vue'], resolve)
// 我的页
const Mine = resolve => require(['pages/Mine/Mine'], resolve)
// 登陆页
const Login = resolve => require(['pages/Login/Login'], resolve)



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/category',
      component: Category
    },
    {
      path: '/cart',
      component: Cart
    },
    {
      path: '/mine',
      component: Mine
    },
    {
      path: '/login',
      component: Login
    }
  ]
})