import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/admin/userList',
    method: 'get',
    params: query
  })
}

export function fetchItem(id) {
  return request({
    url: '/admin/userInfo.html',
    method: 'get'
  })
}

export function deleteItem(data) {
  return request({
    url: '/admin/delete.html',
    method: 'post',
    data
  })
}

export function createItem(data) {
  return request({
    url: '/admin/edit.html',
    method: 'post',
    data
  })
}
