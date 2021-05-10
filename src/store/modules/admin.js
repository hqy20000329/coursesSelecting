import { addlessions, addusers, addexams } from '@/api/admin'

const getDefaultState = () => {
  return {
  }
}

const state = getDefaultState()

const mutations = {
}

const actions = {

  // 添加课程
  addlessions ({ commit }, ruleForm) {
    return addlessions(ruleForm)
  },
  // 添加用户
  addusers ({ commit }, ruleForm) {
    return addusers(ruleForm)
  },
  // 添加考试
  addexams ({ commit }, ruleForm) {
    return addexams(ruleForm)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
