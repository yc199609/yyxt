import request from '@/utils/request'

const api = {
  createPDevicePart: '/api/Terminal/TerminalDeviceLocation/Create',
  getPDevicePartByDeviceTypeId: '/api/Terminal/TerminalDeviceLocation/GetDeviceLocationByDeviceTypeId',
  deleteTerminalDeviceLocation: '/api/Terminal/TerminalDeviceLocation/Delete',
  updateTerminalDeviceLocation: '/api/Terminal/TerminalDeviceLocation/Update'
}

// 创建部位
export function createPDevicePart(obj) {
  return request({
    url: api.createPDevicePart,
    method: 'post',
    data: obj
  })
}

// 根据物理设备类型获取部位
export function getPDevicePartByDeviceTypeId(deviceTypeId) {
  return request({
    url: api.getPDevicePartByDeviceTypeId,
    method: 'get',
    params: {
      deviceTypeId
    }
  })
}

// 删除部位
export function deleteTerminalDeviceLocation(id) {
  return request({
    url: api.deleteTerminalDeviceLocation,
    method: 'post',
    data: {
      id
    }
  })
}

// 修改部位
export function updateTerminalDeviceLocation(obj) {
  return request({
    url: api.updateTerminalDeviceLocation,
    method: 'post',
    data: obj
  })
}
