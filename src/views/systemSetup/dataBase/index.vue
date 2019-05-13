<template>
  <div class="container">

    <Search @search='init' />

    <el-alert :closable="false" title="数据库参数" type="info" />

    <el-table class="Thistable" :data="tableData" border style="width: 100%;">
      <el-table-column align="center" prop="id" label="数据库id">
      </el-table-column>
      <el-table-column align="center" prop="name" label="数据库名">
      </el-table-column>
      <el-table-column align="center" label="服务器IP/端口">
        <template slot-scope="scope">
          <div>
            <span>ip:</span><span>{{scope.row.ip}}</span><br />
            <span>端口:</span><span>{{scope.row.port}}</span><br />
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="userName" label="数据库用户名">
      </el-table-column>
      <el-table-column align="center" label="状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status===100" type="success">启用</el-tag>
          <el-tag v-else type="danger">停用</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-row>
            <el-col :span='8' class="ycbutton">
              <el-tooltip effect="dark" content="修改名称" placement="top">
                <el-button type="primary" icon="el-icon-edit-outline" @click="changNameDialog(scope.row)"></el-button>
              </el-tooltip>
            </el-col>
            <el-col :span='8' class="ycbutton">
              <el-tooltip effect="dark" content="修改配置" placement="top">
                <el-button type="warning" icon="el-icon-setting" @click="modifyDialog(scope.row)"></el-button>
              </el-tooltip>
            </el-col>
            <el-col :span='8' class="ycbutton">
              <el-tooltip effect="dark" :content="scope.row.status===100?'停用':'启用'" placement="top">
                <el-button :type="scope.row.status===100?'danger':'success'" :icon="scope.row.status===100?'el-icon-remove-outline':'el-icon-circle-check-outline'"
                  @click="offOrON(scope.row,scope.$index)"></el-button>
              </el-tooltip>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="修改名称" :visible.sync="dialogChangeVisible" :closeOnClickModal="false">
      <el-form :model="changNameform" ref='form' :rules="rules">
        <el-form-item prop="name" label="数据库名称" label-width="120px">
          <el-input v-model="changNameform.name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogChangeVisible = false">取 消</el-button>
        <el-button type="primary" @click="changName">确 定</el-button>
      </div>
    </el-dialog>

    <ModifyForm v-if="changeDbVisible" ref="modifyForm" @reload='init'/>

  </div>
</template>

<script>
import {
  DataBaseList,
  UpdateBaseInfo,
  UpdateStatus
} from "@api/systemSetup/dataBase";
import ModifyForm from "./ModifyForm";
import Search from "@/components/Search";

export default {
  name: "dataBase",
  data() {
    return {
      tableData: [
        {
          id: "",
          ip: "",
          isDefault: 0,
          name: "",
          port: '',
          status: '',
          userName: ""
        }
      ],
      changNameform: {
        id: "",
        name: ""
      },
      rules: {
        name: [{ required: true, message: "请输入数据库名称", trigger: "blur" }]
      },
      dialogChangeVisible: false,
      changeDbVisible: false,
      toolbeRunning: false // 节流阀
    };
  },
  components: {
    ModifyForm,
    Search
  },
  mounted() {
    this.init();
  },
  methods: {
    init(keyword) {
      DataBaseList(keyword).then(res => {
        this.tableData = res.data;
      });
    },
    //  打开修改数据库名称的弹框
    changNameDialog(data) {
      this.changNameform = { id: data.id, name: data.name };
      this.dialogChangeVisible = true;
    },
    // 提交修改数据库名称的表单
    changName() {
      this.$refs.form.validate(valid => {
        if (valid) {
          UpdateBaseInfo(this.changNameform).then(res => {
            this.$message({
              type: "success",
              message: "修改成功",
              duration: 500,
              onClose: () => {
                this.dialogChangeVisible = false;
                this.init();
              }
            });
          });
        }
      });
    },
    // 关闭修改数据库配置信息的弹框
    modifyHidden() {
      this.changeDbVisible = false;
    },
    // 打开修改数据库配置信息的弹框
    modifyDialog(data) {
      this.changeDbVisible = true;
      this.$nextTick(()=>{
        this.$refs.modifyForm.init(data)
      })
    },
    offOrON(data, i) {
      if (this.toolbeRunning === false) {
        this.toolbeRunning = true;
        if (data.status === 0) {
          //目前是停用
          this.changStatus("on", data, i);
        } else {
          //目前是启用
          this.changStatus("off", data, i);
        }
      }
    },
    // 发送更改请求
    changStatus(type, data, i) {
      UpdateStatus({
        id: data.id,
        status: type === "on" ? 100 : 0
      })
        .then(res => {
          this.$message({
            type: "success",
            message: `已成功${type === "on" ? "启用" : "停用"}`,
            duration: 500,
            onClose: () => {
              this.toolbeRunning = false;
              var obj = { ...data, status: type === "on" ? 100 : 0 };
              this.$set(this.tableData, i, obj);
            }
          });
        })
        .catch(err => {
          this.toolbeRunning = false;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  padding: 1vw 3vw 0;
}
.pagination {
  margin-top: 15px;
}
</style>

<style lang="css" scoped>
.Thistable >>> .el-table__body-wrapper {
  max-height: 50vh;
  overflow-y: auto;
}
.ycbutton >>> .el-button--medium {
  padding: 0.5vw 1vw;
}
</style>
