import request from '@/utils/request'

const api = {
  // 根据ID获取机构部门信息
  GetById: '/api/Operation/Department/GetById',
  // 获取全部机构部门信息
  GetAll: '/api/Operation/Department/GetAll',
  // 修改机构部门信息
  updateinfo: '/api/Operation/Department/UpdateInfo',
  // 新增机构部门信息
  Create: '/api/Operation/Department/create',
  // 删除机构部门信息
  Delete: '/api/Operation/Department/delete'
}
/**
 * @description 根据ID获取部门信息
 * @param  {String} id
 */
export function GetById(id) {
  return request({
    url: api.GetById,
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    },
    params: {
      id
    }
  })
}

/**
 * @description 获取全部部门信息
 */
export function GetAll() {
  return request({
    url: api.GetAll,
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

/**
 * @description 修改部门
 */
export function updateinfo(obj) {
  return request({
    url: api.updateinfo,
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: obj
  })
}

/**
 * @description 新增部门
 */
export function Create(obj) {
  return request({
    url: api.Create,
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: obj
  })
}

/**
 * @description 删除部门
 */
export function Delete(id) {
  return request({
    url: api.Delete,
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      id
    }
  })
}
