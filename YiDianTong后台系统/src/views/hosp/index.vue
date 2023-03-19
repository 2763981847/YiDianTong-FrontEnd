<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-select
          v-model="searchObj.provinceCode"
          placeholder="请选择省"
          @change="provinceChanged"
        >
          <el-option
            v-for="item in provinceList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-select
          v-model="searchObj.cityCode"
          placeholder="请选择市"
          @change="cityChanged"
        >
          <el-option
            v-for="item in cityList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-input v-model="searchObj.hosname" placeholder="医院名称"/>
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="fetchData()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>

    <!-- banner列表 -->
    <el-table v-loading="listLoading" :data="hospList"
              border
              fit
              highlight-current-row
    >

      <el-table-column
        label="序号"
        width="60"
        align="center"
      >
        <template v-slot="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column label="医院logo">
        <template v-slot="scope">
          <img :src="'data:image/jpeg;base64,'+scope.row.logoData" width="80">
        </template>
      </el-table-column>
      <el-table-column prop="hosname" label="医院名称"/>
      <el-table-column prop="param.hostype" label="等级" width="90"/>
      <el-table-column prop="param.fullAddress" label="详情地址"/>
      <el-table-column label="状态" width="80">
        <template v-slot="scope">
          {{ scope.row.status === 0 ? '未上线' : '已上线' }}
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间"/>
      <el-table-column label="操作" width="230" align="center">
        <template v-slot="scope">
          <!--详情按钮-->
          <router-link
            :to="{name: '医院详情页',params:{'hospital':hospList[scope.$index]}}"
          >
            <el-button type="primary" size="mini">详情</el-button>
          </router-link>
          <!-- 查看排班按钮-->
          <router-link
            :to="'schedule/'+scope.row.hoscode"
          >
            <el-button type="info" size="mini">排班</el-button>
          </router-link>
          <!--上线（下线）按钮-->
          <el-button :type="scope.row.status===1?'danger':'success'"
                     size="mini"
                     @click="updateStatus(scope.row.id,scope.row.status===1?0:1)"
          >
            {{ scope.row.status === 0 ? '上线' : '下线' }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <el-pagination
      :current-page="page"
      :total="total"
      :page-size="limit"
      :page-sizes="[5, 10, 15, 20, 25, 30]"
      style="padding: 30px 0; text-align: center;"
      layout="sizes, prev, pager, next, jumper, ->, total, slot"
      @current-change="changeCurrent"
      @size-change="changeSize"
    />
  </div>
</template>


<style>
.el-table .locked {
  background: rgba(255, 0, 0, 0.2);
}


.el-button {
  margin-right: 5px;
  margin-left: 5px;
}
</style>


<script>
import hosp from '@/api/hosp'

import dict from '@/api/dict'

export default {
  data() {
    return {
      listLoading: true,
      searchObj: {
        provinceCode: '',
        cityCode: '',
        hosname: ''
      },
      hospList: [],
      provinceList: [],
      cityList: [],
      page: 1,
      limit: 5,
      total: 0
    }
  },
  methods: {
    fetchData() {
      this.listLoading = true
      hosp.getHospPage(this.page, this.limit, this.searchObj)
        .then(response => {
          this.hospList = response.data.content
          this.total = response.data.totalElements
          this.listLoading = false
        })
    },
    resetData() {
      this.searchObj = {}
    },
    getProvinceList() {
      dict.listChildrenByDictCode('Province')
        .then(response => {
          this.provinceList = response.data
        })
    },

    provinceChanged() {
      this.searchObj.cityCode = null
      dict.getChildren(this.searchObj.provinceCode)
        .then(response => {
          this.cityList = response.data
        })
    },
    cityChanged() {

    },
    changeSize(size) {
      this.limit = size
      this.page = 1
      this.fetchData()
    },
    changeCurrent(cur) {
      this.page = cur
      this.fetchData()
    },
    updateStatus(id, status) {
      hosp.updateStatus(id, status)
        .then(response => {
          this.$message({
            type: 'success',
            message: '操作成功!'
          })
          this.fetchData()
        })
        .catch(e => {
          this.$message({
            type: 'failed',
            message: '修改失败!'
          })
        })
    }
  },
  created() {
    this.fetchData()
    this.getProvinceList()
  }
}

</script>
