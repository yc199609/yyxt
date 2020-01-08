<template>
  <div class="container">
    <Search :show-btn="true" @search="init" @changeKeyword="changeKeyword">
      <el-button type="warning" plain size="small" icon="el-icon-plus" @click="insert">新增</el-button>
    </Search>

    <el-card>
      <el-table :data="tableData" class="table" border>

        <el-table-column align="center" prop="id" label="部位Id"/>
        <el-table-column align="center" prop="name" label="部位名称"/>
        <el-table-column align="center" prop="code" label="部位代号"/>
        <el-table-column align="center" prop="description" label="部位描述"/>
        <el-table-column align="center" prop="deviceTypeId" label="设备类型Id"/>

        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-row>
              <!-- <el-col :offset="3" :span="8" class="ycbutton">
                <el-tooltip effect="dark" content="编辑" placement="top">
                  <el-button type="warning" icon="el-icon-edit-outline" @click="edit(scope.row)"/>
                </el-tooltip>
              </el-col> -->

              <!-- <el-col :span="8" :offset="2" class="ycbutton">
                <el-tooltip effect="dark" content="删除" placement="top">
                  <el-button type="danger" icon="el-icon-delete" @click="del(scope.row.id)"/>
                </el-tooltip>
              </el-col> -->

            </el-row>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- <div class="paginationContainer">
      <el-pagination
        :current-page="pageIndex"
        :page-sizes="[5 ,20, 30, 40, 50]"
        :page-size="pageSize"
        :total="totalCount"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"/>
    </div> -->

    <Detail v-if="detailShow" ref="detail" @reload="editHidden" />
  </div>
</template>
<script>
import Search from '@/components/Search'
import { GetDeviceLocationByDeviceTypeId } from '@api/physicalEquipment/location'
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
      keyword: "",
      // pageIndex: 1,
      // pageSize: 20,
      // totalCount: 30
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      GetDeviceLocationByDeviceTypeId({ deviceTypeId: 5 }).then(res => {
        this.$set(this, 'tableData', res.data)
      })
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
        del({ id: id }).then(res => {
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
