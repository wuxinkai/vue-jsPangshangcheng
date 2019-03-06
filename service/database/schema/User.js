const mongoose = require('mongoose')
const Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId //获取id
const bcrypt = require('bcrypt') //加密模块
let SALT_WORK_FACTOR =10 //加盐
//创建UserShema
const UserShema = new Schema({
  UserId:ObjectId,
  userName:{unique:true,type:String},
  password: String,
  createAt:{type:Date,default:Date.now()},
  lastLoginAt:{type:Date,default:Date.now()}
})
//加密处理
UserShema.pre('save', function(next){
  //let user = this
  console.log(this)
  bcrypt.genSalt( SALT_WORK_FACTOR,(err,salt)=>{
      if(err) return next(err)
      bcrypt.hash(this.password,salt, (err,hash)=>{
          if(err) return next(err)
          this.password = hash
          next()
      }) 
  })
})

//密码比对的方法  methods是实例方法 必须用new 才能用
UserShema.methods = {
  //_password 数据库密码 , password 当前密码
  comparePassword:(_password,password)=>{
      return new Promise((resolve,reject)=>{
          bcrypt.compare(_password,password,(err,isMatch)=>{
              if(!err) resolve(isMatch)
              else reject(err)
          })
      })
  }
}

// 发布模型, User对应的是数据库里的users 这个表名字
// 大写的U变成了小写u，h后面又加了个s
mongoose.model('User', UserShema)
