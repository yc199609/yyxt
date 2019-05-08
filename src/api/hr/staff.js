import request from '@/utils/request'

const Api = {
  // 根据员工名字模糊查询
  GetEmployeesByName: '/api/Operation/Employee/GetEmployeesByName',
  // 删除员工信息
  DeleteEmployee: '/api/operation/Employee/delete',
  // 修改员工信息
  UpdateInfo: '/api/operation/Employee/UpdateInfo',
  // 新增员工信息
  Create: '/api/Operation/Employee/create',
  // 根据ID获取员工信息
  GetById: '/api/Operation/Employee/GetById',
  // 新增员工信息
  UpdateEmployeeRoleRight: '/api/Operation/Employee/create'
}

/**
 * @description 根据员工名称模糊查询
 * @param  {String} name 员工名称
 */
export function GetEmployeesByName(obj) {
  return request({
    url: Api.GetEmployeesByName,
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    },
    params: obj
  })
}

/**
 * @description 删除员工
 * @param  {Number} id 员工id
 */
export function DeleteEmployee(id) {
  return request({
    url: Api.DeleteEmployee,
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
 * @description 修改员工信息
 * @param {Object} obj
 * @param {String} name 姓名
 * @param {String} mobile 手机号
 * @param {String} sex 性别
 */
export function UpdateInfo(obj) {
  return request({
    url: Api.UpdateInfo,
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: obj
  })
}

export function Create(obj) {
  return request({
    url: Api.Create,
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: obj
  })
}

export function GetById(id) {
  return request({
    url: Api.GetById,
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    },
    params: {
      id
    }
  })
}

export function UpdateEmployeeRoleRight(obj) {
  return request({
    url: Api.UpdateEmployeeRoleRight,
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: obj
  })
}
