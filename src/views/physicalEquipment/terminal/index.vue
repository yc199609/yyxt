<template>
  <div class="container">
    <Search :show-btn="true" @search="init" @changeKeyword="changeKeyword">
      <el-button type="warning" plain size="small" icon="el-icon-plus" @click="insert">新增</el-button>
    </Search>

    <el-card>
      <el-table :data="tableData" class="table" border>
        <el-table-column align="center" prop="id" label="终端Id"/>
        <el-table-column align="center" prop="code" label="终端Code"/>
        <el-table-column align="center" prop="typeName" label="类型名称"/>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <div>
              <el-button type="text" @click="handleEdit(scope.row)">修改</el-button>
              <el-button type="text" @click="handleDelete(scope.row.id)">删除</el-button>
            </div>
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

    <Detail v-if="detailShow" ref="detail" @reload="reload" />
  </div>
</template>
<script>
import Search from '@/components/Search'
import { getListTerminal, deleteTerminal } from '@api/physicalEquipment/terminal'
import { pagging, keyword, buttonPermissions } from '@/mixin'
import Detail from './details'

export default {
  name: 'Location',
  components: {
    Search,
    Detail
  },
  mixins: [pagging, keyword,buttonPermissions],
  data() {
    return {
      tableData: [],
      detailShow: false,
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      getListTerminal({
        ...this.keyword && {
          keyword: this.keyword,
        },
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      }).then(res => {
        this.$set(this, 'tableData', res.data.items)
        this.pageIndex = res.data.pageIndex;
        this.pageSize = res.data.pageSize;
        this.totalCount = res.data.totalCount;
      })
    },
    insert() {
      this.detailShow = true
      this.$nextTick(() => {
        this.$refs.detail.init()
      })
    },
    handleEdit(row) {
      this.detailShow = true
      this.$nextTick(() => {
        this.$refs.detail.init(row)
      })
    },
    reload() {
      this.detailShow = false
      this.init()
    },
    handleDelete(id) {
      this.$confirm('此操作将删除该终端, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteTerminal(id).then(res => {
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
