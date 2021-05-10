<template>
  <div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="课程id" prop="cosId">
        <el-input v-model="ruleForm.cosId"></el-input>
      </el-form-item>
      <el-form-item label="课程名" prop="cosName">
        <el-input v-model="ruleForm.cosName"></el-input>
      </el-form-item>
      <el-form-item label="课程教师id" prop="cosTeaId">
        <el-input v-model="ruleForm.cosTeaId"></el-input>
      </el-form-item>
      <el-form-item label="课程所属学院" prop="cosApart">
        <el-select v-model="ruleForm.cosApart" placeholder="请选择学院">
          <el-option label="信息管理学院" value="信息管理学院"></el-option>
          <el-option label="金融学院" value="金融学院"></el-option>
          <el-option label="软件学院" value="软件学院"></el-option>
          <el-option label="体育学院" value="体育学院"></el-option>
          <el-option label="外国语学院" value="外国语学院"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="课程状态" prop="cosSta">
        <el-select v-model="ruleForm.cosSta" placeholder="请选择课程状态">
          <el-option label="必修课" value="必修课"></el-option>
          <el-option label="选修课" value="选修课"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="上课周期" prop="cosDate">
        <el-select
          v-model="value1"
          style="margin-right: 8px"
          placeholder="开始时间"
        >
          <el-option label="1" value="1"></el-option>
          <el-option label="8" value="8"></el-option>
        </el-select>
        ~
        <el-select
          v-model="value2"
          collapse-tags
          style="margin-left: 8px"
          placeholder="结束时间"
        >
          <el-option label="8" value="8"></el-option>
          <el-option label="16" value="16"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="上课时间1" prop="cosTime">
        <el-select
          v-model="value3"
          style="margin-right: 8px"
          placeholder="星期"
        >
          <el-option label="1" value="1"></el-option>
          <el-option label="2" value="2"></el-option>
          <el-option label="3" value="3"></el-option>
          <el-option label="4" value="4"></el-option>
          <el-option label="5" value="5"></el-option>
        </el-select>
        --
        <el-input
          v-model="value4"
          style="margin-left: 8px; width: 200px"
          placeholder="课时"
        ></el-input>
      </el-form-item>
      <el-form-item label="上课时间2" prop="cosTime">
        <el-select
          v-model="value5"
          style="margin-right: 8px"
          placeholder="星期"
        >
          <el-option label="1" value="1"></el-option>
          <el-option label="2" value="2"></el-option>
          <el-option label="3" value="3"></el-option>
          <el-option label="4" value="4"></el-option>
          <el-option label="5" value="5"></el-option>
        </el-select>
        --
        <el-input
          v-model="value6"
          style="margin-left: 8px; width: 200px"
          placeholder="课时"
        ></el-input>
      </el-form-item>
      <el-form-item label="课程学分" prop="cosGra">
        <el-select v-model="ruleForm.cosGra" placeholder="请选择学分">
          <el-option label="1" value="1"></el-option>
          <el-option label="2" value="2"></el-option>
          <el-option label="3" value="3"></el-option>
          <el-option label="4" value="4"></el-option>
          <el-option label="5" value="5"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="上课教室" prop="cosArea">
        <el-input v-model="ruleForm.cosArea"></el-input>
      </el-form-item>
      <el-form-item label="课程容量" prop="cosCap">
        <el-input v-model="ruleForm.cosCap"></el-input>
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
        cosId: '',
        cosName: '',
        cosTeaId: '',
        cosApart: '',
        cosSta: '',
        cosDate: '',
        cosTime: [],
        cosGra: '',
        cosArea: '',
        cosCap: '',
      },
      value1: '',
      value2: '',
      value3: '',
      value4: '',
      value5: '',
      value6: '',
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
      loadingInstance: null,
      rules: {
        cosId: [
          { required: true, message: '请输入课程', trigger: 'blur' },
          { length: 6, validator: checkID, trigger: 'blur' },
        ],
        cosName: [{ required: true, message: '请输入课程名', trigger: 'blur' }],
        cosTeaId: [
          { required: true, message: '请输入教师id', trigger: 'blur' },
          { length: 10, validator: checkID, trigger: 'blur' },
        ],
        cosCap: [{ required: true, message: '请输入容量', trigger: 'blur' }],
        value4: [{ length: 2, validator: checkID, trigger: 'blur' }],
      },
    }
  },
  methods: {
    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.ruleForm.cosDate = this.value1 + '-' + this.value2
          this.ruleForm.cosTime = [
            this.value3 + '-' + this.value4,
            this.value5 + '-' + this.value6,
          ]
          console.log(this.ruleForm)
          this.loadingInstance = this.$loading({
            target: '.el-main',
          })
          this.$store.dispatch('admin/addlessions', this.ruleForm).then(
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
