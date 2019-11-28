import request from '@/utils/request'

const api = {
  GetList: '/api/terminal/Protocal/GetList',
  GetAll: '/api/terminal/Protocal/GetAll',
  GetById: '/api/terminal/Protocal/GetById',
  delete: '/api/terminal/Protocal/delete',
  UpdateInfo: '/api/terminal/Protocal/UpdateInfo',
  create: '/api/terminal/Protocal/create'
}

// 根据关键字模糊查询
export function GetList(obj) {
  return request({
    url: api.GetList,
    method: 'get',
    params: obj
  })
}

// 获取全部通信协议
export function GetAll() {
  return request({
    url: api.GetAll,
    method: 'get'
  })
}

// 根据ID获取通信协议
export function GetById(id) {
  return request({
    url: api.GetById,
    method: 'get',
    params: {
      id
    }
  })
}

// 删除通信协议
export function Delete(id) {
  return request({
    url: api.delete,
    method: 'post',
    data: {
      id
    }
  })
}

// 修改通信协议
export function UpdateInfo(obj) {
  return request({
    url: api.UpdateInfo,
    method: 'post',
    data: obj
  })
}

// 新增通信协议
export function create(obj) {
  return request({
    url: api.create,
    method: 'post',
    data: obj
  })
}
