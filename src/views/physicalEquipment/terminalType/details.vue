<template>
  <el-dialog
    :title="title"
    :append-to-body="true" 
    :modal-append-to-body="false" 
    :visible.sync="visible"
    :close-on-click-modal="false"
    @close="onClose">

    <el-form label-position="right" label-width="110px">

      <el-form-item label="采集设备类型名称">
        <el-input v-model.trim="form.name" />
      </el-form-item>

      <el-form-item label="类型代码(型号)">
        <el-input v-model.trim="form.code" />
      </el-form-item>
      
      <el-form-item label="类型描述说明">
        <el-input v-model.trim="form.description" />
      </el-form-item>

    </el-form>
    
    <span slot="footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="handleSubmit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { updateTerminalType, createTerminalType, getByIdTerminalType } from '@api/physicalEquipment/terminalType'
export default {
  data() {
    return {
      visible: false,
      form:{},
      typeList:[],
      mode: undefined,
      modeMessage:{
        'insert': '新增',
        'edit': '修改'
      },
      modeFn:{
        'insert': createTerminalType,
        'edit': updateTerminalType
      }
    };
  },
  computed:{
    title(){
      return this.modeMessage[this.mode]
    }
  },
  methods: {
    init(id) {
      this.visible = true
      if(id){
        this.mode = 'edit'
        getByIdTerminalType(id)
        .then(res=>{
          this.$set(this,'form',res.data)
        })
      }else{
        this.mode = 'insert'
      }
    },
    onClose() {
      this.$emit('reload')
    },
    handleSubmit() {
      this.modeFn[this.mode](this.form)
        .then(res=>{
          this.$message({
            type:"success",
            message: `${this.modeMessage[this.mode]}成功`,
            duration: 500,
            onClose:() => {
              this.visible = false
            }
          })
        })
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
