<template>
  <div class="container">
    <Search @search="init" @changeKeyword="changeKeyword">
    </Search>

    <el-card>
      <el-table :data="tableData" class="table" border>

        <el-table-column align="center" prop="system" label="所属系统"/>
        <el-table-column align="center" prop="logMsg" label="备注"/>
        <el-table-column align="center" prop="userId" label="用户id"/>
        <el-table-column align="center" prop="userName" label="操作用户名"/>
        <el-table-column align="center" prop="clientIp" label="浏览器端Ip"/>
        <el-table-column align="center" prop="logDate" label="记录时间"/>

      </el-table>
    </el-card>

    <div class="paginationContainer">
      <el-pagination
        :current-page="pageIndex"
        :page-sizes="[10 ,20, 30, 40, 50]"
        :page-size="pageSize"
        :total="totalCount"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"/>
    </div>

  </div>
</template>
<script>
import Search from '@/components/Search'
import { GetList } from '@api/bizLog'
import { pagging, keyword, buttonPermissions } from '@/mixin'

export default {
  name: 'Employees',
  components: {
    Search,
  },
  mixins: [pagging, keyword,buttonPermissions],
  data() {
    return {
      tableData: [],
      keyword: "",
      pageIndex: 1,
      pageSize: 10,
      totalCount: 30
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      GetList({
        keyword: this.keyword,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      }).then(res => {
        this.$set(this, 'tableData', res.data.items)
        this.pageIndex = res.data.pageIndex;
        this.pageSize = res.data.pageSize;
        this.totalCount = res.data.totalCount;
      })
      // GetAll().then(res => {
      //   this.$set(this, 'tableData', res.data)
      // })
    },
    changeKeyword(val){
      this.keyword = val
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
