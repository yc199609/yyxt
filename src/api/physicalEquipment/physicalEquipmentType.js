import request from '@/utils/request'

const api = {
  getPDeviceType: '/api/Operation/PDeviceType/Get',
  getAllPDeviceType: '/api/Operation/PDeviceType/GetAll',
  getByIdPDeviceType: '/api/Operation/PDeviceType/GetById',
  getByIdsPDeviceType: '/api/Operation/PDeviceType/GetByIds',
  createPDeviceType: '/api/Operation/PDeviceType/Create',
  updatePDeviceType: '/api/Operation/PDeviceType/Update',
  deletePDeviceType: '/api/Operation/PDeviceType/Delete'
}

// 获取物理设备类型列表(分页)
export function getPDeviceType(obj) {
  return request({
    url: api.getPDeviceType,
    method: 'get',
    params: obj
  })
}

// 获取所有物理设备类型
export function getAllPDeviceType() {
  return request({
    url: api.getAllPDeviceType,
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

// 根据ID获取物理设备类型
export function getByIdPDeviceType(id) {
  return request({
    url: api.getByIdPDeviceType,
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    },
    params: {
      id
    }
  })
}

// 根据ID集合获取设备类型集合信息
export function getByIdsPDeviceType(ids) {
  return request({
    url: api.getByIdsPDeviceType,
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: ids
  })
}

// 新增物理设备类型
export function createPDeviceType(obj) {
  return request({
    url: api.createPDeviceType,
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: obj
  })
}

// 更新物理设备类型信息
export function updatePDeviceType(obj) {
  return request({
    url: api.updatePDeviceType,
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: obj
  })
}

// 删除物理设备类型
export function deletePDeviceType(id) {
  return request({
    url: api.deletePDeviceType,
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      id
    }
  })
}
