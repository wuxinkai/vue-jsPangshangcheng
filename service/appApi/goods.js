const Koa = require('koa')
const app = new Koa()

const Router = require('koa-router')
let router = new Router()

const mongoose = require('mongoose')
const fs = require('fs')

//获取商品接口
router.get('/insertAllGoodsInfo', async (ctx) => {
  fs.readFile('./data_json/newGoods.json', 'utf8', (err, data) => {
    data = JSON.parse(data)
    let saveCount = 0
    const Goods = mongoose.model('Goods')
    //插入数据库
    data.map((value, index) => {
      console.log(value)
      let newGoods = new Goods(value)
      newGoods.save().then(() => {
        saveCount++
        console.log('成功' + saveCount)
      }).catch(error => {
        console.log('失败：' + error)
      })
    })
  })
  ctx.body = "开始导入数据"
})

// 获取商品详情的接口 需要传递数据所以用post
router.post('/getDetailGoodsInfo', async (ctx) => {
  // //通过商品的id 获取商品详情 ，查找详情
  // let goodsId = ctx.request.body.goodsId
  // const Goods = mongoose.model('Goods')
  // //通过id查询
  // await Goods.findOne({ ID: goodsId }).exec()
  //   .then(async (result) => { 
  //     ctx.body={code:200,message:result}
  //   }).catch(error => { 
  //     console.log(error);
  //     ctx.body={code:500,message:error}
  //   })

  //第二种写法
  try {
    let goodsId = ctx.request.body.goodsId
    const Goods = mongoose.model('Goods')
    let result = await Goods.findOne({
      ID: goodsId
    }).exec()
    ctx.body = {
      code: 200,
      message: result
    }
  } catch (err) {
    ctx.body = {
      code: 500,
      message: err
    }
  }
})


//读取大类接口
router.get('/getCategoryList', async (ctx) => {
  try {
    //database\schema\Category.js 定义的 Category 
    const Category = mongoose.model('Category')
    let result = await Category.find().exec()
    //返回给前端
    ctx.body = {
      code: 200,
      message: result
    }

  } catch (error) {
    ctx.body = {
      code: 500,
      message: error
    }
  }
})

// 获取小类信息，通过大类获取小类
router.post('/getCategorySubList', async (ctx) => {
  try {
    let categoryId = ctx.request.body.categoryId
    const CategorySub = mongoose.model('CategorySub')
    let result = await CategorySub.find({
      MALL_CATEGORY_ID: categoryId
    }).exec()
    ctx.body = {
      code: 200,
      message: result
    }
  } catch (err) {
    ctx.body = {
      code: 500,
      message: err
    }
  }
})

//根据类别获取商品列表
router.get('/getGoodsListByCategorySubID', async (ctx) => {
  try {
    // let categorySubId = ctx.request.body.categorySubId //小类别
    // let page = ctx.request.body.page
    // let num = 10 //每页显示数量
    // let start = (page - 1) * num
    let categorySubId = '2c9f6c946016ea9b016016f79c8e0000'
    const Goods = mongoose.model('Goods')
   //数据库查找
    let result = await Goods.find({
        SUB_ID: categorySubId
      }).exec()
    ctx.body = {
      code: 200,
      message: result
    }
  } catch (err) {
    ctx.body = {
      code: 500,
      message: err
    }
  }

})

module.exports = router;

//启动项目后执行 http://localhost:3000/goods/insertAllCategory
