import request from '@/utils/request'

const api_prefix = `/api/user`

export default {
  login(userInfo) {
    return request({
      url: `${api_prefix}/login`,
      method: `post`,
      data: userInfo
    })
  },
  getUserInfo() {
    return request({
      url: `${api_prefix}/auth/getUserInfo`,
      method: `get`
    })
  },

  saveUserAuth(userAuth) {
    return request({
      url: `${api_prefix}/auth`,
      method: 'post',
      data: userAuth
    })
  }

}
