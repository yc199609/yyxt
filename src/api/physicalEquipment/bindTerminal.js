import request from '@/utils/request'

const api = {
  createDeviceTerminalLocation: '/api/Terminal/DeviceTerminalLocation/Create',
  unboundDevice: '/api/Terminal/DeviceTerminalLocation/UnboundDevice',
  GetTerminalByIds: '/api/Terminal/DeviceTerminalLocation/GetTerminalByIds'
}

// 物理设备绑定
export function createDeviceTerminalLocation(obj) {
  return request({
    url: api.createDeviceTerminalLocation,
    method: 'post',
    data: obj
  })
}

// 解除物理设备绑定
export function unboundDevice(obj) {
  return request({
    url: api.unboundDevice,
    method: 'post',
    data: obj
  })
}

// 根据设备与部位，获取绑定信息
export function GetTerminalByIds(obj) {
  return request({
    url: api.GetTerminalByIds,
    method: 'get',
    params: obj
  })
}
