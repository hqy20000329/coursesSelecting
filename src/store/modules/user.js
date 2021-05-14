/* eslint-disable */
import { setItem, getItem, removeItem } from '@/utils/storage.js'
import { login, getInfo, updatePwd, getVer } from '@/api/user.js'

const getDefaultState = () => {
  return {
    token: getItem('token'),
    info: {},
    route: '/info'
  }
}

const state = getDefaultState()

const mutations = {
  resetToken() {
    removeItem('token')
  },
  saveToken(state, tokenObj) {
    console.log('token 保存成功')
    state.token = tokenObj
    console.log(state.token)
    setItem('token', tokenObj)
  },
  setName: (state, name) => {
    state.name = name
  },

}

const actions = {
  // 获取验证码
  getVer() {
    return getVer()
  },
  // 用户登录
  login({ commit }, loginForm) {
    return login(loginForm)
  },

  // 获取信息
  getInfo() {
    let response = getInfo()

    response.then((res) => {
      // console.log('res is',res)
      state.info.userId = res.data.data.userId
      state.info.userName = res.data.data.userName
      state.info.userApart = res.data.data.userApart
      state.info.userMajor = res.data.data.userMajor
      state.info.userClass = res.data.data.userClass
      state.info.userEmail = res.data.data.userEmail
      state.info.role = res.data.data.role
    })
    return response
  },

  // 修改密码
  updatePwd({ commit }, data) {
    return updatePwd(data)
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}