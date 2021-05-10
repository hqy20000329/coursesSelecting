import request from '@/utils/request'

export function getCourses () {
  return request({
    url: '/teacher/getCourses',
    method: 'get'
  })
}

export function getStudents (cosId) {
  return request({
    url: '/teacher/getStudents',
    method: 'get',
    data: cosId
  })
}
