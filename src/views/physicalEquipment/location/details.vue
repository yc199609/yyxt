<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose">

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm" label-position="right" label-width="110px">
      <el-form-item label="部位名称">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      
      <el-form-item label="部位代号">
        <el-input v-model="ruleForm.code"></el-input>
      </el-form-item>

      <el-form-item label="部位描述">
        <el-input v-model="ruleForm.description"></el-input>
      </el-form-item>

      <el-form-item label="设备类型Id">
        <el-input-number v-model="ruleForm.deviceTypeId"></el-input-number>
      </el-form-item>
    </el-form>
    
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { create } from '@api/physicalEquipment/location' // UpdateInfo,

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
      console.log(row)
      this.dialogVisible = true
      if (row) {
        this.title = '修改'
        this.ruleForm = row
      } else {
        this.title = '新增'
      }
    },
    handleClose(done) {
      this.dialogVisible = false
      this.ruleForm = {}
      done();
    },
    submit() {
      if (this.title == '修改') {
        // UpdateInfo(this.ruleForm).then(res => {
        //   this.$message({
        //     type: 'success',
        //     message: '修改成功',
        //     duration: 500,
        //   })
        // })
      } else if (this.title == '新增') {
        create(this.ruleForm).then(res => {
          this.$message({
            type: 'success',
            message: '新增成功',
            duration: 500,
          })
        })
      }
      this.dialogVisible = false
      this.$parent.init()
      this.ruleForm = {}
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
