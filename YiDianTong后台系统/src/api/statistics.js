import request from '@/utils/request'

const api_prefix = '/admin/statistics'

export default {

  getCountMap(searchObj) {
    return request({
      url: `${api_prefix}/getCountMap`,
      method: 'get',
      params: searchObj
    })
  }
}
