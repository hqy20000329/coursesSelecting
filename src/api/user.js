import request from '@/utils/request'

export function login (data) {
  return request({
    url: '/login',
    method: 'get',
    data
  })
}

export function getInfo () {
  return request({
    url: '/info',
    method: 'get'
  })
}

export function updatePwd (data) {
  return request({
    url: '/updatePwd',
    method: 'post',
    data
  })
}
