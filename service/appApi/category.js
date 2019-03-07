const Koa = require('koa')
const app = new Koa()

const Router = require('koa-router')
let router = new Router()

const mongoose = require('mongoose')
const fs = require('fs')


//获取接口 
router.get('/insertAllCategory', async (ctx) => {
  fs.readFile('./data_json/category.json', 'utf8', (err, data) => {
    data = JSON.parse(data)
    let saveCount = 0;
    const Category = mongoose.model('Category') //插入数据的字段名字
    data.RECORDS.map((value, index) => {
      console.log(value);
      let newCategory = new Category(value)
      newCategory.save().then(() => {
        saveCount++
        console.log('成功' + saveCount);
      }).catch(error => {
        console.log('失败' + error);
      })
    })
  })
  ctx.body = '开始导入数据'
})

//子页面的 接口获取
router.get('/insertAllCategorySub',async(ctx)=>{
  fs.readFile('./data_json/category_sub.json','utf8',(err,data)=>{
      data = JSON.parse(data)
      let saveCount = 0 
      const CategorySub = mongoose.model('CategorySub')
      data.RECORDS.map((value,index)=>{
          console.log(value)
          let newCategorySub = new CategorySub(value)
          newCategorySub.save().then(()=>{
              saveCount++
              console.log('成功插入'+saveCount)
          }).catch(error=>{
              console.log('插入失败:'+error)
          })
      }) 
  })
  ctx.body="开始导入数据"
})


module.exports = router


//启动项目后，
//启动项目后执行 http://localhost:3000/category/insertAllCategory
//启动项目后执行 http://localhost:3000/category/insertAllCategorySub
