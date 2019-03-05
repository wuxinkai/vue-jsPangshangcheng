const Koa = require('koa')
const app = new Koa()
const { connect,initSchemas } = require('./database/init.js')
const mongoose = require('mongoose')
  
  
  // 必须加冒号
;(async () => {
  await connect()
  initSchemas()
  const User = mongoose.model('User')
  let oneUser = new User({ userName: '5555', password: '5555' })
  oneUser.save().then(() => { 
    console.log('插入成功');
  })
})()

app.use(async (ctx) => {
  ctx.body = '<h1>hello Koa2</h1>'
})

app.listen(3000, () => {
  console.log('[Server] starting at port 3000')
})
