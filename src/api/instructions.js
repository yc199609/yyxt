import request from '@/utils/request'

const api = {
  GetAll: '/api/Terminal/SensorType/GetAll',
  UpdateInfo: '/api/Terminal/SensorType/UpdateInfo',
  create: '/api/Terminal/SensorType/create',
  Delete: '/api/Terminal/SensorType/delete',
  GetList: '/api/Terminal/SensorType/GetList'
}

// 获取全部
export function GetAll() {
  return request({
    url: api.GetAll,
    method: 'get'
  })
}

// 修改指标类型
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

// 新增指标类型
export function create(obj) {
  return request({
    url: api.create,
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: obj
  })
}

// 删除指标类型
export function Delete(id) {
  return request({
    url: api.Delete,
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: id
  })
}

// 根据关键字模糊查询
export function GetList(obj) {
  return request({
    url: api.GetList,
    method: 'get',
    params: obj
  })
}
