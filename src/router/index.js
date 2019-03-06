import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ShoppingMall',
      component: resolve => require(["@/components/pages/ShoppingMall.vue"], resolve),
    },
    {//注册
      path: '/register',
      name: 'register',
      component: resolve => require(["@/components/pages/Register.vue"], resolve),
    },
    { //登录
      path: '/login',
      name: 'login',
      component: resolve => require(["@/components/pages/Login.vue"], resolve),
    }
  ]
})
