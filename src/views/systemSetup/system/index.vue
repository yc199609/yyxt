<template>
  <div class="container">

    <Search @search='init' />

    <el-alert :closable="false" title="系统参数" type="success">
      <router-view />
    </el-alert>

    <el-table :data="tableData" border max-height="50vh" style="width: 100%;overflow-y: auto;" class="table">
      <el-table-column align="center" prop="code" label="代码">
      </el-table-column>
      <el-table-column align="center" prop="name" label="名称">
      </el-table-column>
      <el-table-column align="center" prop="value" label="值">
      </el-table-column>
      <el-table-column align="center" prop="description" label="备注">
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="warning" @click="editShow(scope.row)">
            修改
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="paginationContainer">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageIndex"
        :page-sizes="[20, 30, 40, 50]" :page-size='pageSize' layout="total, sizes, prev, pager, next, jumper" :total="totalCount"></el-pagination>
    </div>

    <el-dialog title="修改参数" :visible.sync="dialogEditVisible" :closeOnClickModal="false">
      <el-form v-model="editForm">
        <el-form-item label="参数值" label-width="120px">
          <el-input v-model="editForm.value"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEditVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import Search from "@/components/Search";
import { SystemConfigList, SystemConfigUpdate } from "@api/systemSetup/system";

export default {
  name: "system",
  data() {
    return {
      tableData: [],
      editForm: {
        id: "",
        value: ""
      },
      dialogEditVisible: false,
      pageIndex: 1,
      pageSize: 20,
      totalCount: 30
    };
  },
  mounted() {
    this.init();
  },
  components: {
    Search
  },
  methods: {
    init(keyword) {
      SystemConfigList({
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        keyword
      }).then(res => {
        this.pageIndex = res.data.pageIndex;
        this.pageSize = res.data.pageSize;
        this.totalCount = res.data.totalCount;
        this.tableData = res.data.items;
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.init();
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.init();
    },
    editShow(res) {
      this.editForm.id = res.id;
      this.editForm.value = res.value;
      this.dialogEditVisible = true;
    },
    submit() {
      SystemConfigUpdate(this.editForm).then(res => {
        this.$message({
          type: "success",
          message: "修改成功",
          duration: 500,
          onClose: () => {
            this.init();
            this.dialogEditVisible = false;
          }
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  padding: 1vw 3vw 0;
  .table {
    width: 100%;
  }
  .paginationContainer {
    margin-top: 20px;
  }
}
</style>
