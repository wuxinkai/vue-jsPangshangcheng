<template>
  <div>
    <!-- 头部 -->
    <div>
      <div class="navbar-div">
        <van-nav-bar title="类别列表" />
      </div>
    </div>
    <!-- 左右布局 -->
    <div>
      <van-row>
        <van-col span="6">
          <!-- 左侧大类列表 -->
          <div id="leftNav">
            <ul>
              <li
                v-for="(item,index) in category"
                :key="index"
                :class="{categoryActive:categoryIndex==index}"
                @click="clickCategory(index,item.ID)"
              >
                {{item.MALL_CATEGORY_NAME}}
              </li>
            </ul>
          </div>
        </van-col>
        <van-col span="18">
          <!-- 头部小类菜单 -->
          <div class="tabCategorySub">
            <van-tabs
              v-model="active"
              @click="onClickCategorySub"
            >
              <van-tab
                v-for="(item, index) in categorySub"
                :key="index"
                :title="item.MALL_SUB_NAME"
              >
              </van-tab>
            </van-tabs>
          </div>
          <!-- 上拉加载  v-mode正在加载 finished控制是否还有数据-->
          <!-- 下拉刷新 van-pull-refresh -->
          <!-- 中间内容部分 -->
          <div id="list-div">
            <van-pull-refresh
              v-model="isRefresh"
              @refresh="onRefresh"
            >
              <van-list
                v-model="loading"
                :finished="finished"
                @load="onLoad"
              >
                <div
                  class="list-item"
                  v-for="(item,index) in goodList"
                   @click="goGoodsInfo(item.ID)" 
                  :key="index"
                >
                  <div class="list-item-img"><img
                      :src="item.IMAGE1"
                      width="100%"
                      :onerror="errorImg"
                    /></div>
                  <div class="list-item-text">
                    <div>{{item.NAME}}</div>
                    <div class="">￥{{item.ORI_PRICE | moneyFilter}}</div>
                  </div>
                </div>
              </van-list>
            </van-pull-refresh>
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import { Toast } from 'vant'
import url from '@/serviceAPI.config.js'
import { toMoney } from '@/filter/moneyFilter.js'
export default {
  data() {
    return {
      category: [], //大类存储数据
      categorySub: [],  //小类的内容
      categoryIndex: 0,  //样式设置
      active: 0,  //第一个被激活
      list: [], //存储加载的内容
      loading: false,   //上拉加载使用
      finished: false,  //上拉加载是否没有数据了
      isRefresh: false, //下拉加载
      page: 1,  //商品列表页数
      goodList: [], // 商品列表信息
      categorySubId: '', //获取商品子类id
      errorImg: 'this.src="' + require('&/images/default.png') + '"',
    }
  },
   filters: {
    moneyFilter(money) {
      return toMoney(money)
    }
  },
  created() {
    this.getCategory()
  },
  mounted() {
    let winHeight = document.documentElement.clientHeight
    document.getElementById("leftNav").style.height = winHeight - 46 -50 + 'px'
    document.getElementById("list-div").style.height = winHeight - 90- 50 + 'px'
  },
  methods: {
    //（1）--------------左侧列表 页面加载获取商品大类列表----------------- 
    getCategory() {
      axios({
        url: url.getCategoryList,
        method: 'get'
      }).then(response => {
        if (response.data.code == 200 && response.data.message) {
          this.category = response.data.message
          console.log(this.category);
          //当我们获得大类的时候，调用一下小类,获得的是大类第一个值得id
          this.getCategorySubByCategoryId(this.category[0].ID)
        } else {
          Toast('数据获取失败')
        }
      }).catch(error => {
        console.log(error)
      })
    },
    //（1.2）-----------------点击左侧列表 获取头部子类列表---------------
    clickCategory(index, categoryId) {
      this.categoryIndex = index;
      //点击大类的时候也要把分页设置成1，
      this.page = 1
      this.finished = false //到底效果清空
      this.goodList = [] //小类列表清空
      this.getCategorySubByCategoryId(categoryId)
    },
    //（2）******************* 通过id 获取头部子类列表 **************************
    getCategorySubByCategoryId(categoryId) {
      axios({
        url: url.getCategorySubList,
        method: 'post',
        data: { categoryId: categoryId }
      })
        .then(response => {
          if (response.data.code == 200 && response.data.message) {
            this.categorySub = response.data.message
            this.active = 0 //切换数据默认样式归0
            this.categorySubId = this.categorySub[0].ID
            this.onLoad()
          } else {
            Toast('服务器错误，数据取得失败')
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    // (2.1) *******************点击子类的列表，获取详细内容*******************
    onClickCategorySub(index, title) {
      this.categorySubId = this.categorySub[index].ID;
      console.log(this.categorySubId)
      this.goodList = []
      this.finished = false //到底部了
      this.page = 1  //从第一页开始
      this.onLoad() //调用
    },
    // （3）++++++++++++++++++通过id 调用详情页面的方法 +++++++++++++++++++++++++++++++++++++++++
    onLoad() {
      setTimeout(() => {
        //刚进入页面是没有 categorySubId 我们需要进行判断 ,如果没有进从子类数据中的第一个的id
        this.categorySubId = this.categorySubId ? this.categorySubId : this.categorySub[0].ID
        this.getGoodList()
      }, 500)

    },
    // (4)  +++++++++++++ 详情页面的方法 ++++++++++++++++++++++++++++++++++++++++++++
    getGoodList() {
      axios({
        url: url.getGoodsListByCategorySubID,
        method: 'post',
        data: {
          categorySubId: this.categorySubId,
          page: this.page
        }
      }).then(response => {
        console.log(response);
        if (response.data.code == 200 && response.data.message.length) {
          //每次调用都会增加到下一页
          this.page++
          //将两次请求的数据添加到一个数组中
          this.goodList = this.goodList.concat(response.data.message)
        } else {
          this.finished = true //已经没有数据了
        }
        this.loading = false; //请求完毕
      }).catch(error => {
        console.log(error);
      })
    },

    // @@@@@@@@@@@@@@@@@@@@@@@   详情页面 下拉刷新 事件 ，需要延时  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    onRefresh() {
      setTimeout(() => {
        this.isRefresh = false;
        this.finished = false; //设置成 false才能从新加载 
        this.goodList = [];
        this.page = 1 //情况数据
        this.onLoad() //再调用加载数据
      }, 500);
    },

    // 跳转到商品详情页  发送 \pages\Goods.vue
    goGoodsInfo(id){
     this.$router.push({name:'goods',params:{goodsId:id}})
    }
  }
}
</script>
<style>
#leftNav {
  background: #f1f1f1;
}
#leftNav ul li {
  line-height: 2rem;
  border-bottom: 1px solid #e4e7ed;
  padding: 3px;
  font-size: 0.8rem;
  text-align: center;
}
.categoryActive {
  background-color: #fff;
}
#list-div {
  overflow: scroll;
}

.list-item {
  display: flex;
  flex-direction: row;
  font-size: 0.8rem;
  border-bottom: 1px solid #f0f0f0;
  background-color: #fff;
  padding: 5px;
}
#list-div {
  overflow: scroll;
}
.list-item-img {
  flex: 8;
}
.list-item-text {
  flex: 16;
  text-align: left;
  line-height: normal !important;
  margin-top: 10px;
  margin-left: 10px;
}
</style>
