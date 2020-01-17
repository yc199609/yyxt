<template>
  <div class="container">
    <Search :show-btn="buttonPermissions('94000101')" @search="search" @changeKeyword="changeKeyword">
      <el-button v-if="buttonPermissions('94000102')" type="warning" plain size="small" icon="el-icon-plus" @click="insert">新增</el-button>
    </Search>

    <el-card>
      <el-table :data="tableData" class="table" border>

        <el-table-column align="center" prop="name" label="姓名"/>

        <el-table-column align="center" label="性别">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.sex===0" type="danger">女</el-tag>
            <el-tag v-else type="primary">男</el-tag>
          </template>
        </el-table-column>

        <el-table-column align="center" prop="mobile" label="手机号"/>

        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-row>

              <el-col :offset="3" :span="8" class="ycbutton">
                <el-tooltip effect="dark" content="编辑" placement="top">
                  <el-button v-if="buttonPermissions('94000103')" type="warning" icon="el-icon-edit-outline" @click="edit(scope.row.id)"/>
                </el-tooltip>
              </el-col>

              <el-col :span="8" :offset="2" class="ycbutton">
                <el-tooltip effect="dark" content="删除" placement="top">
                  <el-button v-if="buttonPermissions('94000104')" type="danger" icon="el-icon-delete" @click="del(scope.row.id)"/>
                </el-tooltip>
              </el-col>

            </el-row>
          </template>
        </el-table-column>
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

    <Detail v-if="detailShow" ref="detail" @reload="editHidden" />
  </div>
</template>
<script>
import Search from '@/components/Search'
import { GetEmployeesByName, DeleteEmployee } from '@api/Personnel/employees'
import Detail from './details/index'
import { pagging, keyword, buttonPermissions } from '@/mixin'
export default {
  name: 'Employees',
  components: {
    Search,
    Detail
  },
  mixins: [pagging, keyword,buttonPermissions],
  data() {
    return {
      tableData: [],
      detailShow: false
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    search() {
      this.pageIndex = 1
      this.init()
    },
    init() {
      GetEmployeesByName({
        name: this.keyword,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      }).then(res => {
        this.$set(this, 'tableData', res.data.items)
        this.totalCount = res.data.totalCount
        this.pageIndex = res.data.pageIndex
        this.pageSize = res.data.pageSize
      })
    },
    insert() {
      this.detailShow = true
      this.$nextTick(() => {
        this.$refs.detail.init()
      })
    },
    edit(id) {
      this.detailShow = true
      this.$nextTick(() => {
        this.$refs.detail.init(id)
      })
    },
    editHidden() {
      this.detailShow = false
      this.init()
    },
    del(id) {
      this.$confirm('此操作将删除该员工, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        DeleteEmployee(id).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功',
            duration: 500,
            onClose: () => {
              this.init()
            }
          })
        })
      })
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
