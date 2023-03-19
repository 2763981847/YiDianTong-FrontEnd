import request from '@/utils/request'

const api_prefix = 'admin/hosp/hospitalSet'

export default {
  //分页查询医院设置
  getHospSetPage(current, limit, queryObj) {
    return request({
      url: `${api_prefix}/page/${current}/${limit}`,
      method: 'post',
      data: queryObj
    })
  },
  //删除医院设置
  removeHospSetById(id) {
    return request({
      url: `${api_prefix}/${id}`,
      method: 'delete'
    })
  },
  //批量删除医院设置
  batchRemoveHospSet(ids) {
    return request({
      url: `${api_prefix}`,
      method: 'delete',
      data: ids
    })
  },
  //锁定或解锁医院设置
  changeHospSetStatus(id, status) {
    return request({
      url: `${api_prefix}/changeHospSetStatus/${id}/${status}`,
      method: 'put'
    })
  },
  //添加医院设置
  saveHospSet(hospitalSet) {
    return request({
      url: `${api_prefix}`,
      method: 'post',
      data: hospitalSet
    })
  },
  //修改医院设置
  updateHospSet(hospitalSet) {
    return request({
      url: `${api_prefix}`,
      method: 'put',
      data: hospitalSet
    })
  },
  //根据id获取医院设置
  getHospSet(id) {
    return request({
      url: `${api_prefix}/${id}`,
      method: 'get'
    })
  }

}
