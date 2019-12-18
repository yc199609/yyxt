import request from '@/utils/request'

const api = {
  GetList: '/api/terminal/SensorTemplate/GetList',
  GetAll: '/api/terminal/SensorTemplate/GetAll',
  GetById: '/api/terminal/SensorTemplate/GetById',
  del: '/api/terminal/SensorTemplate/delete',
  UpdateInfo: '/api/teminal/SensorTemplate/UpdateInfo',
  create: '/api/terminal/SensorTemplate/create'
}

// 根据关键字模糊查询
export function GetList(obj) {
  return request({
    url: api.GetList,
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    },
    params: obj
  })
}

// 获取全部传感器字段映射模板
export function GetAll() {
  return request({
    url: api.GetAll,
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

// 根据ID获取传感器字段映射模板
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

// 删除传感器字段映射模板
export function del(id) {
  return request({
    url: api.del,
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      id
    }
  })
}

// 修改传感器字段映射模板
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

// 新增传感器字段映射模板
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
