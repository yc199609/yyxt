<template>
  <div class="container">
    <Search :show-btn="true" @search="search" @changeKeyword="changeKeyword">
      <el-button type="warning" plain size="small" icon="el-icon-plus" @click="insert">新增</el-button>
    </Search>
    <el-card>
      <el-table border :data="tableData">
        <el-table-column label="设备编码" prop="code" align="center" />
        <el-table-column label="设备名称" prop="name" align="center" />
        <el-table-column label="设备类型名称" prop="typeName" align="center" />
        <el-table-column label="绑定终端个数" prop="deviceTerminalNum" align="center" />
        <el-table-column label="操作" align="center" width="440">
          <template slot-scope="scope">
            <div>
              <el-button type="text" icon="el-icon-info" @click="handleBaseInfo(scope.row.id)">基础信息</el-button>
              <el-button type="text" icon="el-icon-circle-plus" @click="handleBindCompany(scope.row)">绑定机构</el-button>
              <el-button type="text" icon="el-icon-s-grid" @click="handlePParts(scope.row)">设备部位</el-button>
              <el-button type="text" icon="el-icon-s-custom" @click="handleIManage(scope.row.id)">指标管理</el-button>
              <el-button type="text" icon="el-icon-delete" @click="handleDetele(scope.row.id)">删除</el-button>
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
    <BaseInfo v-if="baseView" ref="baseInfo" @reload="reload" />
    <BindCompany v-if="companyView" ref="bindCompany" @reload='reload' />
    <devicePart v-if="devicePartView" ref="devicePart" @reload='reload' />
  </div>
</template>
<script>
import DevicePart from './devicePart'
import BindCompany from './bindCompany'
import BaseInfo from './baseInfo'
import Search from '@/components/Search'
import { pagging, keyword, buttonPermissions } from '@/mixin'
import { getPDevice, deletePDevice } from '@api/physicalEquipment/physicalEquipmentManager'
export default {
  mixins: [pagging, keyword,buttonPermissions],
  components: {
    Search,
    BaseInfo,
    BindCompany,
    DevicePart
  },
  data() {
    return {
      devicePartView: false,
      companyView: false,
      baseView: false,
      tableData: [],
    }
  },
  mounted() {
    this.init()
  },
  methods:{
    search(){
      this.pageIndex = 1
      this.init()
    },
    init(){
      getPDevice({
        ...this.keyword && {
          keyword: this.keyword,
        },
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      }).then(res=>{
        this.$set(this, 'tableData', res.data.items)
        this.pageIndex = res.data.pageIndex;
        this.pageSize = res.data.pageSize;
        this.totalCount = res.data.totalCount;
      })
    },
    insert(){
      this.baseView = true
      this.$nextTick(()=>{
        this.$refs.baseInfo.init()
      })
    },
    handleBaseInfo(deviceId){
      this.baseView = true
      this.$nextTick(()=>{
        this.$refs.baseInfo.init(deviceId)
      })
    },
    handleBindCompany(device){
      this.companyView = true
      this.$nextTick(()=>{
        this.$refs.bindCompany.init(device)
      })
    },
    handlePParts(obj){
      this.devicePartView = true
      this.$nextTick(()=>{
        this.$refs.devicePart.init(obj)
      })
    },
    handleIManage(id) {
      // 物理设备管理跳转至 物理设备-指标管理
       this.$router.push({
          path:  '/physicalEquipment/IndicatorManage',
          query: {id: id}
        })
    },
    handleDetele(deviceId){
      this.$confirm('此操作将删除设备,是否继续?', '提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(()=>{
        deletePDevice(deviceId).then(res=>{
          this.$message({
            type: "success",
            message: "删除成功",
            duration: 500,
            onClose:()=>{
              this.pageIndex = 1
              this.init()
            }
          })
        })
      })
    },
    reload(){
      this.devicePartView = false
      this.companyView = false
      this.baseView = false
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
