<template>
  <div>
    <!-- 商品详情页面 接收参数 发起请求 -->
    <div class="navbar-div">
      <van-nav-bar
        title="商品详情"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div>
      <div class="topimage-div">
        <img
          :src="goodsInfo.IMAGE1"
          width="100%"
        />
      </div>
      <div class="goods-name">{{goodsInfo.NAME}}</div>
      <div class="goods-price">价格：￥{{goodsInfo.PRESENT_PRICE | moneyFilter}}</div>
      <div>
        <van-tabs swipeable sticky>
          <van-tab title="商品详情">
            <div
              class="detail"
              v-html="goodsInfo.DETAIL"
            >
            </div>
          </van-tab>
          <van-tab title="评价">
            正在制作中
          </van-tab>
        </van-tabs>
      </div>
      <div class="goods-bottom">
        <div>
          <van-button
            size="large"
            type="primary"
          >加入购物车</van-button>
        </div>
        <div>
          <van-button
            size="large"
            type="danger"
          >直接购买</van-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import url from '@/serviceAPI.config.js'
import { toMoney } from '@/filter/moneyFilter.js'
import { Toast } from 'vant'
export default {
  data() {
    return {
      goodsId: '',
      goodsInfo: {},   //存储商品详细数据
    }
  },
  filters: {
    moneyFilter(money) {
      return toMoney(money)
    }
  },
  created() {
    //获取 src\components\component\goodsInfoComponent.vue 穿过来的参数
    this.goodsId = this.$route.query.goodsId
    console.log(this.goodsId)

    this.getInfo()
  },
  methods: {
    //接收参数后发起请求
    getInfo() {
      axios({
        url: url.getDetailGoodsInfo,
        method: 'post',
        data: {
          goodsId: this.goodsId //传递的参数
        }
      })
        .then(response => {
          if (response.data.code == 200 && response.data.message) {
            this.goodsInfo = response.data.message
          } else {
            Toast('服务器错误，数据取得失败')
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    onClickLeft() {
      //返回上一个页面
      this.$router.go(-1)
    }
  },
}
</script>
<style scoped>
.detail {
  font-size: 0px;
}
.goods-name {
  background-color: #fff;
}
.goods-price {
  background-color: #fff;
}
.van-tabs--line {
  padding-top: 52px;
}

.goods-bottom{
    position: fixed;
    bottom:0px;
    left:0px;
    background-color: #FFF;
    width:100%;
    /*按钮布局*/
    display: flex;
    flex-direction: row;
    flex-flow: nowrap;
}
.goods-bottom > div{
    flex:1; /*平均分配*/
    padding:5px;
}
</style>