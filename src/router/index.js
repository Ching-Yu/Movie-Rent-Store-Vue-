import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Router from 'vue-router'
import Dashboard from '@/components/pages/Dashboard'
import Products from '@/components/pages/Products'
import Login from '@/components/pages/Login'
import CustomerOrder from '@/components/pages/CustomerOrders'
import Coupon from '@/components/pages/Coupon'
import OrderList from '@/components/pages/OrderList'
import CustomerCheckout from '@/components/pages/CustomerCheckout'

Vue.use(Router)
Vue.use(VueAxios, axios);

export default new Router({
  routes: [
    {
      path: '*',
      redirect: 'login',
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/admin',
      name: 'Dashboard',
      component: Dashboard,
      children: [
        {
          path: 'products',
          name: 'Products',
          component: Products,
          meta: { requiresAuth: true },
        },
        {
          path: 'coupon',
          name: 'coupon',
          component: Coupon,
          meta: { requiresAuth: true },
        },
        {
          path: 'order_list',
          name: 'orderList',
          component: OrderList,
          meta: { requiresAuth: true },
        },
      ]
    },
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
      children: [
        {
          path: 'customer_order',
          name: 'CustomerOrder',
          component: CustomerOrder,
        },
        {
          path: 'customer_checkout/:orderId',
          name: 'CustomerCheckout',
          component: CustomerCheckout,
        }
      ]
    },
  ]
})
