const mongoose = require('mongoose')
const Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId //获取id

//创建UserShema
const UserShema = new Schema({
  UserId:ObjectId,
  userName:{unique:true,type:String},
  password: String,
  createAt:{type:Date,default:Date.now()},
  lastLoginAt:{type:Date,default:Date.now()}
})

// 发布模型, User要和数据表的名字一样
mongoose.model('User', UserShema)
