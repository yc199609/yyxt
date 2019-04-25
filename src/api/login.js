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

/**
 * @description 登录
 * @param  {String} {mobile 手机名
 * @param  {String} password}
 */
export function login({ mobile, password }) {
  return request({
    url: api.login,
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: JSON.stringify({
      mobile,
      password
    })
  })
}

/**
 * @description 获取当前信息
 * @param  {String} token
 */
export function getInfo(token) {
  return request({
    url: api.getInfo,
    method: 'get'
  })
}

/**
 * @description 首次登录修改密码(初始化密码)
 * @param  {String} password
 */
export function fristChangePwd(password) {
  return request({
    url: api.fristChangePwd,
    method: 'post',
    headers: {
      'Content-type': 'application/json'
    },
    data: {
      password
    }
  })
}

/**
 * @description 修改密码
 * @param  {String} oldPassword 初始密码
 * @param  {String} newPassword 新密码
 */
export function changePassword(oldPassword, newPassword) {
  return request({
    url: api.changePassword,
    method: 'post',
    headers: {
      'Content-type': 'application/json'
    },
    data: {
      oldPassword,
      newPassword
    }
  })
}

/**
 * @description 退出登录
 */
export function logout() {
  return request({
    url: api.logout,
    method: 'get'
  })
}

/**
 * @description 忘记密码 输入电话,显示图片验证码
 * @param  {String} mobile 电话
 */
export function getImgCode(mobile) {
  return request({
    url: api.getImgCode,
    method: 'get',
    params: {
      mobile
    }
  })
}

/**
 * @description 发送忘记密码短信验证码
 * @param  {String} mobile 手机号
 * @param  {String} imageCode 图片验证码
 */
export function sendForpwsSMS(mobile, imageCode) {
  return request({
    url: api.sendForpwsSMS,
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      mobile,
      imageCode
    }
  })
}

/**
 * @description  根据短信验证码修改密码(重置密码保存)
 * @param  {String} mobile 手机号
 * @param  {String} sms 短信验证码
 * @param  {String} password 密码
 */
export function updatePswBySMS(mobile, sms, password) {
  return request({
    url: api.updatePswBySMS,
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      mobile,
      sms,
      password
    }
  })
}
