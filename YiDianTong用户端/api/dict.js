import request from "@/utils/request";

const api_prefix = `/admin/cmn/dict`
export default {
  //根据dictCode获取下级节点
  listByDictCode(dictCode) {
    return request({
      url: `${api_prefix}/findByDictCode/${dictCode}`,
      method: 'get',
    })
  },
  //根据id获取下级节点
  listById(id) {
    return request({
      url: `${api_prefix}/getChildren/${id}`,
      method: 'get'
    })
  }
}
