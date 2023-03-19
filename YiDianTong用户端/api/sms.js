import request from '@/utils/request'

const api_prefix = `/api/sms`

export default {
  sendCode(phone) {
    return request({
      url: `${api_prefix}/send/${phone}`,
      method: `get`
    })
  }
}
