<template>
  <!-- 批量添加模版 -->
  <div class="container">
    <Search :show-btn="true" @search="init" @changeKeyword="changeKeyword">
      <el-button type="warning" plain size="small" icon="el-icon-plus" @click="insert">新增</el-button>
    </Search>

    <el-card>
      <el-table :data="tableData" class="table" border>

        <el-table-column align="center" prop="viewId" label="视图模板Id"/>
        <el-table-column align="center" prop="viewName" label="视图模板名称"/>
        <el-table-column align="center" prop="viewTypeName" label="视图类型名称"/>
        <el-table-column align="center" prop="remark" label="备注"/>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-row>
              <el-col :offset="3" :span="8">
                <el-tooltip effect="dark" content="编辑" placement="top">
                  <el-button type="warning" icon="el-icon-edit-outline" @click="edit(scope.row.viewId)"/>
                </el-tooltip>
              </el-col>

              <el-col :span="8" :offset="2">
                <el-tooltip effect="dark" content="删除" placement="top">
                  <el-button type="danger" icon="el-icon-delete" @click="del(scope.row.viewId)"/>
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

    <Insert v-if="insertShow" ref="insert" @reload="insertHidden" />
    <Edit v-if="editShow" ref="edit" @reload='editHidden' />
  </div>
</template>
<script>
import Search from '@/components/Search'
import { GetList, Delete } from '@api/instructions/template'
import { pagging, keyword, buttonPermissions } from '@/mixin'
import Insert from './details/insert'
import Edit from './details/edit'

export default {
  name: 'Employees',
  components: {
    Search,
    Insert,
    Edit
  },
  mixins: [pagging, keyword,buttonPermissions],
  data() {
    return {
      tableData: [
        {
          viewId:1,
          viewName:'视图模板名称',
          viewTypeId:'视图类型Id',
          viewTypeName:'视图类型名称',
          jsonContent:'json模板',
          remark:'备注'
        }
      ],
      insertShow: false,
      editShow: false
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      GetList({
        ...this.keyword && {
          keyword: this.keyword
        },
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
      this.insertShow = true
      this.$nextTick(() => {
        this.$refs.insert.init()
      })
    },
    edit(id) {
      this.editShow = true
      this.$nextTick(() => {
        this.$refs.edit.init(id)
      })
    },
    insertHidden(){
      this.insertShow = false
      this.init()
    },
    editHidden() {
      this.editShow = false
      this.init()
    },
    del(id) {
      this.$confirm('此操作将删除该模板, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        Delete(id).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功',
            duration: 500,
            onClose: () => {
              this.pageIndex = 1
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
