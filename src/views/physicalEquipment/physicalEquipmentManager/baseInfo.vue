<template>
  <el-dialog
    :append-to-body="true" 
    :modal-append-to-body="false" 
    :visible.sync="visible" 
    :close-on-click-modal="false" 
    :title="mode==='insert'?'新增':'基础信息'" 
    @close="onClose"
  >
    <el-form>
      <el-form-item label="设备名称">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="设备编码">
        <el-input v-model="form.code" />
      </el-form-item>
      <el-form-item label="设备类型">
        <el-select v-model="form.typeId" placeholder="请选择">
          <el-option
            v-for="(item,index) in typeList"
            :key="index"
            :label="item.name"
            :value="item.id"
            />
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button @click="handldSubmit">确定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { getAllPDeviceType } from '@api/physicalEquipment/physicalEquipmentType'
import { getById, updatePDevice, createPDevice } from '@api/physicalEquipment/physicalEquipmentManager'
export default {
  data() {
    return {
      visible:false,
      mode: "",
      form: {
        name: undefined,
        code: undefined,
        typeId: undefined
      },
      typeList:[],
    }
  },
  methods:{
    init(id){
      this.visible = true
      getAllPDeviceType()
        .then(res=>{

          this.$set(this,'typeList',res.data)
        })
      if(id){
        this.mode = 'edit'
        getById(id)
          .then(res=>{
            this.$set(this,'form',res.data)  // 在这里将id添加进了 form
          })
      }else{
        this.mode = 'insert'
      }
    },
    onClose(){
      this.$emit('reload')
    },
    handldSubmit(){
      const typeFn = {
        'insert': createPDevice,
        'edit': updatePDevice
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
