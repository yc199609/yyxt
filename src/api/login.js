import request from '@/utils/request'

const api = {
  login: '/api/User/OptLogin',
  getInfo: '/api/User/OptWhoami',
  fristChangePwd: '/api/User/InitPassword',
  changePassword: '/api/User/UpdatePasswordByOld',
  logout: '/api/User/logout',
  getImgCode: '/api/User/GetImageCode',
  sendForpwsSMS: '/api/User/SendForgetPasswordSMS',
  updatePswBySMS: '/api/User/UpdatePasswordBySMS'
}

// 登录
export function login(mobile, password) {
  return request({
    url: api.login,
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
    url: api.getInfo,
    method: 'get'
  })
}

// 首次登录修改密码(初始化密码)
export function fristChangePwd(password) {
  return request({
    url: api.fristChangePwd,
    method: 'post',
    headers: {
      'Content-type': 'application/json'
    },
    body: {
      password
    }
  })
}

// 修改密码
export function changePassword(oldPassword, newPassword) {
  return request({
    url: api.changePassword,
    method: 'post',
    headers: {
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
    url: api.logout,
    method: 'get'
  })
}

// 忘记密码 输入电话,显示图片验证码
export function getImgCode(mobile) {
  return request({
    url: api.getImgCode,
    method: 'get',
    query: {
      mobile
    }
  })
}

// 发送忘记密码短信验证码
export function sendForpwsSMS(mobile, imageCode) {
  return request({
    url: api.sendForpwsSMS,
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: {
      mobile,
      imageCode
    }
  })
}

// 根据短信验证码修改密码(重置密码保存)
export function updatePswBySMS(mobile, sms, password) {
  return request({
    url: api.updatePswBySMS,
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: {
      mobile,
      sms,
      password
    }
  })
}
