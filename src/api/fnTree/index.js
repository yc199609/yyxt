import request from '@/utils/request'
const api = {
  getMenuFunction: '/api/Operation/Menu/GetMenuFunction',
  updateMenuFunction: '/api/Operation/Menu/UpdateMenuFunction',
  deleteMenuFunction: '/api/Operation/Menu/DeleteMenuFunction',
  createMenuFunction: '/api/Operation/Menu/CreateMenuFunction'
}

export function getMenuFunction() {
  return request({
    url: api.getMenuFunction,
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export function updateMenuFunction(obj) {
  return request({
    url: api.updateMenuFunction,
    method: 'post',
    data: obj,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export function deleteMenuFunction(obj) {
  return request({
    url: api.deleteMenuFunction,
    method: 'post',
    data: obj,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export function createMenuFunction(obj) {
  return request({
    url: api.createMenuFunction,
    method: 'post',
    data: obj,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
