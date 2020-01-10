import request from '@/utils/request'

const api = {
  getAllTerminalType: '/api/Terminal/TerminalType/GetAll',
  createTerminalType: '/api/Terminal/TerminalType/create',
  updateTerminalType: '/api/Terminal/TerminalType/UpdateInfo',
  deleteTerminalType: '/api/Terminal/TerminalType/Delete',
  getByIdTerminalType: '/api/Terminal/TerminalType/GetById'
}

// 获取全部设备类型
export function getAllTerminalType() {
  return request({
    url: api.getAllTerminalType,
    method: 'get'
  })
}

// 新增终端类型
export function createTerminalType(obj) {
  return request({
    url: api.createTerminalType,
    method: 'post',
    data: obj
  })
}

// 修改终端类型
export function updateTerminalType(obj) {
  return request({
    url: api.updateTerminalType,
    method: 'post',
    data: obj
  })
}

// 删除终端类型
export function deleteTerminalType(id) {
  return request({
    url: api.deleteTerminalType,
    method: 'post',
    data: {
      id
    }
  })
}

// 根据ID获取设备类型
export function getByIdTerminalType(id) {
  return request({
    url: api.getByIdTerminalType,
    method: 'get',
    params: {
      id
    }
  })
}
