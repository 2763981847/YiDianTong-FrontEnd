import request from '@/utils/request'

const api_prefix = 'admin/cmn/dict'

export default {
  //根据数据id查询其子数据列表
  getChildren(id) {
    return request({
      url: `${api_prefix}/getChildren/${id}`,
      method: 'get'
    })
  },
  //根据dictCode查询所有子节点
  listChildrenByDictCode(dictCode) {
    return request({
      url: `${api_prefix}/findByDictCode/${dictCode}`,
      method: 'get'
    })
  }
}
