import request from '@/utils/request'

const api = {
  GetList: '/api/terminal/SensorTemplate/GetList',
  create: '/api/terminal/CmdField/create',
  UpdateInfo: '/api/terminal/CmdField/UpdateInfo',
  Delete: '/api/terminal/CmdField/delete'
}

// 根据关键字模糊查询
export function GetList(obj) {
  return request({
    url: api.GetList,
    method: 'get',
    params: obj
  })
}

// 新增指令字段
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

// 修改指令字段
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

// 删除指令字段
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
