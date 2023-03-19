import request from "@/utils/request";

const api_prefix = `/api/hosp/hospital`
export default {
  //分页查询医院列表
  listHospitalPages(page, limit, searchObj) {
    return request({
      url: `${api_prefix}/${page}/${limit}`,
      method: 'get',
      params: searchObj
    })
  },
  //根据医院名称模糊查询医院
  listHospitalsByHosnameLike(hosname) {
    return request({
      url: `${api_prefix}/listByHosname/${hosname}`,
      method: 'get'
    })
  },
  //根据医院编号查询医院详细信息
  getHospitalDetail(hoscode) {
    return request({
      url: `${api_prefix}/getHospitalDetail/${hoscode}`,
      method: 'get'
    })
  },
  //根据医院编号查询科室信息
  listDepartmentsByHoscode(hoscode) {
    return request({
      url: `${api_prefix}/listDepartments/${hoscode}`,
      method: 'get'
    })
  },
  getBookingScheduleRule(page, limit, hoscode, depcode) {
    return request({
      url: `${api_prefix}/auth/bookingSchedule/${page}/${limit}/${hoscode}/${depcode}`,
      method: 'get'
    })
  },

  findScheduleList(hoscode, depcode, workDate) {
    return request({
      url: `${api_prefix}/auth/schedule/${hoscode}/${depcode}/${workDate}`,
      method: 'get'
    })
  },
  getSchedule(id) {
    return request({
      url: `${api_prefix}/auth/schedule/${id}`,
      method: 'get'
    })
  }


}
