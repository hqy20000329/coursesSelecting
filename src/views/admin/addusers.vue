<template>
  <div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户id" prop="userId">
        <el-input v-model="ruleForm.userId"></el-input>
      </el-form-item>
      <el-form-item label="用户名" prop="userName">
        <el-input v-model="ruleForm.userName"></el-input>
      </el-form-item>
      <el-form-item label="用户性别" prop="userSex">
        <el-select v-model="ruleForm.userSex" placeholder="请选择用户性别">
          <el-option label="男" value="男"></el-option>
          <el-option label="女" value="女"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户学院" prop="userApart">
        <el-select v-model="ruleForm.userApart" placeholder="请选择学院">
          <el-option label="信息管理学院" value="信息管理学院"></el-option>
          <el-option label="金融学院" value="金融学院"></el-option>
          <el-option label="软件学院" value="软件学院"></el-option>
          <el-option label="体育学院" value="体育学院"></el-option>
          <el-option label="外国语学院" value="外国语学院"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户专业" prop="userMajor">
        <el-input v-model="ruleForm.userMajor"></el-input>
      </el-form-item>
      <el-form-item label="用户班级" prop="userClass">
        <el-input v-model="ruleForm.userClass"></el-input>
      </el-form-item>

      <el-form-item label="身份证" prop="userPer">
        <el-input v-model="ruleForm.userPer"></el-input>
      </el-form-item>
      <el-form-item label="用户邮箱" prop="userEmail">
        <el-input v-model="ruleForm.userEmail"></el-input>
      </el-form-item>
      <el-form-item label="用户权限" prop="role">
        <el-select v-model="ruleForm.role" placeholder="请选择权限">
          <el-option label="学生" value="student"></el-option>
          <el-option label="老师" value="teacher"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
/* eslint-disable */
export default {
  data() {
    var checkID = (rule, value, callback) => {
      setTimeout(() => {
        if (value.length !== rule.length) {
          callback(new Error(`id必须为${rule.length}位`))
        } else {
          if (isNaN(Number(value))) {
            callback(new Error('请输入数字值'))
          } else {
            callback()
          }
        }
      }, 1000)
    }
    var checkIdNum = (rule, value, callback) => {
      const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
      if (!value) {
        return callback(new Error('证件号码不能为空'))
      } else if (!reg.test(value)) {
        return callback(new Error('证件号码不正确'))
      } else {
        callback()
      }
    }
    var checkEmail = (rule, value, callback) => {
    const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
    if (!value) {
      return callback(new Error('邮箱不能为空'))
    }
    setTimeout(() => {
      if (mailReg.test(value)) {
        callback()
      } else {
        callback(new Error('请输入正确的邮箱格式'))
      }
    }, 100)
  }
    return {
      ruleForm: {
        userId: '',
        userName: '',
        userMajor: '',
        userApart: '',
        userSex: '',
        userClass: '',
        userPer: '',
        userEmail: '',
        role: '',
      },
      loadingInstance: null,
      rules: {
        userId: [
          { required: true, message: '请输入用户', trigger: 'blur' },
          { length: 10, validator: checkID, trigger: 'blur' },
        ],
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        userMajor: [
          { required: true, message: '请输入用户专业', trigger: 'blur' },
        ],
        userApart: [
          { required: true, message: '请输入用户学院', trigger: 'blur' },
        ],
        userSex: [
          { required: true, message: '请输入用户性别', trigger: 'blur' },
        ],
        userClass: [
          { required: true, message: '请输入用户班级', trigger: 'blur' },
          { length: 3, validator: checkID, trigger: 'blur' }
        ],
        userPer: [
         { required: true, validator: checkIdNum, trigger: 'blur' }
        ],
        userEmail: [
          { required: true, validator: checkEmail, trigger: 'blur' }
        ],
        role: [{ required: true, message: '请输入用户权限', trigger: 'blur' }],
      },
    }
  },
  methods: {
    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          console.log(this.ruleForm)
          this.loadingInstance = this.$loading({
            target: '.el-main',
          })
          this.$store.dispatch('admin/addusers', this.ruleForm).then(
            () => {
              this.$message({
                message: '添加成功',
                type: 'success',
              })
              this.$nextTick(() => {
                // 以服务的方式调用的 Loading 需要异步关闭
                this.loadingInstance.close()
              })
              location.reload()
            },
            () => {
              this.$nextTick(() => {
                // 以服务的方式调用的 Loading 需要异步关闭
                this.loadingInstance.close()
              })
              this.$message({
                message: '添加失败',
                type: 'error',
              })
            }
          )
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
  },
}
</script>
