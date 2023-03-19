<template>
  <div class="app-container">
    <div style="margin-bottom: 10px;font-size: 10px;">选择：{{ baseMap.hosname }} / {{ depname }} / {{ workDate }}</div>
    <el-container style="height: 100%">
      <el-aside width="200px" style="border: 1px silver solid">
        <!-- 部门 -->
        <el-tree
          :data="data"
          :props="defaultProps"
          :default-expand-all="false"
          @node-click="handleNodeClick"
        >
        </el-tree>
      </el-aside>
      <el-main style="padding: 0 0 0 20px;">
        <el-row style="width: 100%">
          <!-- 排班日期 分页 -->
          <el-tag v-for="(item,index) in bookingScheduleList" :key="item.id" @click="selectDate(item.workDate, index)"
                  :type="index === activeIndex ? '' : 'info'"
                  style="height: 60px;margin-right:15px;cursor:pointer;"
          >
            {{ item.workDate }} {{ item.dayOfWeek }}<br/>
            {{ item.availableNumber }} / {{ item.reservedNumber }}
          </el-tag>

          <!-- 分页 -->
          <el-pagination
            :current-page="page"
            :total="total"
            :page-size="limit"
            class="pagination"
            layout="prev, pager, next"
            @current-change="handlePageChange"
          >
          </el-pagination>

        </el-row>
        <el-row style="margin-top: 20px;">
          <!-- 排班日期对应的排班医生 -->
          <el-table
            v-loading="listLoading"
            :data="scheduleList"
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
                {{ scope.$index + 1 }}
              </template>
            </el-table-column>
            <el-table-column label="职称" width="150">
              <template v-slot="scope">
                {{ scope.row.title }} | {{ scope.row.docname }}
              </template>
            </el-table-column>
            <el-table-column label="号源时间" width="80">
              <template v-slot="scope">
                {{ scope.row.workTime == 0 ? '上午' : '下午' }}
              </template>
            </el-table-column>
            <el-table-column prop="reservedNumber" label="可预约数" width="80"/>
            <el-table-column prop="availableNumber" label="剩余预约数" width="100"/>
            <el-table-column prop="amount" label="挂号费(元)" width="90"/>
            <el-table-column prop="skill" label="擅长技能"/>
          </el-table>

        </el-row>
      </el-main>
    </el-container>
  </div>
</template>
<style>
.el-tree-node.is-current > .el-tree-node__content {
  background-color: #409EFF !important;
  color: white;
}

.el-checkbox__input.is-checked + .el-checkbox__label {
  color: black;
}
</style>

<script>
import hosp from '@/api/hosp'

export default {
  data() {
    return {
      data: [],
      defaultProps: {
        children: 'children',
        label: 'depname'
      },
      hoscode: null,
      activeIndex: 0,
      depcode: null,
      depname: null,
      workDate: null,
      bookingScheduleList: [],
      baseMap: {},
      page: 1, // 当前页
      limit: 7, // 每页个数
      total: 0, // 总数据数
      scheduleList: [],
      listLoading: false
    }
  },
  methods: {
    handlePageChange(page) {
      this.page = page
      this.getPage()
    },
    getPage() {
      hosp.listSchedules(this.page, this.limit, this.hoscode, this.depcode)
        .then(response => {
          let data = response.data
          this.total = data.total
          this.bookingScheduleList = data.bookingScheduleList
          this.baseMap = data.baseMap
          //默认选中第一个日期
          this.workDate = this.bookingScheduleList[0].workDate
          this.getDetailSchedule()
        })
    },
    handleNodeClick(data) {
      if (data.children != null) return
      this.depcode = data.depcode
      this.depname = data.depname
      this.workDate = null
      this.scheduleList = []
      this.bookingScheduleList = []
      this.getPage()
    },
    fetchData(hoscode) {
      hosp.listDepartmentsTree(hoscode)
        .then(response => {
          this.data = response.data
          // 默认选中第一个
          if (this.data.length > 0) {
            this.depcode = this.data[0].children[0].depcode
            this.depname = this.data[0].children[0].depname
            this.getPage()
          }

        })
    },
    selectDate(workData, index) {
      this.workDate = workData
      this.activeIndex=index
      this.getDetailSchedule()
    },
    getDetailSchedule() {
      this.listLoading = true
      hosp.listSchedulesDetails(this.hoscode, this.depcode, this.workDate)
        .then(response => {
          this.scheduleList = response.data
          this.listLoading = false
        })
    }

  },

  created() {
    this.hoscode = this.$route.params.hoscode
    this.fetchData(this.hoscode)
  }
}
</script>
