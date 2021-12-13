// import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/admin/login.html',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/admin/userInfo.html',
    method: 'get'
    // params: { token }
  })
}

export function getRules() {
  return request({
    url: '/admin/getUserRuleList.html',
    method: 'get'
    // params: { token }
  })
}

export function editPwd(data) {
  return request({
    url: '/admin/editPassword.html',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/admin/logout.html',
    method: 'post'
  })
}
