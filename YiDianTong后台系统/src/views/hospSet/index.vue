<template>
  <div class="app-container">
    <!--条件查询-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="医院名称">
        <el-input v-model="queryObj.hosname" placeholder="医院名称"/>
      </el-form-item>
      <el-form-item label="医院编号">
        <el-input v-model="queryObj.hoscode" placeholder="医院编号"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getList">查询</el-button>
      </el-form-item>
    </el-form>
    <!-- 批量删除按钮-->
    <el-button type="danger" @click="batchRemoveDate">批量删除</el-button>
    <!-- 新增医院设置按钮-->
    <router-link to="/hosp/set/add" style="margin-left: 20px">
      <el-button type="primary">新增医院设置</el-button>
    </router-link>
    <!--表格-->
    <el-table :data="list" style="width: 100%" :row-class-name="tableRowClassName"
              @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"/>
      <el-table-column type="index" label="序号" width="50"/>
      <el-table-column prop="hosname" label="医院名称"/>
      <el-table-column prop="hoscode" label="医院编号"/>
      <el-table-column label="api基础路径" prop="apiUrl"/>
      <el-table-column prop="contactsName" label="联系人姓名"/>
      <el-table-column prop="contactsPhone" label="联系人手机"/>
      <el-table-column label="状态" width="80" name="st">
        <template v-slot="scope">
          {{ scope.row.status === 1 ? '可用' : '不可用' }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="280" align="center">
        <template v-slot="scope">
          <router-link :to="'/hosp/set/update/'+scope.row.id" style="margin-right: 10px">
            <el-button type="primary" size="mini" icon="el-icon-edit"/>
          </router-link>
          <el-button :type="scope.row.status===1? 'success':'warning'" size="mini"
                     :icon="scope.row.status===1? 'el-icon-unlock':'el-icon-lock'"
                     @click="changDataStatus(scope.row.id,scope.row.status===1?0:1)"
          />
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)"/>
        </template>
      </el-table-column>

    </el-table>
    <!--分页-->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="current"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      style="padding: 30px 0; text-align: center;"
    />
  </div>
</template>

<style>
.el-table .locked {
  background: rgba(255, 0, 0, 0.2);
}
</style>


<script>
import hospSet from '@/api/hospSet'

export default {
  data() {
    return {
      current: 1,  //当前页码
      limit: 5,      //每页显示条数
      queryObj: {},   //查询参数
      list: [],     //设置列表
      total: 0,   //查询到的总条数
      multiplySelections: [] //选中的医院设置的id列表
    }
  },
  methods: {
    //动态更新选中设置的id列表
    handleSelectionChange(selections) {
      this.multiplySelections = selections
    },
    //改变不可用行的颜色
    tableRowClassName({ row, rowIndex }) {
      return row.status === 1 ? '' : 'locked'
    },
    //分页查询医院设置列表
    getList() {
      hospSet.getHospSetPage(this.current, this.limit, this.queryObj)
        .then(response => {
          this.list = response.data.records
          this.total = response.data.total
        })
        .catch(error => {
          console.log(error)
        })
    },
    //页码改变处理
    handleCurrentChange(current) {
      this.current = current
      this.getList()
    },
    //页容量改变处理
    handleSizeChange(limit) {
      this.limit = limit
      this.getList()
    },
    //删除医院设置
    removeDataById(id) {
      this.$confirm('此操作将永久删除该医院设置, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        hospSet.removeHospSetById(id)
          .then(response => {
            this.getList()
          })
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      })
    },
    //批量删除医院设置
    batchRemoveDate() {
      if (this.multiplySelections.length === 0) {
        this.$message({
          message: '请先选中要删除的医院设置',
          type: 'warning'
        })
        return
      }
      this.$confirm('此操作将永久删除选中医院设置, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let ids = []
        this.multiplySelections.forEach(selection => ids.push(selection.id))
        hospSet.batchRemoveHospSet(ids)
          .then(response => {
            this.getList()
          })
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      })
    },
    //解锁或锁定医院设置
    changDataStatus(id, status) {
      this.$confirm(`此操作将${status === 1 ? '取消锁定' : '锁定'}该医院设置, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        hospSet.changeHospSetStatus(id, status)
          .then(response => {
            this.getList()
          })
        this.$message({
          type: 'success',
          message: '修改成功!'
        })
      })
    }
  },
  created() {
    this.getList()
  }
}
</script>
