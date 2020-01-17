<template>
  <el-dialog
    :title="title"
    :append-to-body="true" 
    :modal-append-to-body="false" 
    :visible.sync="visible"
    :close-on-click-modal="false"
    @close="onClose">

    <el-form label-position="right" label-width="110px">
      <el-form-item v-if="mode==='edit'" label="终端id">
        <el-input disabled v-model="form.id" />
      </el-form-item>

      <el-form-item label="终端代码">
        <el-input v-model="form.code" />
      </el-form-item>
      
      <el-form-item label="终端类型">
        <el-select v-model="form.terminalTypeId" placeholder="请选择">
          <el-option
            v-for="(item,index) in typeList"
            :key="index"
            :label="item.name"
            :value="item.id"
            />
        </el-select>
      </el-form-item>

    </el-form>
    
    <span slot="footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="handleSubmit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { updateTerminal, createTerminal } from '@api/physicalEquipment/terminal'
import { getAllTerminalType } from '@api/physicalEquipment/terminalType'
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
        'insert': createTerminal,
        'edit': updateTerminal
      }
    };
  },
  computed:{
    title(){
      return this.modeMessage[this.mode]
    }
  },
  methods: {
    init(row) {
      getAllTerminalType()
        .then(res=>{
          this.$set(this,'typeList',res.data)
        })
      this.visible = true
      if(row){
        this.mode = 'edit'
        this.$set(this,'form',row)
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
