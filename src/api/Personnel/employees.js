import request from '@/utils/request'

const api = {
  // 根据ID获取员工信息
  GetById: '/api/Operation/Employee/GetById',
  // 新增员工信息
  Create: '/api/Operation/Employee/create',
  // 修改员工信息
  UpdateInfo: '/api/operation/Employee/UpdateInfo',
  // 根据员工名字模糊查询
  GetEmployeesByName: '/api/Operation/Employee/GetEmployeesByName',
  // 删除员工信息
  DeleteEmployee: '/api/operation/Employee/delete'
}

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

export function UpdateInfo(obj) {
  return request({
    url: api.UpdateInfo,
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: obj
  })
}

export function DeleteEmployee(id) {
  return request({
    url: api.DeleteEmployee,
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      id
    }
  })
}

export function GetEmployeesByName(obj) {
  return request({
    url: api.GetEmployeesByName,
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    },
    params: obj
  })
}

