import { getCourses, getStudents } from '@/api/teacher'

const getDefaultState = () => {
  return {
  }
}

const state = getDefaultState()

const mutations = {
}

const actions = {

  // 查看课程
  getCourses () {
    return getCourses()
  },
  // 查看学生
  stuMan ({ commit }, cosId) {
    return getStudents(cosId)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
