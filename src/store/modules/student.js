import { getList, getLessons, delCourses, getCourses, getReList, getadmission } from '@/api/student'

const getDefaultState = () => {
  return {
    lessons: []
  }
}

const state = getDefaultState()

const mutations = {
}

const actions = {
  // 退选
  delCourses ({ commit }, delCoursesIds) {
    // console.log(delCoursesIds)
    return delCourses(delCoursesIds)
  },
  // 获取已选课程
  getLessons () {
    return getLessons()
  },
  // 导出课表
  getadmission () {
    return getadmission()
  },
  // 获取全部课程
  getList () {
    return getList()
  },
  // 学生选课
  getCourses ({ commit }, selCoursesId) {
    return getCourses(selCoursesId)
  },
  // 课程推荐
  getReList () {
    return getReList()
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
