<template>
  <el-dialog
    :append-to-body="true" 
    :modal-append-to-body="false" 
    :visible.sync="visible" 
    :close-on-click-modal="false" 
    :title="mode==='insert'?'新增':'修改'" 
    @close="onClose"
  >
    <el-form>
      <el-form-item label="设备类型名称">
        <el-input v-model.trim="form.name" />
      </el-form-item>
      <el-form-item label="设备类型编码">
        <el-input v-model.trim="form.code" />
      </el-form-item>
      <el-form-item label="设备类型描述">
        <el-input v-model.trim="form.description" />
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button @click="handldSubmit">确定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { getByIdPDeviceType, createPDeviceType, updatePDeviceType } from '@api/physicalEquipment/physicalEquipmentType'
export default {
  data:()=>({
    visible:false,
    mode: "",
    form: {
      name: undefined,
      code: undefined,
      description: undefined
    },
  }),
  methods:{
    init(id){
      this.visible = true
      if(id){
        this.mode = 'edit'
        getByIdPDeviceType(id)
          .then(res=>{
            this.$set(this,'form',res.data)
          })
      } else {
        this.mode = 'insert'
      }
    },
    onClose(){
      this.$emit('reload')
    },
    handldSubmit(){
      const typeFn = {
        'insert': createPDeviceType,
        'edit': updatePDeviceType
      }
      const typeMessage = {
        'insert': '新增',
        'edit': '修改'
      }
      typeFn[this.mode](this.form)
        .then(res=>{
          this.$message({
            type:"success",
            message: `${typeMessage[this.mode]}成功`,
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
