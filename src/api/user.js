import request from '@/utils/request'

const api = {
  SendUpdateMobileSMS: '/api/user/SendUpdateMobileSMS',
  updateMobile: '/api/user/updateMobile',
  UpdatePasswordByOld: '/api/User/UpdatePasswordByOld'
}

// 发送修改手机号短信
export function SendUpdateMobileSMS(obj) {
  return request({
    url: api.SendUpdateMobileSMS,
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: obj
  })
}

// 修改手机号
export function updateMobile(obj) {
  return request({
    url: api.updateMobile,
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: obj
  })
}

// 修改密码
export function UpdatePasswordByOld(obj) {
  return request({
    url: api.UpdatePasswordByOld,
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: obj
  })
}
