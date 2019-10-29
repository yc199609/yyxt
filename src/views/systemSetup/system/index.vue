<template>
  <div class="container">

    <Search
      :show-btn="buttonPermissions('93000201')"
      @search='init'
      @changeKeyword='changeKeyword'
    />

    <el-button
      icon="el-icon-circle-plus-outline"
      type="warning"
      plain
      style="position: absolute; top: 40px; right: 400px"
      @click="addParams"
    >新增系统参数</el-button>

    <el-button
      style="position: absolute; top: 40px; right: 5vw"
      type="primary"
      icon="el-icon-refresh"
      plain
      @click="initTableValue"
    >初始化缓存中的数据库表格Id值</el-button>

    <el-card>
      <el-table
        :data="tableData"
        border
        class="table"
      >
        <el-table-column
          align="center"
          prop="code"
          label="代码"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="name"
          label="名称"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="value"
          label="值"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="description"
          label="备注"
        >
        </el-table-column>
        <el-table-column
          align="center"
          label="操作"
        >
          <template slot-scope="scope">
            <el-button
              v-if="buttonPermissions('93000202')"
              type="warning"
              @click="editShow(scope.row)"
            >
              修改
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <div class="paginationContainer">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageIndex"
        :page-sizes="[20, 30, 40, 50]"
        :page-size='pageSize'
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
      ></el-pagination>
    </div>

    <el-dialog
      title="修改参数"
      :visible.sync="dialogEditVisible"
      :closeOnClickModal="false"
      @close="$refs.form1.clearValidate()"
    >
      <el-form
        ref="form1"
        v-model="editForm"
      >
        <el-form-item
          label="参数值"
          label-width="120px"
        >
          <el-input
            :maxlength="100"
            v-model="editForm.value"
          ></el-input>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogEditVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="submit"
        >确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog
      :visible.sync="addDialog"
      title="新增系统参数"
      :close-on-click-modal="false"
    >
      <el-form
        label-width="80px"
        :model="form"
        :rules="rules"
        ref="form"
      >
        <el-form-item
          label="参数名称"
          prop="name"
        >
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item
          label="参数代码"
          prop="code"
        >
          <el-input v-model="form.code"></el-input>
        </el-form-item>
        <el-form-item
          label="参数值"
          prop="value"
        >
          <el-input v-model="form.value"></el-input>
        </el-form-item>
        <el-form-item
          label="备注"
          prop="description"
        >
          <el-input v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="addDialog=false">取消</el-button>
          <el-button
            type="primary"
            @click="submitForm(form)"
          >保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

  </div>
</template>

<script>
import Search from "@/components/Search";
import { SystemConfigList, SystemConfigUpdate, InitTableID, Create } from "@api/systemSetup/system";
import { buttonPermissions } from '@/mixin'

export default {
  name: "system",
  mixins: [buttonPermissions],
  data() {
    return {
      addDialog: false,
      keyword: '',
      tableData: [],
      editForm: {
        id: "",
        value: ""
      },
      dialogEditVisible: false,
      pageIndex: 1,
      pageSize: 20,
      totalCount: 30,
      form: {
        name: "",
        code: "",
        value: "",
        description: ""
      },
      rules: {
        name: { required: true, message: '参数名称不能为空' },
        code: { required: true, message: '参数代码不能为空' },
        value: { required: true, message: '参数值不能为空' },
        description: { required: true, message: '备注不能为空' }
      }
    };
  },
  mounted() {
    this.init();
  },
  components: {
    Search
  },
  methods: {
    initTableValue() {
      InitTableID().then(res => {
        this.$message({
          type: "success",
          message: "初始化成功",
          duration: 500
        });
      })
    },
    addParams() {
      this.addDialog = true
    },
    submitForm(formName) {
      this.$refs.form.validate(valid => {
        if (valid) {
          Create(formName).then(res => {
            this.addDialog = false
            this.init();
            this.$message({
              message: '新增成功',
              type: 'success'
            });
          })
        } else {
          return false;
        }
      });
    },
    changeKeyword(val) {
      this.keyword = val
    },
    init() {
      SystemConfigList({
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        keyword: this.keyword
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
  .paginationContainer {
    margin-top: 20px;
  }
}
</style>
<style lang='css' scoped>
</style>
