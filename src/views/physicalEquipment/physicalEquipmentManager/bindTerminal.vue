<template>
  <el-dialog
    :append-to-body="true" 
    :modal-append-to-body="false" 
    :visible.sync="visible" 
    :close-on-click-modal="false" 
    :title="mode==='bind'?'绑定终端':'解绑终端'" 
    @close="onClose"
  >
    <el-form>
      <el-form-item label="终端code">
        <el-input :disabled="mode==='unbund'" v-model="form.terminalCode"></el-input>
      </el-form-item>
      <el-form-item v-if="mode==='unbund'" label="绑定时间">
        <el-input :disabled="mode==='unbund'" v-model="form.bindTime"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input :disabled="mode==='unbund'" v-model="form.remark"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button @click="visible=false">
        取消
      </el-button>
      <el-button @click="handleSubmit">
        {{mode==='unbund'?'解绑':'确定'}}
      </el-button>
    </div>
  </el-dialog>
</template>
<script>
import { createDeviceTerminalLocation, unboundDevice, GetTerminalByIds } from '@api/physicalEquipment/bindTerminal'
export default {
  data:()=>({
    mode: undefined,
    visible:false,
    form:{
      terminalCode: undefined,
      remark: undefined,
      bindTime: undefined
    },
    deviceId: undefined,
    deviceLocationId: undefined
  }),
  methods:{
    handleSubmit(){
      const typeFn = {
        'bind': createDeviceTerminalLocation,
        'unbund': unboundDevice
      }
      const typeMessage = {
        'bind': '绑定',
        'unbund': '解绑'
      }
      const data = {
        ...this.form,
        deviceId: this.deviceId,
        deviceLocationId: this.deviceLocationId,
      }
      typeFn[this.mode](data)
        .then(res=>{
          this.$message({
            type:"success",
            message: `${typeMessage[this.mode]}成功`,
            duration: 500,
            onClose:()=>{
              this.visible = false
            }
          })
        })
    },
    init(obj){
      this.deviceId = obj.deviceId
      this.deviceLocationId = obj.deviceLocationId
      this.visible = true
      GetTerminalByIds({
        deviceId: this.deviceId,
        deviceLocationId: this.deviceLocationId
      }).then(res=>{
        if(res.data){
          this.mode = 'unbund'
          this.$set(this,'form',res.data)
        }else{
          this.mode = 'bind'
        }
      })
    },
    onClose(){
      this.$emit('reload')
    }
  }
}
</script>
