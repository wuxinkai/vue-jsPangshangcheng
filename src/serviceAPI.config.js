const BASEURL = "https://www.easy-mock.com/mock/5c7006fba0b64b7d17824c17/SmileVue/"
const LOCALURL = "http://localhost:3000/"
const URL = {
  getShoppingMallInfo:BASEURL+'index',
  getGoodsInfo: BASEURL + 'getGoodsInfo',
  registerUser:LOCALURL+'user/register',   //用户注册接口
  login:LOCALURL+'user/login',   //用户登录接口
  getDetailGoodsInfo:LOCALURL+'goods/getDetailGoodsInfo',   //获取商品详情接口
  getCategoryList:LOCALURL+'goods/getCategoryList',   //获取大类商品
  getCategorySubList:LOCALURL+'goods/getCategorySubList',   //获取小类商品
}
module.exports = URL