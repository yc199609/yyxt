<template>
  <div class="container">
    <Search @search="init" @changeKeyword="changeKeyword">
      <el-button type="warning" plain size="small" icon="el-icon-plus" @click="insert">新增</el-button>
    </Search>

    <el-card>
      <el-table :data="tableData" class="table" border>

        <el-table-column align="center" prop="name" label="类名称"/>
        <el-table-column align="center" prop="valueType" label="字段值类型">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.valueType === 1" type="success">开关量</el-tag>
            <el-tag v-else-if="scope.row.valueType === 2" type="success">整数</el-tag>
            <el-tag v-else-if="scope.row.valueType === 3" type="success">浮点数</el-tag>
            <el-tag v-else-if="scope.row.valueType === 4" type="success">字符串</el-tag>
            <el-tag v-else-if="scope.row.valueType === 5" type="success">表达式</el-tag>
            <el-tag v-else-if="scope.row.valueType === 6" type="success">数组</el-tag>
            <el-tag v-else-if="scope.row.valueType === 7" type="success">坐标点</el-tag>
            <el-tag v-else-if="scope.row.valueType === 8" type="success">坐标点数组</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="code" label="影射字段"/>
        <el-table-column align="center" prop="hasFormula" label="是否有公式">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.hasFormula === 0">无公式</el-tag>
            <el-tag v-else-if="scope.row.hasFormula === 1" type="success">有公式</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="formula" label="公式"/>
        <el-table-column align="center" prop="fieldDescription" label="字段描述"/>
        <el-table-column align="center" prop="cmdId" label="指令Id"/>

        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-row>
              <el-col :offset="3" :span="8" class="ycbutton">
                <el-tooltip effect="dark" content="编辑" placement="top">
                  <el-button type="warning" icon="el-icon-edit-outline" @click="edit(scope.row)"/>
                </el-tooltip>
              </el-col>

              <el-col :span="8" :offset="2" class="ycbutton">
                <el-tooltip effect="dark" content="删除" placement="top">
                  <el-button type="danger" icon="el-icon-delete" @click="del(scope.row.id)"/>
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
        :page-sizes="[5 ,20, 30, 40, 50]"
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
import { GetList } from '@api/instructions/field'
import { pagging, keyword, buttonPermissions } from '@/mixin'
import Detail from './details'

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
      detailShow: false,
      keyword: "",
      pageIndex: 1,
      pageSize: 20,
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
    },
    insert() {
      this.detailShow = true
      this.$nextTick(() => {
        this.$refs.detail.init()
      })
    },
    edit(row) {
      this.detailShow = true
      this.$nextTick(() => {
        this.$refs.detail.init(row)
      })
    },
    editHidden() {
      this.detailShow = false
      this.init()
    },
    del(id) {
      this.$confirm('此操作将删除该指令类型, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        Delete({ id: id }).then(res => {
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
