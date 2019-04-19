import request from '@/utils/request'
const Api = {
  DataBaseList: '/api/Operation/DataBase/List',
  UpdateBaseInfo: '/api/Operation/DataBase/UpdateBaseInfo',
  UpdateConfigInfo: '/api/Operation/DataBase/UpdateConfigInfo',
  UpdateStatus: '/api/Operation/DataBase/UpdateStatus',
  SystemConfigList: '/api/Operation/SystemConfig/List',
  SystemConfigUpdate: '/api/Operation/SystemConfig/Update'
}

// 数据库列表
export function DataBaseList(keyword) {
  return request({
    url: Api.DataBaseList,
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    },
    params: {
      keyword
    }
  })
}

// 修改数据库信息
export function UpdateBaseInfo(obj) {
  return request({
    url: Api.UpdateBaseInfo,
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: obj
  })
}

// 修改数据库配置信息
export function UpdateConfigInfo(obj) {
  return request({
    url: Api.UpdateConfigInfo,
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: obj
  })
}

// 修改数据库停用状态
export function UpdateStatus(obj) {
  return request({
    url: Api.UpdateStatus,
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: obj
  })
}

