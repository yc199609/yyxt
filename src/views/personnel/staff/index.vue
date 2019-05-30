<template>
  <div class="container">
    <Search @search='init' @changeKeyword='changeKeyword'>
      <el-button type="warning" plain size="small" icon="el-icon-plus" @click="insert">新增</el-button>
    </Search>

    <el-alert :closable="false" title="员工列表" type="info" />

    <el-table class="table" :data="tableData" border>

      <el-table-column align="center" prop="name" label="姓名">
      </el-table-column>

      <el-table-column align="center" label="性别">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.sex===0" type="danger">女</el-tag>
          <el-tag v-else type="primary">男</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" prop="mobile" label="手机号">
      </el-table-column>

      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-row>

            <el-col :offset="3" :span='8'>
              <el-tooltip effect="dark" content="编辑" placement="top">
                <el-button type="warning" icon="el-icon-edit-outline" @click="edit(scope.row.id)"></el-button>
              </el-tooltip>
            </el-col>

            <el-col :span='8' :offset="2">
              <el-tooltip effect="dark" content="删除" placement="top">
                <el-button type="danger" icon="el-icon-delete" @click="del(scope.row.id)"></el-button>
              </el-tooltip>
            </el-col>

          </el-row>
        </template>
      </el-table-column>
    </el-table>

    <div class="paginationContainer">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageIndex"
        :page-sizes="[20, 30, 40, 50]" :page-size='pageSize' layout="total, sizes, prev, pager, next, jumper" :total="totalCount"></el-pagination>
    </div>

    <Detail ref="detail" @reload="init" />
  </div>
</template>
<script>
import Search from "@/components/Search";
import { GetEmployeesByName, DeleteEmployee } from "@api/hr/staff";
import Detail from "./details";
export default {
  name:"staff",
  data() {
    return {
      keyword:'',
      tableData: [],
      pageIndex: 1,
      pageSize: 20,
      totalCount: 30
    };
  },
  components: {
    Search,
    Detail
  },
  mounted() {
    this.init();
  },
  methods: {
    changeKeyword(val){
      this.keyword = val
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.init();
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.init();
    },
    init() {
      GetEmployeesByName({
        name:this.keyword,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      }).then(res => {
        this.$set(this, "tableData", res.data.items);
        this.pageIndex = res.data.pageIndex;
        this.pageSize = res.data.pageSize;
        this.totalCount = res.data.totalCount;
      });
    },
    insert() {
      this.$refs.detail.init();
    },
    edit(id) {
      this.$refs.detail.init(id);
    },
    del(id) {
      this.$confirm("此操作将删除员工,是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        DeleteEmployee(id).then(res => {
          this.$message({
            type: "success",
            message: "删除成功",
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
  padding: 1vw 0 0;
  .table {
    width: 100%;
  }
  .paginationContainer {
    margin-top: 20px;
  }
}
</style>
