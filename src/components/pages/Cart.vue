<template>
  <div>
    <div class="navbar-div">
      <van-nav-bar title="购物车" />
    </div>
    <!--清空购物车-->
    <div class="card-title">
      <van-button
        size="small"
        type="danger"
        @click="clearCart"
        plain
      >清空购物车</van-button>
    </div>
    <!-- 显示购物车商品 -->
    <div class="cart-list">
      <div
        class="pang-row"
        v-for="(item,index) in cartInfo"
        :key="index"
      >
        <div class="pang-img"><img
            :src="item.image"
            width="100%"
          /></div>
        <div class="pang-text">
          <div class="pang-goods-name">{{item.name}}</div>
          <div class="pang-control">
            <!-- van-stepper -->
            <van-stepper v-model="item.count" />
          </div>
        </div>
        <div class="pang-goods-price">￥{{item.price |moneyFilter}}</div>
      </div>
    </div>
    <!--显示总金额-->
    <div class="totalMoney">
      商品总价：￥ {{totalMoney | moneyFilter}}
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import { toMoney } from '@/filter/moneyFilter.js'
export default {
  data() {
    return {
      cartInfo: [], //购物车数据
      isEmpty: false //查看购物车是否为空

    }
  },
  filters: {
    moneyFilter(money) {
      return toMoney(money)
    }
  },
  //计算属性
  computed: {
    totalMoney() {
      let allMoney = 0
      //每一项的单价乘以总价格，监控数据变化
      this.cartInfo.forEach((item, index) => {
        allMoney += item.price * item.count
      });
      // 刷新页面 内容保存
      localStorage.cartInfo = JSON.stringify(this.cartInfo)
      return allMoney
    }
  },
  created() {
    this.getCartInfo()
  },
  methods: {
    //获取传过来的数据
    getCartInfo() {
      //判断是否有这个信息，
      if (localStorage.cartInfo) {
        this.cartInfo = JSON.parse(localStorage.cartInfo)
      }
      console.log(JSON.stringify(this.cartInfo));
      //判断是否为空
      this.isEmpty = this.cartInfo.length > 0 ? true : false
    },
    //清空购物车
    clearCart() {
      localStorage.removeItem('cartInfo')
      this.cartInfo = []
    }
  },
}
</script>
<style scoped>
.card-title {
  height: 2rem;
  line-height: 2rem;
  background-color: #fff;
  border-bottom: 1px solid #e4e7ed;
  padding: 5px;
  text-align: right;
}

.cart-list {
  background-color: #fff;
}
.pang-row {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  padding: 0.5rem;
  font-size: 0.85rem;
  border-bottom: 1px solid #e4e7ed;
}
/* 默认是24格 */
.pang-img {
  flex: 6;
}
.pang-text {
  flex: 14;
  padding-left: 10px;
}
.pang-control {
  padding-top: 10px;
}
.pang-goods-price {
  flex: 4;
  text-align: right;
}
</style>