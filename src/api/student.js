import request from '@/utils/request'

export function getList () {
  return request({
    url: '/user/list',
    method: 'get'
  })
}

export function getLessons () {
  return request({
    url: '/student/lessions',
    method: 'get'
  })
}

export function delCourses (delCoursesIds) {
  return request({
    url: '/student/delCourses',
    method: 'post',
    data: delCoursesIds
  })
}

export function getCourses (selCoursesId) {
  return request({
    url: '/student/getCourses',
    method: 'post',
    data: selCoursesId
  })
}

export function getReList () {
  return request({
    url: '/user/relist',
    method: 'get'
  })
}
