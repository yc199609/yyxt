import request from '@/utils/request'

const api = {
  GetList: '/api/Operation/DataView/Get',
  create: '/api/Operation/DataView/Create',
  UpdateInfo: '/api/Operation/DataView/Update',
  Delete: '/api/Operation/DataView/Delete',
  GetById: '/api/Operation/DataView/GetById'
}

// 查询视图模板列表
export function GetList(obj) {
  return request({
    url: api.GetList,
    method: 'get',
    params: obj
  })
}

// 创建视图模板
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

// 更新视图模板
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

// 视图模板删除
export function Delete(id) {
  return request({
    url: api.Delete,
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      id
    }
  })
}

// 根据视图Id获取视图模板
export function GetById(viewId) {
  return request({
    url: api.GetById,
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    },
    params: {
      viewId
    }
  })
}
