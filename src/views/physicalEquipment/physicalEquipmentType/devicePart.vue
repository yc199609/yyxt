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

      <el-table-column label="部位名称" >
        <template slot-scope="scope">
          <div v-if="!scope.row.onEditing">
            {{ scope.row.name }}
          </div>
          <el-input v-else v-model="scope.row.name" />
        </template>
      </el-table-column>

      <el-table-column prop="code" label="部位代码" >
        <template slot-scope="scope">
          <div v-if="!scope.row.onEditing">
            {{ scope.row.code }}
          </div>
          <el-input v-else v-model="scope.row.code" />
        </template>
      </el-table-column>

      <el-table-column prop="description" label="部位描述" >
        <template slot-scope="scope">
          <div v-if="!scope.row.onEditing">
            {{ scope.row.description }}
          </div>
          <el-input v-else v-model="scope.row.description" />
        </template>
      </el-table-column>

      <el-table-column label="操作" >
        <template slot-scope="scope">
          <div>
            <el-button v-if="!scope.row.onEditing" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button v-else @click="handleSave(scope.row)">保存</el-button>
            <el-button @click="handleDelete(scope.row.id)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <DevicePartDetail v-if="detailView" ref="devicePartDetail" @reload='reload' />
  </el-dialog>
</template>
<script>
import DevicePartDetail from './devicePartDetail'
import { getPDevicePartByDeviceTypeId, deleteTerminalDeviceLocation, updateTerminalDeviceLocation } from '@api/physicalEquipment/physicalEquipmentPart'
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
    },
    handleDelete(id){
      this.$confirm('此操作将删除设备部位,是否继续?', '提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(()=>{
        deleteTerminalDeviceLocation(id).then(res=>{
          this.$message({
            type: "success",
            message: "删除成功",
            duration: 500,
            onClose:()=>{
              this.init()
            }
          })
        })
      })
    },
    handleEdit(devicePart){
      this.$set(devicePart,'onEditing',true)
    },
    handleSave(devicePart){
      updateTerminalDeviceLocation({
        ...devicePart,
        deviceTypeId:this.typeId
      }).then(()=>{
        this.$message({
          type: "success",
          message: "修改成功",
          duration: 500,
          onClose:()=>{
            this.init()
          }
        })
      })
    }
  }
}
</script>
