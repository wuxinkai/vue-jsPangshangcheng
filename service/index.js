const Koa = require('koa')
const app = new Koa()
const {
  connect,
  initSchemas
} = require('./database/init.js')
const mongoose = require('mongoose')

// 数据传递将字符串转为对象
const bodyParser = require('koa-bodyparser')
app.use(bodyParser());

//解决跨域
const cors = require('koa2-cors')
app.use(cors())
//路由
const Router = require('koa-router')
let user = require('./appApi/user.js')
let goods = require('./appApi/goods.js')
let category = require('./appApi/category.js')

//装载路由
let router = new Router();
router.use('/user', user.routes())
router.use('/goods', goods.routes())
router.use('/category',category.routes())
//加载路由中间件
app.use(router.routes())
app.use(router.allowedMethods())

// 必须加冒号
;
(async () => {
  await connect()
  //写入数据库
  initSchemas()

})()

app.use(async (ctx) => {
  ctx.body = '<h1>hello Koa2</h1>'
})

app.listen(3000, () => {
  console.log('[Server] starting at port 3000')
})
