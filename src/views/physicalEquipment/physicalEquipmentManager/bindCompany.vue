<template>
  <el-dialog
    :append-to-body="true" 
    :modal-append-to-body="false" 
    :visible.sync="visible" 
    :close-on-click-modal="false" 
    title="绑定机构" 
    @close="onClose"
  >
    <el-form>
      <el-form-item label="选择机构">
        <el-select
          v-model="value"
          placeholder="请选择"
          multiple
        >
          <el-option
            v-for="(item,index) in companyList"
            :key="index"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button @click="handleSubmit">确定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { companyList } from '@api/organize'
import { bindPDeviceCompany, getCompaniesByPDeviceId } from '@api/physicalEquipment/physicalEquipmentManager'
export default {
  data(){
    return {
      visible: false,
      value: [],
      companyList: [],
      device: undefined
    }
  },
  methods:{
    init(device){
      this.device = device
      this.visible = true
      // 获取所有的company列表
      companyList({
        pageIndex:1,
        pageSize:999999
      }).then(res=>{
        this.$set(this,'companyList',res.data.items)
      })
      getCompaniesByPDeviceId(device.id).then(res=>{
        const defaultCompanies = res.data.map(item=>item.id)
        this.$set(this,'value',defaultCompanies)
      })
    },
    handleSubmit(){
      const data = {
        pDevice: this.device,
        CompanyIds: this.value
      }
      bindPDeviceCompany(data)
        .then(res=>{
          this.$message({
            type: 'success',
            message: "机构绑定成功",
            duration: 500,
            onClose:()=>{
              this.visible = false
            }
          })
        })
    },
    onClose(){
      this.$emit('reload')
    }
  }
}
</script>
