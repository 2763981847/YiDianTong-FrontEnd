import request from '@/utils/request'
const api_prefix = `/api/user/patient`
export default {
  //就诊人列表
  findList() {
    return request({
      url: `${api_prefix}/auth`,
      method: `get`
    })
  },
  //根据id查询就诊人信息
  getById(id) {
    return request({
      url: `${api_prefix}/auth/${id}`,
      method: 'get'
    })
  },
  //添加就诊人信息
  save(patient) {
    return request({
      url: `${api_prefix}/auth`,
      method: 'post',
      data: patient
    })
  },
  //修改就诊人信息
  updateById(patient) {
    return request({
      url: `${api_prefix}/auth`,
      method: 'put',
      data: patient
    })
  },
  //删除就诊人信息
  removeById(id) {
    return request({
      url: `${api_prefix}/auth/${id}`,
      method: 'delete'
    })
  }
}
