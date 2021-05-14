import request from '@/utils/request'

export function login (data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export function getVer () {
  return request({
    url: '/captcha',
    method: 'post'
  })
}

export function getInfo () {
  return request({
    url: '/info',
    method: 'post'
  })
}

export function updatePwd (data) {
  return request({
    url: 'user/update',
    method: 'post',
    data
  })
}

// export function getInfo(token) {
//   return request({
//     url: '/vue-element-admin/user/info',
//     method: 'post',
//     params: { token }
//   })
// }
