import request from '@/utils/request'

const api_prefix = '/admin/user'

export default {

  getPageList(page, limit, searchObj) {
    return request({
      url: `${api_prefix}/${page}/${limit}`,
      method: 'get',
      params: searchObj
    })
  },
  updateStatus(id, status) {
    return request({
      url: `${api_prefix}/status/${id}/${status}`,
      method: 'post'
    })
  },
  //用户详情
  getUserDetails(id) {
    return request({
      url: `${api_prefix}/details/${id}`,
      method: 'get'
    })
  },
  //认证审批
  approval(id, authStatus) {
    return request({
      url: `${api_prefix}/approval/${id}/${authStatus}`,
      method: 'post'
    })
  }


}
