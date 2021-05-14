import request from '@/utils/request'

export function getCourses () {
  return request({
    url: '/teacher/getCourses',
    method: 'post'
  })
}

export function getStudents (cosId) {
  return request({
    url: '/teacher/stuMan',
    method: 'post',
    data: cosId
  })
}
