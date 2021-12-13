import request from '@/utils/request'

export function fetchList(api) {
  return request({
    url: api,
    method: 'get'
  })
}
export function relateFiles(data) {
  return request({
    url: '/admin/media',
    method: 'post',
    data
  })
}
export function unRelateFile(id) {
  return request({
    url: '/admin/media/' + id,
    method: 'delete'
  })
}

