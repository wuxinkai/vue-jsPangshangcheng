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
          <div class="tabCategorySub">
            <van-tabs v-model="active">
              <van-tab
                v-for="(item, index) in categorySub"
                :key="index"
                :title="item.MALL_SUB_NAME"
              >
              </van-tab>
            </van-tabs>
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
export default {
  data() {
    return {
      category: [], //大类存储数据
      categorySub: [],  //小类的内容
      categoryIndex: 0,  //样式设置
      active: 0,  //第一个被激活
    }
  },
  created() {
    this.getCategory()
  },
  mounted() {
    let winHeight = document.documentElement.clientHeight
    document.getElementById("leftNav").style.height = winHeight - 46 + 'px'
  },
  methods: {
    //获取商品大类
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
    //根据大类获取小类内容
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
          } else {
            Toast('服务器错误，数据取得失败')
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    //点击大类的方法
    clickCategory(index, categoryId) {
      this.categoryIndex = index;
      this.getCategorySubByCategoryId(categoryId)
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
</style>
