import request from '@/utils/request'

const api = {
  createTerminal: '/api/Terminal/Terminal/Create',
  getListTerminal: '/api/Terminal/Terminal/GetList',
  updateTerminal: '/api/Terminal/Terminal/Update',
  deleteTerminal: '/api/Terminal/Terminal/Delete',
  getAllTerminal: '/api/Terminal/Terminal/GetAll'
}

// 新增采集终端
export function createTerminal(obj) {
  return request({
    url: api.createTerminal,
    method: 'post',
    data: obj
  })
}

// 根据关键字获类型模糊查询
export function getListTerminal(obj) {
  return request({
    url: api.getListTerminal,
    method: 'get',
    params: obj
  })
}

// 修改采集终端
export function updateTerminal(obj) {
  return request({
    url: api.updateTerminal,
    method: 'post',
    data: obj
  })
}

// 删除终端
export function deleteTerminal(id) {
  return request({
    url: api.deleteTerminal,
    method: 'post',
    data: {
      id
    }
  })
}

// 获取全部终端信息
export function getAllTerminal() {
  return request({
    url: api.getAllTerminal,
    method: 'get'
  })
}
