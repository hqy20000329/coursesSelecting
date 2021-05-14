import request from '@/utils/request'

export function getList () {
  return request({
    url: '/user/list',
    method: 'post'
  })
}

export function getLessons () {
  return request({
    url: '/student/lessions',
    method: 'post'
  })
}

export function delCourses (delCoursesIds) {
  return request({
    url: '/student/delCourses',
    method: 'post',
    data: delCoursesIds
  })
}

export function getCourses (data) {
  return request({
    url: '/student/getCourses',
    method: 'post',
    data
  })
}

export function getReList () {
  return request({
    url: '/user/relist',
    method: 'post'
  })
}

export function getadmission () {
  return request({
    url: '/student/getadmission',
    method: 'post'
  })
}
