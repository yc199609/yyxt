<template>
  <el-dialog :visible.sync="visible" @close="render" :closeOnClickModal="false" height="50%">
    <div style="padding:1vw;">
      <span>业务参数</span>
      <el-button type="success" round plain style="margin-left: 80%" @click="addParams">+ 新增参数</el-button>
      <hr style="background-color:#f7eaea; height: 1px; border: none;">
      <el-table
        :data="businessData"
        border
        style="width: 100%; height: 600px; overflow: scroll"
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

     <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageIndex"
      :page-sizes="[20, 30, 40, 50]"
      :page-size='pageSize'
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount"
    ></el-pagination>

    <AddParams ref="addParams" :idParam="idParam" @init="init(idParam)"/>

  </el-dialog>
</template>

<script>
import { updateConfigItem,getConfigById } from "@/api/organize";
import AddParams from './addParams'

export default {
  name: 'businessParameters',
  data() {
    return {
      visible: false,
      businessData: [],
      pageIndex: 1,
      pageSize: 20,
      totalCount: 1,
      idParam: '',
    }
  },
  components: {
    AddParams
  },
  methods: {
    init(id) {
      this.idParam = id
      this.visible = true
      getConfigById({id: id, pageIndex:this.pageIndex, pageSize:this.pageSize})
        .then(res => {
          this.$set(this,"businessData",res.data.items)
          this.pageIndex = res.data.pageIndex
          this.pageSize = res.data.pageSize
          this.totalCount = res.data.totalCount
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
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.init(this.idParam)
    },
    handleCurrentChange(val) {
      this.pageIndex = val
      this.init(this.idParam)
    },
    addParams() {
      this.$refs.addParams.dialogVisible = true
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
