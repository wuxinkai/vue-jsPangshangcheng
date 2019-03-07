const mongoose = require('mongoose') //引用
const Schema = mongoose.Schema // 声明

const categorySchema = new Schema({
  ID: {
    unique: true,
    type: String
  }, //unique:true 不能重复
  MALL_CATEGORY_NAME: {
    type: String
  },
  IMAGE: {
    type: String
  },
  TYPE: {
    type: Number
  },
  SORT: {
    type: Number
  },
  COMMENTS: {
    type: String
  }
})
mongoose.model('Category',categorySchema) //插入数据量
