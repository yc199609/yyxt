<template>
  <el-dialog
    :append-to-body="true" 
    :modal-append-to-body="false" 
    :visible.sync="visible" 
    :close-on-click-modal="false" 
    title="设备部位" 
    @close="onClose"
  >
    <el-table :data="tableData" border>
      <el-table-column prop="name" label="部位名称" />
      <el-table-column prop="code" label="部位代码" />
      <el-table-column prop="description" label="部位描述" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <div>
            <el-button @click="handleBindTerminal(scope.row.id)">终端</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <BindTerminal v-if="bindTerminalView" ref="bindTerminal" @reload='reload' />
  </el-dialog>
</template>
<script>
import BindTerminal from './bindTerminal'
import { getPDevicePartByDeviceTypeId } from '@api/physicalEquipment/physicalEquipmentPart'
export default {
  data:()=>({
    bindTerminalView: false,
    visible: false,
    tableData: [],
    id: undefined,
    typeId: undefined
  }),
  components:{
    BindTerminal
  },
  methods:{
    handleBindTerminal(deviceLocationId){
      this.bindTerminalView = true
      this.$nextTick(()=>{
        this.$refs.bindTerminal.init({
          deviceId: this.id,
          deviceLocationId
        })
      })
    },
    reload(){
      this.bindTerminalView = false
      getPDevicePartByDeviceTypeId(this.typeId)
        .then(res => {
          this.$set(this,'tableData',res.data)
        })
    },
    onClose(){
      this.$emit('reload')
    },
    init(obj){
      this.id = obj.id
      this.typeId = obj.typeId
      this.visible = true
      getPDevicePartByDeviceTypeId(this.typeId)
        .then(res => {
          this.$set(this,'tableData',res.data)
        })
    }
  }
}
</script>
