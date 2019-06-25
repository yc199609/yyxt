<template>
  <div class="container">
    <el-card>
      <div slot="header" class="clearfix">
        <span>角色列表</span>
        <el-button v-if="buttonPermissions('940010302')" style="float: right; padding: 3px 0" type="text" @click="insert"><i class="el-icon-plus"/> 新增角色</el-button>
      </div>
      <el-table v-if="buttonPermissions('940010301')" :data="tableData" class="table" border>

        <el-table-column align="center" prop="name" label="角色名称"/>

        <el-table-column align="center" prop="code" label="角色代码"/>

        <el-table-column align="center" prop="remark" label="备注"/>

        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-row>
              <el-col :offset="3" :span="8" class="ycbutton">
                <el-tooltip effect="dark" content="编辑" placement="top">
                  <el-button v-if="buttonPermissions('940010303')" type="warning" icon="el-icon-edit-outline" @click="edit(scope.row.id)"/>
                </el-tooltip>
              </el-col>
              <el-col :span="8" :offset="2" class="ycbutton">
                <el-tooltip effect="dark" content="删除" placement="top">
                  <el-button v-if="buttonPermissions('940010304')" type="danger" icon="el-icon-delete" @click="del(scope.row.id)"/>
                </el-tooltip>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <Detail v-if="detailShow" ref="detail" @reload="editHidden" />

  </div>
</template>
<script>
import Search from '@/components/Search'
import { GetAll, deleteRole } from '@api/Personnel/role'
import Detail from './details'
import { keyword,buttonPermissions } from '@/mixin'
export default {
  name: 'Role',
  components: {
    Search,
    Detail
  },
  mixins: [keyword,buttonPermissions],
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
    init() {
      GetAll().then(res => {
        this.$set(this, 'tableData', res.data)
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
      deleteRole(id)
        .then(res => {
          this.$message({
            type: 'success',
            message: '删除成功',
            duration: 500,
            onClose: () => {
              this.init()
            }
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
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}
</style>
