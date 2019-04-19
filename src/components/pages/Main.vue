<template>
  <div>
    <div class="main-div">
      <!-- keep-alive 走缓存不用从新加载页面 -->
      <keep-alive>
        <router-view />
      </keep-alive>

    </div>
    <van-tabbar
      v-model="active"
      @change="changeTabbar(active)"
    >
      <van-tabbar-item icon="shop">首页</van-tabbar-item>
      <van-tabbar-item icon="records">列表页</van-tabbar-item>
      <van-tabbar-item icon="cart">购物车页</van-tabbar-item>
      <van-tabbar-item
        icon="contact"
        info="20"
      >会员中心</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 0,

    }
  },
  created() { //页面初始化调用
    this.changeTabBarActive()
  },
  updated() { //页面发生改变的时候调用，子页面改变也可以调用
    this.changeTabBarActive()
  },
  methods: {
    //设置切换效果
    changeTabbar(active) {
      console.log(active)
      switch (active) {
        case 0:
          this.$router.push({ name: 'shoppingMall' })
          break;
        case 1:
          this.$router.push({ name: 'gategoryList' })
          break;
        case 2:
          this.$router.push({ name: 'cart' })
          break;
        case 3:
          break;
      }
    },
    //配置 选中那一项
    changeTabBarActive() {
      this.nowPath = this.$route.path
      if (this.nowPath == '/cart') {
        this.active = 2;
      }else  if (this.nowPath == '/gategoryList') {
        this.active = 1;
      }
    },
  },
}
</script>
<style scoped>
</style>