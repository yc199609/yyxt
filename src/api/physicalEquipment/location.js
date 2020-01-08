import request from '@/utils/request'

const api = {
  GetDeviceLocationByDeviceTypeId: '/api/Terminal/TerminalDeviceLocation/GetDeviceLocationByDeviceTypeId',
  create: '/api/Terminal/TerminalDeviceLocation/Create'
}

// 根据物理设备类型获取部位
export function GetDeviceLocationByDeviceTypeId(id) {
  return request({
    url: api.GetDeviceLocationByDeviceTypeId,
    method: 'get',
    params: id
  })
}

// 创建部位
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
