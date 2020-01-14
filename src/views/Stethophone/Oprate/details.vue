<template>
  <el-dialog
    title="编辑"
    :append-to-body="true" 
    :modal-append-to-body="false" 
    :visible.sync="visible"
    :close-on-click-modal="false"
    @close="onClose">

    <el-form label-position="right" label-width="110px">
      <el-form-item label="听诊器代号">
        <el-input v-model="form.code" />
      </el-form-item>

      <el-form-item label="名称">
        <el-input v-model="form.name" />
      </el-form-item>
      
    </el-form>
    
    <span slot="footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="handleSubmit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { Update } from '@api/operation'

export default {
  data() {
    return {
      visible: false,
      form:{},
    };
  },
  methods: {
    init(row) {
      this.visible = true
      this.$set(this,'form',row)
    },
    onClose() {
      this.$emit('reload')
    },
    handleSubmit() {
      Update(this.form)
        .then(res=>{
          this.$message({
            type:"success",
            message: `编辑成功`,
            duration: 500,
            onClose:() => {
              this.visible = false
              this.$parent.init()
            }
          })
        })
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
