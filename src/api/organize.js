// 业务系统-机构列表
import request from '@/utils/request'

const api = {
  companyList: '/api/Operation/Company/List',
  getBaseInfoById: '/api/Operation/Company/GetBaseInfoById',
  getConfigById: '/api/Operation/Company/GetConfigById',
  updateConfigItem: '/api/Operation/Company/UpdateConfigItem',
  updateBaseInfo: '/api/Operation/Company/UpdateBaseInfo',
  companyCreate: '/api/Operation/Company/Create',
  getSystemInfoById: '/api/Operation/Company/GetSystemInfoById'
}

// 机构列表
// 获取机构列表
export function companyList(keyword, pageIndex, pageSize) {
  return request({
    url: api.companyList,
    method: 'get',
    pramas: {
      keyword,
      pageIndex,
      pageSize
    }
  })
}

// 获取基本信息
export function getBaseInfoById(id) {
  return request({
    url: api.getBaseInfoById,
    method: 'get',
    pramas: {
      id
    }
  })
}

// 业务参数
export function getConfigById(id, keyword, pageIndex, pageSize) {
  return request({
    url: api.getConfigById,
    method: 'get',
    pramas: {
      id,
      keyword,
      pageIndex,
      pageSize
    }
  })
}

// 修改业务参数
export function updateConfigItem(id, companyId, value) {
  return request({
    url: api.updateConfigItem,
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      id,
      companyId,
      value
    }
  })
}

// 此处没写
// 修改基本信息
export function updateBaseInfo(obj) {
  return request({
    url: api.updateBaseInfo,
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: obj
  })
}

// 创建机构
export function companyCreate(obj) {
  return request({
    url: api.companyCreate,
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: obj
  })
}

// 获取系统设置  机构设置
export function getSystemInfoById(id) {
  return request({
    url: api.getSystemInfoById,
    method: 'get',
    pramas: id
  })
}
