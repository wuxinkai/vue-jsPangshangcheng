// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//局部引入  Swipe 轮播图
import {
  Button,
  Row,
  Col,
  Search, //搜索
  Swipe, //轮播图
  SwipeItem,
  Lazyload, //懒加载
  List, //列表
  NavBar, //返回按钮
  Field, //表单
} from 'vant'
Vue.use(Button).use(Row).use(Col).use(Search).use(Swipe).use(SwipeItem).use(Lazyload).use(List).use(NavBar).use(Field)
import 'vant/lib/index.css'

//引入手机端插件
// import Vant from 'Vant'
// import 'vant/lib/index.css'
// Vue.use(Vant)


//全局引入 商品推荐横向滚动插件
// import VueAwesomeSwiper from 'vue-awesome-swiper'
// import 'swiper/dist/css/swiper.css'
// Vue.use(VueAwesomeSwiper,/* { default global options } */)


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
