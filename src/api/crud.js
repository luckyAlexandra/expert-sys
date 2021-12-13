import request from '@/utils/request'

export function fetchList(apiName, query) {
  return request({
    url: `/admin/${apiName}_list`,
    method: 'get',
    params: query
  })
}

export function fetchItem(apiName, id) {
  return request({
    url: `/admin/${apiName}/${id}`,
    method: 'get'
  })
}

export function deleteItem(apiName, id) {
  return request({
    url: `/admin/${apiName}/${id}`,
    method: 'delete'
  })
}

export function createItem(apiName, data) {
  return request({
    url: `/admin/${apiName}`,
    method: 'post',
    data
  })
}

export function updateItem(apiName, data) {
  return request({
    url: `/admin/${apiName}`,
    method: 'put',
    data
  })
}

export function sendRequest(apiName, method = 'GET', id, query, data, responseType) {
  const url = apiName.startsWith('http://') || apiName.startsWith('https://') || apiName.startsWith('/upload') ? apiName : id ? `/admin/${apiName}/${id}` : `/admin/${apiName}`
  return request({
    url,
    method,
    params: query,
    data,
    responseType
  })
}
