import request from '@/utils/request'

const api = {
  GetList: '/api/terminal/Cmd/GetList',
  GetAll: '/api/terminal/Cmd/GetAll',
  GetById: '/api/terminal/Cmd/GetById',
  delete: '/api/terminal/Cmd/delete',
  UpdateInfo: '/api/terminal/Cmd/UpdateInfo',
  create: '/api/terminal/Cmd/create',
  GetByProtocalId: '/api/terminal/Cmd/GetByProtocalId'
}

// 根据关键字模糊查询
export function GetList(obj) {
  return request({
    url: api.GetList,
    method: 'get',
    params: obj
  })
}

// 获取全部协议指令
export function GetAll() {
  return request({
    url: api.GetAll,
    method: 'get'
  })
}

// 根据ID获取协议指令
export function GetById(id) {
  return request({
    url: api.GetById,
    method: 'get',
    params: {
      id
    }
  })
}

// 根据协议id获取指令
export function GetByProtocalId(protocalId) {
  return request({
    url: api.GetByProtocalId,
    method: 'get',
    params: {
      protocalId
    }
  })
}

// 删除协议指令
export function Delete(id) {
  return request({
    url: api.delete,
    method: 'post',
    data: {
      id
    }
  })
}

// 修改协议指令
export function UpdateInfo(obj) {
  return request({
    url: api.UpdateInfo,
    method: 'post',
    data: obj
  })
}

// 新增协议指令
export function create(obj) {
  return request({
    url: api.create,
    method: 'post',
    data: obj
  })
}
