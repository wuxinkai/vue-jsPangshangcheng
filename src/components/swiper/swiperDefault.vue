<template>
  <div>
    <swiper :options="swiperOption2">
      <swiper-slide class="swiper-slide" v-for="(item, index) in slide" :key="index">
        Slide {{item}}
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>
<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
// 横向滚动 和 分页器
export default {
  data() {
    return {
      slide: [1, 2, 3, 4, 5, 6],
      swiperOption2: {
        loop:true, //无线循环 滚动
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
        },
      }
    }
  },
  components: { swiper, swiperSlide }
}
</script>
<style scoped>
  .swiper-slide{
      height: 4rem;
      text-align: center;
      line-height: 4rem;
  }
</style>