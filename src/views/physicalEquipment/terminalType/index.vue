<template>
  <div class="container">
    <el-button type="warning" plain size="small" icon="el-icon-plus" @click="insert">新增</el-button>
    <el-card>
      <el-table :data="tableData" class="table" border>
        <el-table-column align="center" prop="id" label="终端类型Id"/>
        <el-table-column align="center" prop="name" label="终端类型名称"/>
        <el-table-column align="center" prop="code" label="类型代码（型号）"/>
        <el-table-column align="center" prop="description" label="类型描述说明"/>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <div>
              <el-button @click="handleEdit(scope.row.id)">修改</el-button>
              <el-button @click="handleDelete(scope.row.id)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <Detail v-if="detailShow" ref="detail" @reload="reload" />
  </div>
</template>
<script>
import Search from '@/components/Search'
import { getAllTerminalType, deleteTerminalType } from '@api/physicalEquipment/terminalType'
import { buttonPermissions } from '@/mixin'
import Detail from './details'

export default {
  components: {
    Search,
    Detail
  },
  mixins: [buttonPermissions],
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
      getAllTerminalType({
      }).then(res => {
        this.$set(this, 'tableData', res.data)
      })
    },
    insert() {
      this.detailShow = true
      this.$nextTick(() => {
        this.$refs.detail.init()
      })
    },
    handleEdit(id) {
      this.detailShow = true
      this.$nextTick(() => {
        this.$refs.detail.init(id)
      })
    },
    reload() {
      this.detailShow = false
      this.init()
    },
    handleDelete(id) {
      this.$confirm('此操作将删除该终端类型, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteTerminalType(id).then(res => {
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
