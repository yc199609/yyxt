<template>
  <el-dialog
    :append-to-body="true" 
    :modal-append-to-body="false" 
    :visible.sync="visible" 
    :close-on-click-modal="false" 
    title="新增设备部位" 
    @close="onClose"
  >
    <el-form>
      <el-form-item label="部位名称">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="部位代号">
        <el-input v-model="form.code" />
      </el-form-item>
      <el-form-item label="部位描述">
        <el-input v-model="form.description" />
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button @click="visible = false">
        取消
      </el-button>
      <el-button @click="handleSubmit">
        确定
      </el-button>
    </div>
  </el-dialog>
</template>
<script>
import { createPDevicePart } from '@api/physicalEquipment/physicalEquipmentPart'
export default {
  data:()=>({
    visible: false,
    form:{
      name:undefined,
      code:undefined,
      description:undefined
    },
    deviceTypeId:undefined
  }),
  methods:{
    onClose(){
      this.$emit('reload')
    },
    init(id){
      this.deviceTypeId = id
      this.visible = true
    },
    handleSubmit(){
      createPDevicePart({
        ...this.form,
        ...this.deviceTypeId&&{deviceTypeId:this.deviceTypeId}
      }).then(res=>{
        this.$message({
          type:"success",
          message:"新增成功",
          duration:500,
          onClose:()=>{
            this.visible = false
          }
        })
      })

    }
  }
}
</script>
