import request from '@/utils/request'

const api = {
  GetAll: '/api/Operation/Role/GetAll',
  GetById: '/api/Operation/Role/GetById',
  Create: '/api/Operation/Role/create',
  deleteRole: '/api/Operation/Role/delete',
  GetAllFunction: '/api/Operation/Function/GetAllOptFuncs',
  UpdateRoleRights: '/api/Operation/Role/UpdateRoleRights',
  SaveRoleRights: '/api/Operation/Role/SaveRoleRights'
}

// 获取全部角色信息信息
export function GetAll(obj) {
  return request({
    url: api.GetAll,
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

// 根据id获取角色
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

// 新增角色
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

// 删除角色
export function deleteRole(id) {
  return request({
    url: api.deleteRole,
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      id
    }
  })
}

/**
 * @description 修改角色
 * @param  {Object} obj
 */
export function update(obj) {
  return request({
    url: api.update,
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: obj
  })
}

// 获取全部功能信息
export function GetAllFunction() {
  return request({
    url: api.GetAllFunction,
    method: 'get'
  })
}

// 更新角色与权限信息
export function UpdateRoleRights(obj) {
  return request({
    url: api.UpdateRoleRights,
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: obj
  })
}

// 新增保存角色
export function SaveRoleRights(obj) {
  return request({
    url: api.SaveRoleRights,
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: obj
  })
}
