import request from '@/utils/request'

const api_prefix = '/admin/hosp'

export default {
  //分页查询医院设置
  getHospPage(current, limit, queryObj) {
    return request({
      url: `${api_prefix}/hospital/${current}/${limit}`,
      method: 'get',
      params: queryObj
    })
  },
  //删除医院设置
  removeHospSetById(id) {
    return request({
      url: `${api_prefix}/hospital/${id}`,
      method: 'delete'
    })
  },
  //批量删除医院设置
  batchRemoveHospSet(ids) {
    return request({
      url: `${api_prefix}/hospital`,
      method: 'delete',
      data: ids
    })
  },
  //锁定或解锁医院设置
  changeHospSetStatus(id, status) {
    return request({
      url: `${api_prefix}/hospital/changeHospSetStatus/${id}/${status}`,
      method: 'put'
    })
  },
  //添加医院设置
  saveHospSet(hospitalSet) {
    return request({
      url: `${api_prefix}/hospital`,
      method: 'post',
      data: hospitalSet
    })
  },
  //修改医院设置
  updateHospSet(hospitalSet) {
    return request({
      url: `${api_prefix}/hospital`,
      method: 'put',
      data: hospitalSet
    })
  },
  //根据id获取医院设置
  getHospSet(id) {
    return request({
      url: `${api_prefix}/hospital/${id}`,
      method: 'get'
    })
  },
  //修改医院上线状态
  updateStatus(id, status) {
    return request({
      url: `${api_prefix}/hospital/updateStatus/${id}/${status}`,
      method: 'put'
    })
  },
  //查看医院科室
  listDepartmentsTree(hoscode) {
    return request({
      url: `${api_prefix}/department/listDepartmentsTree/${hoscode}`,
      method: 'get'
    })
  },
  //查询排班规则
  listSchedules(page, limit, hoscode, depcode) {
    return request({
      url: `${api_prefix}/schedule/${page}/${limit}/${hoscode}/${depcode}`,
      method: 'get'
    })
  },
  //查看排班的详情信息
  listSchedulesDetails(hoscode, depcode, workDate) {
    return request({
      url: `${api_prefix}/schedule/${hoscode}/${depcode}/${workDate}`,
      method: 'get'
    })
  }

}
