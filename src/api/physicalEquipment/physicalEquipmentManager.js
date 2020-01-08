import request from '@/utils/request'

const api = {
  getPDevice: '/api/Operation/PDevice/Get',
  getByKeyword: '/api/Operation/PDevice/GetByKeyword',
  getById: '/api/Operation/PDevice/GetById',
  createPDevice: '/api/Operation/PDevice/Create',
  updatePDevice: '/api/Operation/PDevice/Update',
  deletePDevice: '/api/Operation/PDevice/Delete',
  bindPDeviceCompany: '/api/Operation/PDevice/BindPDeviceCompany',
  getCompaniesByPDeviceId: '/api/Operation/PDevice/GetCompaniesByPDeviceId'
}

// 获取物理设备列表(分页)
export function getPDevice(obj) {
  return request({
    url: api.getPDevice,
    method: 'get',
    params: obj
  })
}

// 根据关键字获取物理设备列表
export function getByKeyword(obj) {
  return request({
    url: api.getByKeyword,
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    },
    params: obj
  })
}

// 根据ID获取物理设备
export function getById(id) {
  return request({
    url: api.getById,
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    },
    params: {
      id
    }
  })
}

// 新增物理设备
export function createPDevice(obj) {
  return request({
    url: api.createPDevice,
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: obj
  })
}

// 更新物理设备信息
export function updatePDevice(obj) {
  return request({
    url: api.updatePDevice,
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: obj
  })
}

// 删除物理设备
export function deletePDevice(id) {
  return request({
    url: api.deletePDevice,
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      id
    }
  })
}

// 绑定物理设备与机构关系
export function bindPDeviceCompany(obj) {
  return request({
    url: api.bindPDeviceCompany,
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: obj
  })
}

// 根据物理设备ID查询关联机构信息
export function getCompaniesByPDeviceId(pDeviceId) {
  return request({
    url: api.getCompaniesByPDeviceId,
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    },
    params: {
      pDeviceId
    }
  })
}
