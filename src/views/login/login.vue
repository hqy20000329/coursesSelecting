<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h1 class="title">Login</h1>
      </div>

      <el-form-item prop="account">
        <span class="svg-container">
          <i class="el-icon-user-solid"></i>
        </span>
        <el-input
          ref="account"
          v-model="loginForm.account"
          placeholder="学号"
          name="account"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-tooltip
        v-model="capsTooltip"
        content="大写开启"
        placement="right"
        manual
      >
        <el-form-item prop="password">
          <span class="svg-container">
            <i class="el-icon-lock"></i>
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="密码"
            name="password"
            tabindex="2"
            auto-complete="on"
            @keyup.native="checkCapslock"
            @blur="capsTooltip = false"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <i class="el-icon-view"></i>
          </span>
        </el-form-item>
      </el-tooltip>

      <el-form-item>
         <span class="svg-container" style="float: left">
          <i class="el-icon-key"></i>
        </span>
        <el-input
          class="ver"
          name="vericode"
          v-model="loginForm.vercode"
          type="text"
          tabindex="3"
          placeholder="验证码"
        />
        <img :src="ver" @click="showVer" style="width: 100px; height:47px;float:right">
      </el-form-item>
      <el-button
        :loading="loading"
        type="primary"
        class="btn"
        @click="handleLogin"
        >登录</el-button
      >
    </el-form>
    <div class="footer">
      <p>江西财经大学</p>
      <p>信息管理学院</p>
      <p>朱文宇、谢天琪</p>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  data () {
    var checkID = (rule, value, callback) => {
      setTimeout(() => {
        if (value.length !== 10) {
          callback(new Error('学号必须为10位'))
        } else {
          if (isNaN(Number(value))) {
            callback(new Error('请输入数字值'))
          } else {
            callback()
          }
        }
      }, 1000)
    }
    return {
      loginForm: {
        account: '',
        password: '',
        verkey: '',
        vercode: ''
      },
      ver: '',
      capsTooltip: false,
      passwordType: 'password',
      loading: false,
      loginRules: {
        account: [
          {
            required: true,
            trigger: 'blur',
            message: '请填写学号'
          },
          { type: 'string', validator: checkID, trigger: 'blur' }
        ],
        password: [
          {
            required: true,
            trigger: 'blur',
            message: '请填写密码'
          },
          { min: 6, message: '密码至少为6位', trigger: 'blur' }
        ],
        vercode: [{
          required: true,
          trigger: 'blur',
          message: '请填写验证码'
        }
        ]
      }
    }
  },
  created () {
    this.showVer()
  },
  methods: {
    checkCapslock ({ shiftKey, key } = {}) {
      if (key && key.length === 1) {
        if (
          (shiftKey && key >= 'a' && key <= 'z') ||
          (!shiftKey && key >= 'A' && key <= 'Z')
        ) {
          this.capsTooltip = true
        } else {
          this.capsTooltip = false
        }
      }
      if (key === 'CapsLock' && this.capsTooltip === true) {
        this.capsTooltip = false
      }
    },
    showPwd (e) {
      console.log(e)
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    showVer () {
      this.$store.dispatch('user/getVer').then(res => {
        if (res.data.code === 200) {
          this.loginForm.verkey = res.data.data.key
          this.ver = res.data.data.image
        } else {
          throw ''
        }
      }), () => {
        this.$message({
          message: '获取验证码失败',
          type: 'warning'
        })
      }
    },
    handleLogin () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true
          // this.loginForm.password = md5.digest('hex') //  加密之后的密码
          // 为了看到加载效果 延迟两秒发送请求
          this.$store.dispatch('user/login', this.loginForm)
            .then((res) => {
              const data = res.data
              console.log(data)
              if (data.code === 200) {
                this.$message({
                  message: '登陆成功',
                  type: 'success'
                })
                this.$store.commit('user/saveToken', data.data)
                setTimeout(() => {
                  this.$router.push({
                    name: 'layoutYHGL'
                  })
                }, 2000)
              } else {
                this.$message({
                  message: '用户名或密码错误',
                  type: 'warning'
                })
                this.loading = false
              }
            })
            .catch((error) => {
              console.log('请求失败')
              this.loading = false
              this.$notify({
                title: '登录提示',
                message: error.message,
                position: 'bottom-right',
                type: 'error'
              })
            })
        } else {
          console.log('error submit!')
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss">
$bg: #283443;
$light_gray: #fff;
$cursor: #889aa4;
@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}
/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      height: 47px;
      &:-webkit-autofill {
        -webkit-text-fill-color: #889aa4 !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$dark_gray: #889aa4;
$light_gray: #eee;
.login-container {
  min-height: 100%;
  width: 100%;
  background-image: linear-gradient(to right, #e3fdf5, #ffe6fa);
  overflow: hidden;
  text-align: center;
  line-height: 130px;
  font-family: Verdana;
  letter-spacing: 0.05em;
  color: #000;
  .el-form-item {
    border-bottom: 2px solid rgb(128, 125, 125);
    background: #fff;
    border-radius: 0px;
    // margin-bottom: 20px;
    .el-input {
      float: left
    }
    .el-input::placeholder {
      text-transform: uppercase;
    }
  }
  .login-form {
    position: absolute;
    background-color: #fff;
    width: 250px;
    height: 500px;
    max-width: 100%;
    padding: 0 50px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    overflow: hidden;
    border-radius: 15px;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 10px;
    float: left;
  }
  .title-container {
    // position: relative;
    .title {
      font-size: 30px;
      font-weight: lighter;
    }
  }
  .btn {
    width: 250px;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }
  .ver {
    display: inline-block;
    width: 60px;
  }
  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
.footer {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translate(-50%,-100%);
  p {
    line-height: 20px;
  }
}
</style>
