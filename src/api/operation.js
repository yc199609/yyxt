import request from '@/utils/request'

const api = {
  GetList: '/api/Operation/Stethophone/GetList',
  Update: '/api/Operation/Stethophone/Update',
  Create: '/api/Operation/Stethophone/Create',
  Delete: '/api/Operation/Stethophone/Delete'
}

// 获取听诊器列表
export function GetList(obj) {
  return request({
    url: api.GetList,
    method: 'get',
    params: obj
  })
}

// 修改听诊器名称
export function Update(obj) {
  return request({
    url: api.Update,
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: obj
  })
}

// 添加听诊器
export function Create(number) {
  return request({
    url: api.Create,
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: number
  })
}

// 删除听诊器
export function Delete(code) {
  return request({
    url: api.Delete,
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: code
  })
}
