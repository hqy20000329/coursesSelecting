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
      <el-form-item label="课程id" prop="cosId">
        <el-input v-model="ruleForm.cosId"></el-input>
      </el-form-item>
      <el-form-item label="活动时间" prop="examDate">
        <el-col :span="11">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="ruleForm.examDate"
            style="width: 100%"
          ></el-date-picker>
        </el-col>
      </el-form-item>

      <el-form-item label="考场" prop="examArea">
        <el-input v-model="ruleForm.examArea"></el-input>
      </el-form-item>

      <el-form-item label="座位号" prop="examSeat">
        <el-input v-model="ruleForm.examSeat"></el-input>
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

    return {
      ruleForm: {
        userId: '',
        cosId: '',
        userName: '',
        examDate: '',
        examArea: '',
        examSeat: '',
      },
      loadingInstance: null,
      rules: {
        userId: [
          { required: true, message: '请输入用户id', trigger: 'blur' },
          { length: 10, validator: checkID, trigger: 'blur' }
        ],
        cosId: [
          { required: true, message: '请输入课程id', trigger: 'blur' },
          { length: 6, validator: checkID, trigger: 'blur' }
        ],
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        examDate: [{ required: true, message: '请输入日期', trigger: 'blur' }],
        examArea: [
          { required: true, message: '请输入考场', trigger: 'blur' },
          { length: 4, validator: checkID, trigger: 'blur' }
        ],
        examSeat: [
          { required: true, message: '请输入座位号', trigger: 'blur' },
          { length: 2, validator: checkID, trigger: 'blur' }
        ]
      }
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
          this.$store.dispatch('admin/addexams', this.ruleForm).then(
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
