<template>
  <div style="height: 100%" v-if="render">
    <div>
      <el-table
        ref="multipleTable"
        :data="
          tableData.slice((currentPage - 1) * pagesize, currentPage * pagesize)
        "
        highlight-current-row
        @current-change="handleCurrentChange"
        style="width: 100%"
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
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.row.cosId)"
              v-if="!scope.row.cosflags"
              >选课</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align: center; margin-top: 30px">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          @current-change="current_change"
        >
        </el-pagination>
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
      delCoursesIds: [],
      multipleTable: [],
      selected: [],
      render: false,
      currentPage: 1,
      total: 0,
      pagesize: 10,
      search: '',
      loadingInstance: null,
    }
  },

  beforeCreate() {
    this.$store.dispatch('student/getReList', 1).then((res) => {
      this.tableData = res.data.data.records
      this.total = res.data.data.coursesCount
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
    current_change: function (currentPage) {
      this.currentPage = currentPage
    },
    handleCurrentChange(val) {
      this.currentRow = val
    },
    handleEdit(id) {
      this.$store.dispatch('student/getCourses', id).then(
        () => {
          this.$message({
            message: '选课成功',
            type: 'success',
          })
          location.reload()
        },
        () => {
          this.$message({
            message: '选课失败',
            type: 'error',
          })
        }
      )
    },
  },
}
</script>

<style>
</style>
