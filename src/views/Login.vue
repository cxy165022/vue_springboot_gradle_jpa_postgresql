<template>
  <div id="main">
    <div id="login">
      <transition name="slideright">
        <div class="login">
          <div class="logo-info">
            <img class="logo" src="../assets/login_logo.png" alt="logo">
          </div>
          <!-- .logo-info -->
          <ComForm ref="login" :elem="loginElem" :model="login" :rules="loginRule" @on-submit="handleLogin('login')"></ComForm>

        </div>
      </transition>
    </div>
    <!-- #login -->
    <div class="line"></div>
    <div class="yong"></div>
    <div class="copy">
      <p>Copyright © 2016-2018 秦始皇帝陵博物馆 版权所有</p>
      <p>陕西天润科技股份有限公司 技术支持</p>
    </div>
  </div>
</template>
<script>
  /* eslint-disable key-spacing */

  import ax from '@/config/axios'
  import {
    login
  } from '@/services/app'

  export default {
    name: 'Login',
    data: () => ({
      // 表单元素数组(登录)
      loginElem: [{
        prop: 'user',
        placeholder: 'Username',
        name: '用户名'
      }, {
        prop: 'pwd',
        placeholder: 'Password',
        type: 'password',
        name: '密 码'
      }, /* {
        prop: 'yzm',
        placeholder: '验证码',
        name:"验证码",
        yzm:true
      }, */ {
      button: [{
          long: true,
          name: 'submit',
          type: 'primary',
          visible: true,
          text: '登 录'
        }]
      }],
      // 表单数据对象(登录)
      login: {
        user: 'zhang',
        pwd: '123456'
      },
      // 表单验证规则(登录)
      loginRule: {
        user: [{
          required: true,
          message: 'Please fill in the username',
          trigger: 'blur'
        }],
        pwd: [{
          required: true,
          message: 'Please fill in the password',
          trigger: 'blur'
        }]
      }
    }),
    mounted() {

    },
    methods: {
      handleLogin(name) {
        this.$refs[name].validate(valid => {
          if (valid) {
            // 配置默认接口地址
            ax.defaults.baseURL = localStorage.getItem('newURL') || this.baseURL
            // 用户登录
            this.$store.commit('LOADING', true)
            const para = Object.assign({}, this.login)
            // 模拟异步请求
            setTimeout(() => {
              login(para).then(res => {
                // 获取用户信息
                let user = {user_id: res.user.userid, auth_token: res.auth_token, real_name: res.user.name, account: res.user.account, gender: res.user.gender, email: res.user.email, telephone: res.user.telephone}
                sessionStorage.setItem('user', JSON.stringify(user))
                sessionStorage.setItem('auth_token', res.auth_token)
                // 获取菜单列表
                this.$store.dispatch('handleMenu')
                this.$store.dispatch('handleProject')
                this.$store.commit('LOADING', false)
              }).catch(() => {
                this.$store.commit('LOADING', false)
              })
            }, 800)
          }
        })
      }
    }
  }
</script>
<style lang="less" scoped>
  #main{
    width: 100%;
    height: 768px;
    display: block;
    background: #212121;
    position: relative;
    .line{
      width: 100%;
      height: 20px;
      background: url("../assets/loginbgline.png") repeat-x center;
      position: absolute;
      top:50%;
      margin-top: -10px;
      z-index: 1;
    }
    .yong{
      width:60%;
      height: 60vh;
      background: url("../assets/loginyong.png") no-repeat center;
      position: absolute;
      background-size:contain;
      top:50%;
      margin-top: -30vh;
      z-index: 2;
      left: 50%;
      margin-left: -50%;
    }
    .copy{
      width: 100%;
      position: absolute;
      bottom: 12px;
      border-top: 1px #353535 solid;
      padding-top: 12px;
      p{
        color: #353535;
        text-align: center;
      }
    }
  }
  #login {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 305px;
    height: 355px;
    margin: -204px 0 0 -15px;
    box-shadow: 0 0 100px rgba(0, 0, 0, 0.08);
    z-index: 9;
    #com-form{
      background: #5a5a5a;
      padding: 24px;
      position: relative;
      &:after{
        position: absolute;
        content: "";
        width: 305px;
        height: 20px;
        background: url("../assets/loginbgline.jpg") no-repeat;
        left: 0;
        bottom: 0px;
      }
      .ivu-form-item-content{
        span{
          color: #fff;
        }
      }
    }
    /* 过渡动画 */
    &.slideleft-enter-active, &.slideright-enter-active {
      transition: all 0.5s;
      transform: translateX(0);
    }
    &.slideleft-enter, &.slideright-enter {
      opacity: 0;
    }
    & .slideleft-leave-active, & .slideright-leave-active {
      transition: all 0.5s;
      opacity: 0;
    }
    & .slideleft-leave, & .slideright-leave {
      transform: translateX(0);
    }
    & .slideleft-enter, & .slideright-leave-active {
      transform: translateX(300px);
    }
    & .slideleft-leave-active, & .slideright-enter {
      transform: translateX(-300px);
    }
    /* end */
    & .login {
      position: absolute;
      width: 305px;
      .logo-info {
        height: 87px;
        margin-bottom: 22px;
        text-align: center;
      }
    }
  }
</style>
