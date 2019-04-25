<template>
  <el-dialog :visible.sync="visible" @close="render">
    <div style="padding:1vw;">
      <span>业务参数</span>
      <hr style="background-color:#f7eaea; height: 1px; border: none;">
      <el-table
        :data="businessData"
        border
        style="width: 100%"
      >
        <el-table-column
          align="center"
          prop="code"
          label="代码"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="name"
          label="名称"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="value"
          label="值"
        >
        <template slot-scope="{row}">
          <template v-if="row.edit">
            <el-input v-model="row.value"></el-input>
          </template>
          <span v-else>{{row.value}}</span>
        </template>


        </el-table-column>
        <el-table-column
          align="center"
          prop="description"
          label="备注"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="operation"
          label="操作"
        >
          <template slot-scope="{row}">
            <el-button
              :type="row.edit?'success':'warning'"
              icon="el-icon-edit"
              @click="modify(row)"
            >{{row.edit?"保存":"修改"}}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-dialog>

</template>

<script>
import { updateConfigItem,getConfigById } from "@/api/organize";

export default {
  data() {
    return {
      visible: false,
      businessData: [],
      pageIndex: 1,
      PageSize: 20
    }
  },
  methods: {
    init(id) {
      this.visible = true
      getConfigById({id,pageIndex:this.pageIndex,PageSize:this.PageSize})
        .then(res => {
          this.$set(this,"businessData",res.data.items)
        })
    },
    modify(row) {
      // 修改业务参数值
        if(row.edit){
          //保存
          updateConfigItem(row)
          .then(res => {
            this.$message({
              type:'success',
              message:"成功",
              duration:500,
              onClose:()=>{
                this.$set(row,'edit',false)
              }
            })
          })
        }else{
          // 修改
          this.$set(row,'edit',true)
        }

    },
    render(){
      this.$emit('render')
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
