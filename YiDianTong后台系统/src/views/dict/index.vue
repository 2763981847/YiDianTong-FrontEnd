<template>
  <div class="app-container">
    <!-- 导出-->
    <a :href="export_url">
      <el-button type="primary" style="margin-bottom: 20px;margin-right: 10px;">导出<i
        class="el-icon-download el-icon--right"
      ></i>
      </el-button>
    </a>
    <!--导入-->
    <el-button type="primary" style="margin-bottom: 20px;margin-right: 10px;" @click="importDict">导入<i
      class="el-icon-upload el-icon--right"
    ></i>
    </el-button>
    <!-- 导入提示框-->
    <el-dialog title="导入" :visible.sync="dialogImportVisible" width="480px">
      <el-form label-position="right" label-width="170px">

        <el-form-item label="文件">
          <el-upload
            :multiple="false"
            :on-success="onUploadSuccess"
            :action="import_url"
            class="upload-demo"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传excel文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogImportVisible = false">
          取消
        </el-button>
      </div>
    </el-dialog>

    <!--数据列表-->
    <el-table
      :data="list"
      style="width: 100%"
      row-key="id"
      border
      lazy
      :load="load"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column label="名称" width="230" align="left">
        <template v-slot="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="编码" width="220">
        <template v-slot="{row}">
          {{ row.dictCode }}
        </template>
      </el-table-column>
      <el-table-column label="值" width="230" align="left">
        <template v-slot="scope">
          <span>{{ scope.row.value }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center">
        <template v-slot="scope">
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
import dict from '@/api/dict'

export default {
  data() {
    return {
      list: [],
      export_url: 'http://localhost:8202/admin/cmn/dict/exportDict',
      import_url: 'http://localhost:8202/admin/cmn/dict/importDict',
      dialogImportVisible: false
    }
  },
  created() {
    this.getDictList(1)
  },
  methods: {
    getDictList(id) {
      dict.getChildren(id)
        .then(response => {
          this.list = response.data
        })
    },
    load(tree, treeNode, resolve) {
      dict.getChildren(tree.id).then(response => {
        resolve(response.data)
      })
    },
    importDict() {
      this.dialogImportVisible = true
    },
    onUploadSuccess() {
      this.dialogImportVisible = false
      this.getDictList(1)
    }
  }
}
</script>
