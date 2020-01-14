<template>
  <div class="container">
    <el-card class="topBox">
      <el-input type="text" size="small" style="width: 250px; margin-right: 10px;" placeholder="请输入需要查询code(非必填)" v-model="code" clearable @keyup.enter="init"></el-input>
      <el-button type="success" plain size="small" icon="el-icon-search" @click="init">查询</el-button>

      <el-button type="warning" plain size="small" icon="el-icon-plus" @click="insert">新增</el-button>
    </el-card>

    <el-card>
      <el-table :data="tableData" class="table" border>
        <el-table-column align="center" prop="code" label="听诊器Code"/>
        <el-table-column align="center" prop="name" label="听诊器名字"/>
        <el-table-column align="center" prop="createTime" label="创建时间"/>
        <el-table-column align="center" prop="updateTime" label="修改时间"/>
        <el-table-column align="center" prop="isBinded" label="是否被绑定">
          <template slot-scope="scope">
            <div>
              {{scope.row.isBinded}}
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <div>
              <el-button type="text" @click="handleEdit(scope.row)" icon="el-icon-edit">修改</el-button>
              <el-button type="text" @click="handleDelete(scope.row.code)" icon="el-icon-delete">删除</el-button>
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
    <Insert v-if="insertShow" ref="insert"/>
  </div>
</template>
<script>
import Search from '@/components/Search'
import { GetList, Delete } from '@api/operation'
import { pagging, keyword, buttonPermissions } from '@/mixin'
import Detail from './details'
import Insert from './insert'

export default {
  name: 'Oprate',
  components: {
    Search,
    Detail,
    Insert
  },
  mixins: [pagging, keyword,buttonPermissions],
  data() {
    return {
      tableData: [],
      detailShow: false,
      insertShow: false,
      code: ''
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      GetList({
        code: this.code,
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
      this.insertShow = true
      this.$nextTick(() => {
        this.$refs.insert.init()
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
      this.insertShow = false
      this.init()
    },
    handleDelete(code) {
      this.$confirm('此操作将删除该终端, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        Delete({ code: code }).then(res => {
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
    .topBox {
      margin-bottom: 15px;
    }

    .table {
      width: 100%;
    }
    .paginationContainer {
      margin-top: 20px;
      margin-bottom: 20px;
    }
  }
</style>
