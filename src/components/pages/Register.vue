<template>
  <div>
    <van-nav-bar title="用户注册" left-text="返回" left-arrow @click-left="goBack" />
    <div class="register-panel">
      <van-field v-model="username" label="用户名" :error-message="usernameErrorMsg" icon="clear" placeholder="请输入用户名" required @click-icon="username = ''" />
      <van-field v-model="password" type="password" :error-message="passwordErrorMsg" label="密码" placeholder="请输入密码" required />
      <div class="register-button">
        <van-button type="primary" @click="registerAction" :loading="openLoading" size="large">马上注册</van-button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import { Toast } from 'vant'
import url from '@/serviceAPI.config.js'
export default {
  data() {
    return {
      openLoading: false, //是否开启用户的Loading 防重复提交
      username: '',
      password: '',
      usernameErrorMsg: '', //当用户名出现错误的提示
      passwordErrorMsg: '', //密码出现错误的验证
    }
  },
  methods: {
    
    //************判断代码验证成功再执行忘数据库写**************
    registerAction() {
      //如果前面没有值后面就不执行，
      debugger
      this.checkForm() && this.axiosRegisterUser()
    },

    //********************验证表单是否错误********************
    checkForm() {
      let isOk = true //这样写是 一次性验证 把所有错误都验证
      if (this.username.length < 5) {
        this.usernameErrorMsg = "用户名不能小于5位"
        isOk = false
      } else {
        this.usernameErrorMsg = ''
      }
      if (this.password.length < 6) {
        this.passwordErrorMsg = "密码不能少于6位"
        isOk = false
      } else {
        this.passwordErrorMsg = ''
      }
      return isOk
    },
    
    //********************回退******************************
    goBack() {
      this.$router.go(-1)
    },
    
    //********************向后台发送数据********************
    axiosRegisterUser() {
      this.openLoading = true //开启加载样式
      if (this.username && this.password) {
        axios({
          url: url.registerUser,
          method: 'post',
          data: {
            userName: this.username,
            password: this.password
          }
        })
          .then(response => { //成功判断
            if (response.data.code == 200) {
              Toast.success(response.data.message)
              //注册成功页面跳转
              this.$router.push('/')
            } else {
              console.log(response.data.message) //注册失败
              this.openLoading = false //关闭
              Toast.fail('注册失败')
            }
          })
          .catch((error) => { //是吧
            console.log(error)
            this.openLoading = false //关闭
          })
      } else {
        Toast.fail('账号或密码不能为空')
        this.openLoading = false
      }
    }
  },
}
</script>
<style scoped>
.register-panel {
  width: 96%;
  border-radius: 5px;
  margin: 20px auto;
  padding-bottom: 50px;
}
.register-button {
  padding-top: 10px;
}
</style>