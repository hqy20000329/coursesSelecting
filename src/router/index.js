import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

Vue.use(Router)

const asyncRouterMap = [
  {
    path: '/info',
    component: () => import('@/views/layout/info.vue'),
    meta: {
      title: '个人信息',
      funcNode: '1',
      role: ['student', 'teacher', 'admin']
    }
  }, {
    path: '/select',
    component: () => import('@/views/student/select.vue'),
    meta: {
      title: '选课',
      funcNode: 'stu1',
      role: 'student'
    }
  },
  {
    path: '/selected',
    component: () => import('@/views/student/selected.vue'),
    meta: {
      title: '已选课程',
      funcNode: 'stu2',
      role: 'student'
    }
  },
  {
    path: '/recommend',
    component: () => import('@/views/student/recommend.vue'),
    meta: {
      title: '课程推荐',
      funcNode: 'stu3',
      role: 'student'
    }
  },
  {
    path: '/lessons',
    component: () => import('@/views/teacher/lessons'),
    meta: {
      title: '课程查看',
      funcNode: 't1',
      role: 'teacher'
    }
  },
  {
    path: '/addusers',
    component: () => import('@/views/admin/addusers'),
    meta: {
      title: '添加用户',
      funcNode: 'a1',
      role: 'admin'
    }
  },
  {
    path: '/addlessons',
    component: () => import('@/views/admin/addlessons'),
    meta: {
      title: '添加课程',
      funcNode: 'a2',
      role: 'admin'
    }
  }
  // {
  //   path: '/addexams',
  //   component: () => import('@/views/admin/addexams'),
  //   meta: {
  //     title: '添加考试',
  //     funcNode: 'a3',
  //     role: 'admin'
  //   }
  // }
]

export const constantRouterMap = [
  {
    path: '/',
    redirect: 'login',
    meta: {
      mune: false
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login.vue'),
    meta: {
      meta: false
    }
  },
  {
    path: '/user',
    name: 'layoutYHGL',
    component: () => import('@/views/layout/Layout.vue'),
    meta: {
      title: '用户',
      icon: 'el-icon-user',
      menu: true,
      funcNode: '0'
    },
    children: asyncRouterMap
  },
  {
    name: 'refresh',
    path: '/refresh',
    component: () => import('@/utils/refresh')
  }
]

const createRouter = () => new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

const router = createRouter()

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  } else {
    if (store.getters.token) { // 判断是否有token
      if (store.getters.info.role === undefined) { // 判断当前用户是否已拉取完user_info信息
        store.dispatch('user/getInfo').then(res => { // 拉取info
          const async = asyncRouterMap.filter(
            (item) => item.meta.role.indexOf(res.data.data.role) !== -1
          )
          console.log('根据权限获取路由', async.map(item => item.meta.title))
          router.addRoutes(async)
          store.state.routes = async
          next({ ...to, replace: true }) // hack方法 确保addRoutes已完成
          // console.log(router)
        }).catch(err => {
          console.log(err)
        })
      } else {
        next() // 当有用户权限的时候，说明所有可访问路由已生成 如访问没权限的全面会自动进入404页面
      }
    } else {
      // if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      //   next();
      // } else {
      next('/login') // 否则全部重定向到登录页
      // }
    }
  }
})

export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
