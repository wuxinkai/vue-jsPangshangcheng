const Koa = require('koa')
const app = new Koa()
const { connect,initSchemas } = require('./database/init.js')
const mongoose = require('mongoose')
  
  
  // 必须加冒号
;(async () => {
  await connect()
  //写入数据库
  initSchemas()
  const User = mongoose.model('User')
  let oneUser = new User({ userName: '6666', password: '77777' })
  oneUser.save().then(() => { 
    console.log('插入成功');
  })
  
  //读出已经插入进去的数据
  let  users = await  User.findOne({}).exec()
  console.log(users)
})()

app.use(async (ctx) => {
  ctx.body = '<h1>hello Koa2</h1>'
})

app.listen(3000, () => {
  console.log('[Server] starting at port 3000')
})
