import request from '@/utils/request'
const Api = {
  GetEmployeesByName: '/api/Company/Employee/GetEmployeesByName',
  DeleteEmployee: '/api/Company/Employee/delete',
  UpdateInfo: '/api/Company/Employee/UpdateInfo',
  Create: '/api/Company/Employee/create',
  GetById: '/api/Company/Employee/GetById',
  UpdateEmployeeRoleRight: '/api/company/employee/updateEmployeeRoleRight'
}

/**
 * @description 根据员工名称模糊查询
 * @param  {String} name 员工名称
 */
export function GetEmployeesByName(name) {
  return request({
    url: Api.GetEmployeesByName,
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    },
    params: {
      name
    }
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
