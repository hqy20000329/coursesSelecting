<template>
  <div style="height: 100%">
    <div>
      <el-table
        ref="multipleTable"
        :data="tableData"
        style="width: 100%"
        height="100%"
        highlight-current-row
        @current-change="handleCurrentChange"
        v-show="render"
      >
        <el-table-column prop="cosId" label="课程号" width="90" align="center">
        </el-table-column>
        <el-table-column
          prop="cosName"
          label="课程名"
          width="180"
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
        <el-table-column prop="cosStu" label="现有人数" align="center">
        </el-table-column>
        <el-table-column align="left">
          <!-- eslint-disable-next-line -->
          <template slot="header" slot-scope="scope">
            <el-button v-show="studentsTable.length">返回</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-table
        ref="multipleTable"
        :data="studentsTable"
        style="width: 100%"
        height="100%"
        v-show="studentsTable.length"
      >
        <el-table-column prop="userId" label="学号" width="90" align="center">
        </el-table-column>
        <el-table-column prop="userName" label="姓名" align="center">
        </el-table-column>
        <el-table-column prop="userSex" label="性别" align="center">
        </el-table-column>
        <el-table-column prop="userApart" label="开设学院" align="center">
        </el-table-column>
        <el-table-column prop="userMajor" label="专业" align="center">
        </el-table-column>
        <el-table-column prop="userClass" label="班级" align="center">
        </el-table-column>
        <el-table-column align="left">
          <!-- eslint-disable-next-line -->
          <template slot="header" slot-scope="scope">
            <el-button @click="exit">返回</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  data() {
    return {
      tableData: [],
      multipleTable: [],
      render: false,
      studentsTable: [],
      loadingInstance: null,
    }
  },
  beforeCreate() {
    this.$store.dispatch('teacher/getCourses').then((res) => {
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
    handleCurrentChange(row) {
      this.render = false
      this.loadingInstance = this.$loading({
        target: '.el-main',
      })
      this.$store.dispatch('teacher/getStudents', row.cosId).then((res) => {
        this.studentsTable = res.data.data
        this.$nextTick(() => {
          // 以服务的方式调用的 Loading 需要异步关闭
          this.loadingInstance.close()
        })
      })
    },
    exit(){
      this.studentsTable = []
      this.render = true
    }
  },
}
</script>

<style>
</style>
