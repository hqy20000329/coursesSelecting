<template>
  <div style="height: 100%" v-if="render">
    <div>
      <el-table
        ref="multipleTable"
        :data="tableData"
        style="width: 100%"
        height="100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="cosId" label="课程号" width="90" align="center">
        </el-table-column>
        <el-table-column
          prop="cosName"
          label="课程名"
          width="90"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="cosTea" label="授课教师" align="center">
        </el-table-column>
        <el-table-column prop="cosApart" label="开设学院" align="center">
        </el-table-column>
        <el-table-column prop="cosDate" label="上课日期" align="center">
        </el-table-column>
        <el-table-column prop="cosTime" label="上课时间" align="center">
        </el-table-column>
        <el-table-column prop="cosGra" label="学分" align="center">
        </el-table-column>
        <el-table-column prop="cosSta" label="课程描述" align="center">
        </el-table-column>
        <el-table-column prop="cosCap" label="容量" align="center">
        </el-table-column>
      </el-table>
      <div style="margin-top: 20px">
        <el-button @click="delCourses(delCoursesIds)">退选</el-button>
        <el-button @click="getForm">导出课表</el-button>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  data() {
    return {
      tableData: [],
      delCoursesIds: {},
      multipleTable: [],
      render: false,
      loadingInstance: null,
    }
  },
  beforeCreate() {
    this.$store.dispatch('student/getLessons').then((res) => {
      this.tableData = res.data.data
      this.$nextTick(() => {
        // 以服务的方式调用的 Loading 需要异步关闭
        this.loadingInstance.close()
      })
      this.render = true
    })
  },
  created() {
    this.loadingInstance = this.$loading({
      target: '.el-main',
    })
  },
  methods: {
    handleSelectionChange(val) {
      this.delCoursesIds = { cosIds: val.map((item) => item.cosId) }
    },
    delCourses(ids) {
      this.$store.dispatch('student/delCourses', ids).then((res) => {
        this.$message({
          message: '退选成功',
          type: 'success',
        })
        this.$store.state.user.route = '/selected'
          this.$router.replace('/refresh')
      })
    },
    getForm() {
      this.$store.dispatch('student/getadmission').then((res) => {
        let a = document.createElement('a')
        a.download = 'form'
        a.style.display = 'none'
        let url = URL.createObjectURL(res)
        a.href = url
        document.body.appendChild(a)
        a.click()
        URL.revokeObjectURL(url) // 销毁
        document.body.removeChild(a)
      })
    }
  }
}
</script>

<style>
</style>
