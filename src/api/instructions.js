import request from '@/utils/request'

const api = {
  GetAll: '/api/Terminal/SensorType/GetAll'
}

// 获取全部
export function GetAll() {
  return request({
    url: api.GetAll,
    method: 'get'
  })
}
