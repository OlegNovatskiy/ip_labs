import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/laba1',
    name: 'Laba1',
    component: () => import('@/views/Laba1.vue')
  },
  {
    path: '/laba2',
    component: () => import('@/views/Laba2.vue'),
    children: [
      {
        path: '',
        name: 'laba2',
        component: () => import('@/components/laba2/PillsList.vue')
      },
      {
        path: 'basket',
        name: 'basket',
        component: () => import('@/components/laba2/Basket.vue')
      },
      {
        path: 'pill/add',
        name: 'add_pill',
        component: () => import('@/components/laba2/AddPill.vue')
      },
      {
        path: 'orders',
        name: 'pills_orders',
        component: () => import('@/components/laba2/PillsOrders.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
