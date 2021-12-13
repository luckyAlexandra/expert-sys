import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/admin/cert_list',
    method: 'get',
    params: query
  })
}

export function fetchItem(id) {
  return request({
    url: '/admin/cert/' + id,
    method: 'get'
  })
}

export function deleteItem(id) {
  return request({
    url: '/admin/cert/' + id,
    method: 'delete'
  })
}

export function createItem(data) {
  return request({
    url: '/admin/cert',
    method: 'post',
    data
  })
}

export function updateItem(data) {
  return request({
    url: '/admin/cert',
    method: 'put',
    data
  })
}
