<template>
  <el-dialog
    title="新增"
    :append-to-body="true" 
    :modal-append-to-body="false" 
    :visible.sync="visible"
    :close-on-click-modal="false"
    @close="onClose">

    <el-form label-position="right" label-width="110px">
      <el-form-item label="添加个数">
        <el-input-number v-model="form.number" :min="0" />
      </el-form-item>
    </el-form>
    
    <span slot="footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="handleSubmit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { Create } from '@api/operation'

export default {
  name: 'Insert',
  data() {
    return {
      visible: false,
      form:{},
      mode: undefined,
    };
  },
  methods: {
    init() {
      this.visible = true
    },
    onClose() {
      this.$emit('reload')
    },
    handleSubmit() {
      Create({ number: this.form.number })
        .then(res=>{
          this.$message({
            type:"success",
            message: `新增成功`,
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
