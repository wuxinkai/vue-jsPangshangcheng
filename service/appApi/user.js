const Router = require('koa-router')
let router = new Router()

//数据库
const mongoose = require('mongoose')

router.get('/', async (ctx) => {
  ctx.body = "这是用户操作首页"
})

//提交表达 接口
router.post('/register', async (ctx) => {

  //取得Model User是E:\A学习盘database\schema\User.js 文件夹的名字
  const User = mongoose.model('User')

  //把从前端接收的POST数据封装成一个新的user对象
  //讲内容写入数据库的方法
  let newUser = new User(ctx.request.body)

  //用mongoose的save方法直接存储，然后判断是否成功，返回前端相应的结果
  //写入数据库后的返回结果
  await newUser.save().then(() => {
    //成功返回code=200，并返回成功信息
    ctx.body = {
      code: 200,
      message: '注册成功'
    }
  }).catch(error => {
    //失败返回code=500，并返回错误信息
    ctx.body = {
      code: 500,
      message: error
    }
  })
})

//登录接口
router.post('/login', async (ctx) => {
  //得到前端传递过来的数据
  let loginUser = ctx.request.body //前端传过来的对象
  console.log(loginUser)
  let userName = loginUser.userName
  let password = loginUser.password
  //引入User的model 
  const User = mongoose.model('User')
  //查找名字
  await User.findOne({
    userName: userName
  }).exec().then(async (result) => {
    //判断用户名是否存在，如果存在就再比对密码
    if (result) {
      let newUser = new User() //因为是实例方法，所以要new出对象，才能调用
      await newUser.comparePassword(password, result.password) //comparePassword 再\database\schema\User.js 文件里的方法
        .then((isMatch) => {
          //返回比对结果
          ctx.body = {
            code: 200,
            message: isMatch
          }
        }).catch(error => {
          //出现异常，返回异常
          console.log(error)
          ctx.body = {
            code: 500,
            message: error
          }
        })
    } else {

    }
  }).catch(error => {
    console.log(error)
    ctx.body = {
      code: 500,
      message: error
    }
  })
})

module.exports = router;
