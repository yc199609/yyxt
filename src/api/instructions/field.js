import request from '@/utils/request'

const api = {
  GetList: '/api/terminal/CmdField/GetList'
}

// 根据关键字模糊查询
export function GetList(obj) {
  return request({
    url: api.GetList,
    method: 'get',
    params: obj
  })
}

