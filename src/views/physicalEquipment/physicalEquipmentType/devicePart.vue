<template>
  <el-dialog
    :append-to-body="true" 
    :modal-append-to-body="false" 
    :visible.sync="visible" 
    :close-on-click-modal="false" 
    title="设备部位" 
    @close="onClose"
  >
    <el-button @click="handleInsert">新增</el-button>
    <el-table :data="tableData" border>
      <el-table-column prop="name" label="部位名称" />
      <el-table-column prop="code" label="部位代码" />
      <el-table-column prop="description" label="部位描述" />
    </el-table>
    <DevicePartDetail v-if="detailView" ref="devicePartDetail" @reload='reload' />
  </el-dialog>
</template>
<script>
import DevicePartDetail from './devicePartDetail'
import { getPDevicePartByDeviceTypeId } from '@api/physicalEquipment/physicalEquipmentPart'
export default {
  components:{
    DevicePartDetail
  },
  data:()=>({
    visible: false,
    tableData: [],
    detailView: false,
    typeId: undefined
  }),
  methods:{
    reload(){
      this.detailView = false
      this.init(this.typeId)
    },
    handleInsert(){
      this.detailView = true
      this.$nextTick(()=>{
        this.$refs.devicePartDetail.init(this.typeId)
      })
    },
    onClose(){
      this.$emit('reload')
    },
    init(id){
      this.typeId = id
      this.visible = true
      getPDevicePartByDeviceTypeId(id)
        .then(res => {
          this.$set(this,'tableData',res.data)
        })
    }
  }
}
</script>
