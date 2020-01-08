import request from '@/utils/request'

const api = {
  GetList: '/api/terminal/DeviceIndex/GetList',
  create: '/api/terminal/DeviceIndex/BatchUpdate',
  UpdateInfo: '/api/terminal/DeviceIndex/UpdateInfo',
  del: '/api/terminal/DeviceIndex/delete',
  GetByDeviceId: '/api/terminal/DeviceIndex/GetByDeviceId',
  GetById: '/api/terminal/DeviceIndex/GetById'
}

// 根据物理设备ID获取设备指标列表
export function GetByDeviceId(obj) {
  return request({
    url: api.GetByDeviceId,
    method: 'get',
    params: obj
  })
}

// 根据ID获取物理设备指标表
export function GetById(id) {
  return request({
    url: api.GetById,
    method: 'get',
    params: {
      id
    }
  })
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

// 新增物理设备指标表
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

// 修改物理设备指标表
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

// 删除物理设备指标表
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

// 获取全部传感器字段映射模板
// export function GetAll() {
//   return request({
//     url: api.GetAll,
//     method: 'get',
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   })
// }

