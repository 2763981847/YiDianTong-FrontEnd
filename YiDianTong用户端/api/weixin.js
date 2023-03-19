import request from '@/utils/request'

const api_prefix = `/api/ucenter/wx`

export default {
  //获取登录二维码相关参数
  getLoginParam() {
    return request({
      url: `${api_prefix}/getQRParam`,
      method: `get`
    })
  },
  //获取支付订单二维码相关参数
  getQRCode(orderId){
    return request({
      url: `/api/order/weixin/QRCode/${orderId}`,
      method: `get`
    })
  },
  //查询支付状态
  queryPayStatus(orderId) {
    return request({
      url: `/api/order/weixin/payStatus/${orderId}`,
      method: 'get'
    })
  },

}
