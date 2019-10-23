import request from '@/utils/request'
const Api = {
  SystemConfigList: '/api/Operation/SystemConfig/List',
  SystemConfigUpdate: '/api/Operation/SystemConfig/Update',
  InitTableID: '/api/Operation/SystemConfig/InitTableID'
}

/**
 *@description 系统参数列表
 * @param {Object} obj Query
 * @param {String} obj.keyword 关键字模糊匹配
 * @param {Number} obj.pageIndex  当前页
 * @param {Number} obj.pageSize 每页条数
 */
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

/**
 * @description 修改系统参数值
 * @param {Object} obj
 * @param {Number} obj.id
 * @param {String} obj.value
 */
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

// 初始化缓存中的数据库表格Id值
export function InitTableID() {
  return request({
    url: Api.InitTableID,
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
