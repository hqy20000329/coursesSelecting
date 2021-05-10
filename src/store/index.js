import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import student from './modules/student'
import getters from './modules/getters'
import teacher from './modules/teacher'
import admin from './modules/admin'
// import permission from './permission'
Vue.use(Vuex)

// export default new Vuex.Store({
//   state: {
//     // 保存公共数据 在设置vuex中的初值时，先从本地存储中取，如果取不到，则初始为空
//     token: getItem('token') || ''
//   },
//   mutations: {
//     saveToken (state, tokenObj) {
//       state.token = tokenObj
//       // 因为刷新会丢失所以进行持久化 调用storage文件里方法
//       setItem('token', tokenObj)
//     },
//     resetToken(){
//       removeItem('token')
//     }
//   },
//   actions: {
//   },
//   modules: {
//   }
// })

const store = new Vuex.Store({
  modules: {
    // app,
    // settings,
    user,
    student,
    teacher,
    admin
    // permission
  },
  getters
})

export default store
