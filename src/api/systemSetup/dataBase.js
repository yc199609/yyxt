import request from '@/utils/request'
const Api = {
  DataBaseList: '/api/Operation/DataBase/List',
  UpdateBaseInfo: '/api/Operation/DataBase/UpdateBaseInfo',
  UpdateConfigInfo: '/api/Operation/DataBase/UpdateConfigInfo',
  UpdateStatus: '/api/Operation/DataBase/UpdateStatus',
  SystemConfigList: '/api/Operation/SystemConfig/List',
  SystemConfigUpdate: '/api/Operation/SystemConfig/Update'
}

/**
 * @description  数据库列表
 * @param  {String} keyword 关键字(可不传)
 */
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

/**
 * @description 修改数据库信息
 * @param  {Object} obj
 * @param {Number} obj.id 数据库id
 * @param {String} obj.name 数据库名称
 */
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

/**
 * @description 修改数据库配置信息
 * @param  {Object} obj
 * @param  {Number} obj.id id
 * @param {String} obj.ip
 * @param {Number} obj.port
 * @param {String} obj.userName
 * @param {String} obj.passowrd
 * @param {Number} obj.isDefault 是否是默认数据库 0否 1是
 * @param {String} obj.dbName 数据库名
 */
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

/**
 * @description 修改数据库停用状态
 * @param  {Object} obj
 * @param {Number} id
 * @param {Number} status 停用状态 0停用 100启用
 */
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

