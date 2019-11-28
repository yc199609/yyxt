<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose">

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm" label-position="right" label-width="110px">
      <el-form-item label="类名称">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      
      <el-form-item label="类型编码">
        <el-input v-model="ruleForm.code"></el-input>
      </el-form-item>

      <el-form-item label="描述">
        <el-input v-model="ruleForm.description"></el-input>
      </el-form-item>

      <el-form-item label="是否板载传感器">
        <el-input v-model="ruleForm.isOnboard"></el-input>
      </el-form-item>
    </el-form>
    
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      ruleForm: {},
      rules: {},
      title: '新增'
    };
  },
  methods: {
    init(row) {
      this.dialogVisible = true
      if (row) {
        this.title = '修改'
        this.row = this.ruleForm
      } else {
        this.title = '新增'
      }
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }
  }
}
</script>

<style lang='scss' scoped>

</style>