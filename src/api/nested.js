// 运营模块接口调用
import request from '@/utils/request'

const api = {
  companyList: '/api/Operation/Company/List'
}

// 机构列表
// 获取机构列表
export function companyList(keyword, pageIndex, pageSize) {
  return request({
    url: api.companyList,
    pramas: {
      keyword,
      pageIndex,
      pageSize
    }
  })
}
