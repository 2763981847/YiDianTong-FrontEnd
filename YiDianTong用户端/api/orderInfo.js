import request from '@/utils/request'

const api_prefix = `/api/order/orderInfo`

export default {
  //提交订单
  submitOrder(scheduleId, patientId) {
    return request({
      url: `${api_prefix}/auth/submitOrder/${scheduleId}/${patientId}`,
      method: 'post'
    })
  },
  //订单详情
  getOrderDetails(orderId) {
    return request({
      url: `${api_prefix}/auth/${orderId}`,
      method: 'get'
    })
  },
  //查询订单分页
  getOrdersPage(page, limit, searchObj) {
    return request({
      url: `${api_prefix}/auth/${page}/${limit}`,
      method: 'get',
      params: searchObj
    })
  },
  //订单状态
  getStatusList() {
    return request({
      url: `${api_prefix}/auth/orderStatus`,
      method: 'get'
    })
  },
  //取消预约
  cancelOrder(orderId) {
    return request({
      url: `${api_prefix}/auth/cancelOrder/${orderId}`,
      method: 'put'
    })
  }


}
