<template>
  <el-container style="height: 100%">
    <!-- 头部 -->
    <el-header style="text-align: right; font-size: 12px">
      <span class="title">江西财经大学信息管理学院</span>
      <el-dropdown trigger="click" @command="handleCommand">
        <span class="el-dropdown-link">
          你好，{{ uName }}<i class="el-icon-setting el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="a">修改密码</el-dropdown-item>
          <el-dropdown-item command="b">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
    <el-container>
      <!-- 左侧栏 -->
      <el-aside width="200px">
        <el-menu default-active="onRoutes()">
          <!-- 如果菜单是true 循环侧栏路由列表 -->
          <template v-for="item in menuData">
            <!-- 这里必须设置index 相当于唯一标识这个菜单标签 -->
            <el-menu-item
              :index="'' + item.meta.funcNode"
              @click="clickMenu(item)"
              :key="item.path"
            >
              <template slot="title">
                {{ item.meta.title }}
              </template>
            </el-menu-item>
          </template>
        </el-menu>
      </el-aside>
      <!-- 内容渲染 -->
      <el-main style="background-color: white">
        <router-view/>
      </el-main>
    </el-container>

    <!-- dialog -->
    <loginUser ref="lU"/>
  </el-container>
</template>

<script>
/* eslint-disable */
import loginUser from './dialog/updatePassword'
export default {
  components: { loginUser },
  data() {
    return {
      userName: '',
      dialogLogin: {
        isShow: false,
      },
      uName: '',
      levelList: null,
    }
  },
  beforeCreate() {
  },
  created() {
    this.getData()
  },
  methods: {
    handleCommand(command) {
      if (command === 'a') {
        this.updatePassword()
      } else if (command === 'b') {
        this.exitLogin()
      }
    },
    clickMenu(item) {
      this.$router.push({ path: item.path }) // 跳转的路由对象
    },
    exitLogin() {
      this.$router.push({ path: '/login' })
      this.$store.commit('user/resetToken')
      location.reload()
    },
    updatePassword() {
      this.$refs.lU.dialogFormVisible = true
    },
    closeDialog() {
      this.dialogLogin.isShow = false
    },
    getData() {
      this.loading = true
      this.uName = this.$store.getters.info.userName
    }
  },
  computed: {
    menuData() {
      return this.$store.state.routes
    },
    onRoutes() {
      //点击时此处高亮
      let path = this.$route.path.replace('/', '')
      return path ? path : '/'
    },
  },
}
</script>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
  position: relative;
}
.title {
  text-align: left;
  font-size: 16px;
  position: absolute;
  left: 5px;
}
.el-aside,
.el-menu,
.el-submenu,
.el-menu-item {
  background-color: rgb(238, 241, 246);
}

.el-menu-item {
  text-align: center;
}
body {
  margin: 0;
}
</style>