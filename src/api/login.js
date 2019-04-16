import request from '@/utils/request'

// 登录
export function login(mobile, password) {
  return request({
    url: '/api/User/OptLogin',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: {
      mobile,
      password
    }
  })
}

// 获取当前信息
export function getInfo(token) {
  return request({
    url: '/api/User/OptWhoami',
    method: 'get'
  })
}

// 修改密码
export function changePassword(oldPassword, newPassword) {
  return request({
    url: '/api/User/UpdatePasswordByOld',
    method: 'post',
    header: {
      'Content-type': 'application/json'
    },
    body: {
      oldPassword,
      newPassword
    }
  })
}

// 退出登录
export function logout() {
  return request({
    url: '/api/User/logout',
    method: 'get'
  })
}
