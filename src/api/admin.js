import request from '@/utils/request'

export function addlessions (data) {
  return request({
    url: '/admin/addlessions',
    method: 'post',
    data
  })
}

export function addusers (data) {
  return request({
    url: '/admin/addusers',
    method: 'post',
    data
  })
}

export function addexams (data) {
  return request({
    url: '/admin/addexams',
    method: 'post',
    data
  })
}
