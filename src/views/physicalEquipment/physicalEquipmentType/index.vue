<template>
  <div class="container">
    <Search :show-btn="true" @search="init" @changeKeyword="changeKeyword">
      <el-button type="warning" plain size="small" icon="el-icon-plus" @click="insert">新增</el-button>
    </Search>
    <el-card>
      <el-table border :data="tableData">
        <el-table-column label="设备类型名称" prop="name" />
        <el-table-column label="设备类型编码" prop="code" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <div>
              <el-button @click="handlePart(scope.row.id)">设备部位</el-button>
              <el-button @click="handleEdit(scope.row.id)">编辑</el-button>
              <el-button @click="handleDetele(scope.row.id)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <div class="paginationContainer">
      <el-pagination
        :current-page="pageIndex"
        :page-sizes="[10,20, 30, 40, 50]"
        :page-size="pageSize"
        :total="totalCount"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"/>
    </div>
    <Detail v-if="detailView" ref="detail" @reload='reload' />
    <DevicePart v-if="devicePartView" ref="devicePart" @reload='reload' />
  </div>
</template>
<script>
import DevicePart from './devicePart'
import Detail from './detail'
import Search from '@/components/Search'
import { pagging, keyword, buttonPermissions } from '@/mixin'
import { getPDeviceType, deletePDeviceType } from '@api/physicalEquipment/physicalEquipmentType'
export default {
  mixins: [pagging, keyword,buttonPermissions],
  data:() => ({
    tableData:[],
    detailView:false,
    devicePartView:false
  }),
  components: {
    Search,
    Detail,
    DevicePart
  },
  mounted(){
    this.init()
  },
  methods:{
    handlePart(typeId){
      this.devicePartView = true
      this.$nextTick(()=>{
        this.$refs.devicePart.init(typeId)
      })
    },
    init(){
      getPDeviceType({
        ...this.keyword && {
          keyword: this.keyword,
        },
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      }).then(res=>{
        this.$set(this,'tableData',res.data.items)
        this.pageIndex = res.data.pageIndex;
        this.pageSize = res.data.pageSize;
        this.totalCount = res.data.totalCount;
      })
    },
    insert(){
      this.detailView = true
      this.$nextTick(()=>{
        this.$refs.detail.init()
      })
    },
    handleEdit(deviceTypeId){
      this.detailView = true
      this.$nextTick(()=>{
        this.$refs.detail.init(deviceTypeId)
      })
    },
    handleDetele(deviceTypeId){
      this.$confirm('此操作将删除设备类型,是否继续?', '提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(()=>{
        deletePDeviceType(deviceTypeId).then(res=>{
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
    reload(){
      this.devicePartView = false
      this.detailView = false
      this.init()
    }
  }
}
</script>
<style lang="scss" scoped>
  .container {
    padding: 1vw 3vw 0;
    .table {
      width: 100%;
    }
    .paginationContainer {
      margin-top: 20px;
      margin-bottom: 20px;
    }
  }
</style>
