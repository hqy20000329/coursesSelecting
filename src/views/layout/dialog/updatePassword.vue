<template>
  <el-dialog title="修改密码" :visible="dialogFormVisible" :show-close="false">
    <el-form
      :model="resetForm"
      :rules="resetFormRules"
      ref="resetForm"
      status-icon
      label-width="100px"
    >
      <el-form-item label="旧密码：" prop="password">
        <el-input
          type="password"
          v-model="resetForm.password"
          auto-complete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="新密码：" prop="newpwd">
        <el-input
          type="password"
          v-model="resetForm.newpwd"
          auto-complete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码：" prop="newpassword1">
        <el-input
          type="password"
          v-model="resetForm.newpassword1"
          auto-complete="off"
        ></el-input>
      </el-form-item>
      <!-- <el-form-item> -->

      <!-- </el-form-item> -->
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click.native.prevent="toAmend"
        >确认修改</el-button
      >
      <el-button
        type="primary"
        @click="closeDialog"
        style="color: #000; background-color: #eee; border-color: #000"
        >取消</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
/* eslint-disable */
// import store from '@/store/'
// import { getUsername } from "@/utils/auth";//这是我个人调用封装获取当前账户的username，不作参考
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入新密码'))
      } else if (value.toString().length < 6 || value.toString().length > 18) {
        callback(new Error('密码长度为6-18位'))
      } else {
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.resetForm.newpwd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      resetForm: {
        //传给后台所需要的参数
        newpassword1: '',
        password: '',
        username: '',
      },
      dialogFormVisible: false,

      resetFormRules: {
        password: [
          { required: true, message: '请输入旧密码', trigger: 'blur' },
        ],
        newpwd: [{ required: true, validator: validatePass, trigger: 'blur' }],
        newpassword1: [
          { required: true, validator: validatePass2, trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    toAmend() {
      this.$refs.resetForm.validate((valid) => {
        if (valid) {
          this.$store
            .dispatch('user/updatePwd', {
              account: this.resetForm.username,
              password: this.resetForm.password,
            })
            .then((res) => {
              if (res.data.code === 200) {
                this.$message.success('修改成功,3秒后跳转到登录页！')
                setTimeout(() => {
                  this.logout() //调用跳转到登陆页的方法
                }, 3000)
              }
            })
            .catch(() => {})
        }
      })
    },
    closeDialog() {
      this.dialogFormVisible = false
    },
    //这是修改成功后重新返回登陆页的方法
    logout() {
      this.$router.push({ path: '/login' })
      this.$store.commit('user/resetToken')
    },
  },
}
</script>
 
<style lang="scss" scoped>
.el-form {
  width: 80%;
  margin: 25px auto 0;
  text-align: center;
  button {
    margin: 10px 20px;
  }
}
</style>
 