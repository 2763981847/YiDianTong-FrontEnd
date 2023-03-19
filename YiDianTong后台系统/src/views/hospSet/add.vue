<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="医院名称">
        <el-input v-model="hospitalSet.hosname"/>
      </el-form-item>
      <el-form-item label="医院编号">
        <el-input v-model="hospitalSet.hoscode"/>
      </el-form-item>
      <el-form-item label="api基础路径">
        <el-input v-model="hospitalSet.apiUrl"/>
      </el-form-item>
      <el-form-item label="联系人姓名">
        <el-input v-model="hospitalSet.contactsName"/>
      </el-form-item>
      <el-form-item label="联系人手机">
        <el-input v-model="hospitalSet.contactsPhone"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import hospSet from '@/api/hospSet'

export default {
  data() {
    return {
      hospitalSet: {},
      flag: false   //默认FALSE为新增操作，TRUE为修改操作
    }
  },
  methods: {
    saveOrUpdate() {
      (this.flag ? hospSet.updateHospSet(this.hospitalSet) : hospSet.saveHospSet(this.hospitalSet))
        .then(response => {
          this.$message({
            type: 'success',
            message: this.flag? '修改成功':'添加成功'
          })
          this.$router.push('/hosp/set/index')
        })
    },
    getById(id) {
      hospSet.getHospSet(id)
        .then(response => {
          this.hospitalSet = response.data
        })
    }
  },
  created() {
    if (this.$route.params && this.$route.params.id) {
      this.flag = true
      this.getById(this.$route.params.id)
    }
  }
}

</script>
