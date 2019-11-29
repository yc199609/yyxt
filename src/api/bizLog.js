// 业务系统-机构列表
import request from '@/utils/request'

const api = {
  GetList: '/api/operation/BizLog/GetList',
  dmsGetList: '/api/company/BizLog/GetList'
}

// 根据关键字模糊查询(运营系统日志)
export function GetList(obj) {
  return request({
    url: api.GetList,
    method: 'get',
    params: obj
  })
}

// 根据关键字模糊查询(业务系统日志)
export function dmsGetList(obj) {
  return request({
    url: api.dmsGetList,
    method: 'get',
    params: obj
  })
}
