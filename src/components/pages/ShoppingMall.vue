<template>
  <div>
    <!-- 搜索 -->
    <div class="search-bar">
      <van-row gutter="5">
        <van-col span="3"><img :src="locationIcon" width="80%" class="location-icon" /></van-col>
        <van-col span="16">
          <input type="text" class="search-input" />
        </van-col>
        <van-col span="5">
          <van-button size="mini">查找</van-button>
        </van-col>
      </van-row>
    </div>

    <!-- 轮播图 -->
    <div class="swiper-area">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(banner,index) in bannerPicArray" :key="index">
          <!-- <img :src="banner.imageUrl" width="100%"/> -->
          <!-- lazy懒加载 -->
          <img v-lazy="banner.imageUrl" width="100%" />
        </van-swipe-item>
      </van-swipe>
    </div>

    <!-- 横向图标 -->
    <div class="type-bar">
      <div v-for="(cate,index) in category" :key="index">
        <img v-lazy="cate.image" width="90%" />
        <span>{{cate.mallCategoryName}}</span>
      </div>
    </div>

    <!-- 广告条 -->
    <div class="ad-banner">
      <img v-lazy="adBanner.PICTURE_ADDRESS" width="100%">
    </div>

    <!-- 商品推荐 -->
    <div class="recommend-area">
      <div class="recommend-title">
        商品推荐
      </div>
      <div class="recommend-body">
        <swiper :options="swiperOption">
          <swiper-slide v-for=" (item ,index) in recommendGoods" :key="index">
            <div class="recommend-item">
              <img :src="item.image" width="80%" />
              <div>{{item.goodsName}}</div>
              <!-- <div>￥{{item.price }} (￥{{item.mallPrice}})</div> -->
              <div>￥{{item.price | moneyFilter}} (￥{{item.mallPrice|moneyFilter}})</div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>

    <!--  -->
    <swiperDefault></swiperDefault>
    <swiper2Default></swiper2Default>
    <swiper3Default></swiper3Default>

    <!-- 不规则的布局 -->
    <floor-component :floorData="floor1" :floorTitle="floorName.floor1"></floor-component>
    <floor-component :floorData="floor2" :floorTitle="floorName.floor2"></floor-component>
    <floor-component :floorData="floor3" :floorTitle="floorName.floor3"></floor-component>

    <!-- 热卖商品 -->
    <div class="hot-area">
      <div class="hot-title">热卖商品</div>
      <div class="hot-goods">
        <van-row gutter="0">
          <van-col span="12" v-for="(item,index) in hotGoods" :key="index">
            <goods-info :goodsId="item.goodsId" :goodsImage="item.image" :goodsName="item.name" :goodsPrice="item.price"></goods-info>
          </van-col>
        </van-row>
      </div>
    </div>
  </div>
</template>
<script> 

import axios from 'axios'

//局部应用  商品推荐 需要在components 注册
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import swiperDefault from './../swiper/swiperDefault'
import swiper2Default from './../swiper/swiper2Default'
import swiper3Default from './../swiper/swiper3Default'
import floorComponent from './../component/floorComponent'

import { toMoney } from '@/filter/moneyFilter.js'
import goodsInfo from '../component/goodsInfoComponent'
import url from '@/serviceAPI.config.js'
export default {
  name: 'HelloWorld',
  data() {
    return {
      swiperOption: {
        // loop:true, //无线循环 滚动
        //http://idangero.us/swiper/api/ 
        slidesPerView: 3, //页面视觉呈现多少个
      },//设置商品推荐横向滚动样式
      locationIcon: require('&/images/location.png'), //图标
      bannerPicArray: [ //轮播图
        { imageUrl: require('&/images/banner1.jpg') },
        { imageUrl: require('&/images/banner2.jpg') },
        { imageUrl: require('&/images/banner3.jpg') },
        { imageUrl: require('&/images/banner4.jpg') },
      ],
      category: [], //数据
      adBanner: "",
      recommendGoods: [],
      floor1: [],
      floor2: [],
      floor3: [],
      floorName: {},
      hotGoods: [] //热卖商品
    }
  },
  created() {
    //加载内容
    axios({
      url: url.getShoppingMallInfo,
      method: 'get',
    }).then(response => {
      console.log(response);
      if (response.status == 200) {
        this.category = response.data.data.category;
        this.adBanner = response.data.data.advertesPicture
        this.recommendGoods = response.data.data.recommend
        this.floor1 = response.data.data.floor1//楼层1数据
        this.floor2 = response.data.data.floor2//楼层2数据
        this.floor3 = response.data.data.floor3//楼层3数据
        this.floorName = response.data.data.floorName
        this.hotGoods = response.data.data.hotGoods           //热卖商品
      }
    }).catch((error) => { })
  },
  filters: {
    //moneyFilter自己写一个方法
    moneyFilter(money) {
      return toMoney(money)
    }
  },
  components: {
    swiper,
    swiperSlide,
    swiperDefault,
    swiper2Default,
    swiper3Default,
    floorComponent,
    goodsInfo
  }
}
</script>


<style scoped>
.search-bar {
  height: 2.2rem;
  overflow: hidden;
  background-color: #e5017d;
  line-height: 2.2rem;
}
.search-input {
  width: 100%;
  height: 1.3rem;
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
  border-bottom: 1px solid 1px !important ;
  background-color: #e5017d;
  color: #fff;
}
.location-icon {
  padding-top: 0.2rem;
  padding-left: 0.3rem;
}

/** 清楚浮动 **/
.swiper-area {
  width: 20rem;
  clear: both;
}
/* css3 横向布局 */
.type-bar {
  background-color: #fff;
  margin: 0 0.3rem 0.3rem 0.3rem;
  border-radius: 0.3rem;
  font-size: 14px;
  display: flex; /*采用flex布局*/
  flex-direction: row; /* 以行进行排列 */
  flex-wrap: nowrap; /* 不换行*/
}
.type-bar div {
  padding: 0.3rem;
  font-size: 12px;
  text-align: center;
  flex: 1 /*平等分布*/
}

/* 商品推荐 */
.recommend-area {
  background-color: #fff;
  margin-top: 0.3rem;
}
.recommend-title {
  border-bottom: 1px solid #eee;
  font-size: 14px;
  padding: 0.2rem;
  color: #e5017d;
}

.recommend-body {
  border-bottom: 1px solid #eee;
}
.recommend-item {
  width: 99%;
  border-right: 1px solid #eee;
  font-size: 12px;
  text-align: center;
}

.hot-area {
  text-align: center;
  font-size: 14px;
  height: 1.8rem;
  line-height: 1.8rem;
}
.hot-goods{
  padding-bottom: 60px;
}
</style>
