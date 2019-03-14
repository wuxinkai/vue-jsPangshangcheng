import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [{ //导航
      path: '/main',
      name: 'main',
      component: resolve => require(["@/components/pages/Main.vue"], resolve),
      children: [{
          path: '/shoppingMall',
          name: 'shoppingMall',
          component: resolve => require(["@/components/pages/ShoppingMall.vue"], resolve),
        },
        { //购物车
          path: '/cart',
          name: 'cart',
          component: resolve => require(["@/components/pages/Cart.vue"], resolve),
        },
        { //大小分类 商品
          path: '/gategoryList',
          name: 'gategoryList',
          component: resolve => require(["@/components/pages/CategoryList.vue"], resolve),
        },
      ]
    },
    { //从定向
      path: '/',
      redirect: '/shoppingMall',
    },
    { //注册
      path: '/register',
      name: 'register',
      component: resolve => require(["@/components/pages/Register.vue"], resolve),
    },
    { //登录
      path: '/login',
      name: 'login',
      component: resolve => require(["@/components/pages/Login.vue"], resolve),
    },
    { //商品详情
      path: '/goods',
      name: 'goods',
      component: resolve => require(["@/components/pages/Goods.vue"], resolve),
    },

  ]
})
