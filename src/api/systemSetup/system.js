import request from '@/utils/request'
const Api = {
  SystemConfigList: '/api/Operation/SystemConfig/List',
  SystemConfigUpdate: '/api/Operation/SystemConfig/Update'
}

// 系统参数列表
export function SystemConfigList(obj) {
  return request({
    url: Api.SystemConfigList,
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    },
    params: obj
  })
}

// 修改系统参数值
export function SystemConfigUpdate(obj) {
  return request({
    url: Api.SystemConfigUpdate,
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: obj
  })
}
