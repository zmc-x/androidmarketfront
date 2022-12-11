import Vue from 'vue'
import VueRouter from 'vue-router'
import UserLogin from '@/views/Login.vue'
import user from '@/views/user.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: UserLogin,
  },
  {
    path: '/user',
    component: user,
  },
  {
    path: '/user/addresses',
    component: () => import('@/views/addresses.vue')
  },
  {
    path: '/',
    component: () => import('@/views/home.vue'),
    redirect: '/home'
  },
  {
    path: '/home',
    component: () => import('@/views/home.vue')
  },
  {
    path: '/user/shoppingcart',
    component: () => import('@/views/cart.vue')
  },
  {
    path: '/category',
    component: () => import('@/views/category.vue')
  },
  {
    path: '/addAddress',
    component: () => import('@/views/addaddress.vue')
  },
  {
    path: '/editAddress',
    name: 'editAddress',
    component: () => import('@/views/editaddress.vue')
  },
  {
    path: '/updatepassword',
    component: () => import('@/views/updatepassword.vue')
  },
  {
    path: '/createorder',
    name: 'createorder',
    component: () => import('@/views/createorder.vue')
  },
  {
    path: '/user/myorder',
    component: () => import('@/views/order.vue')
  },
  {
    path: '/user/orderdetail',
    component: () => import('@/views/orderdetail.vue')
  },
  {
    path: '/goodsdetail/:id/:specificationid',
    component: () => import('@/views/goodsdetail.vue')
  },
  {
    path: '/product/:goodsname',
    component: () => import('@/views/product.vue')
  }
]

const router = new VueRouter({
  routes
})
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch(err => err)
}
export default router
