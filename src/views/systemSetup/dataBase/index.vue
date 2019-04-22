<template>
  <div style="padding:3vw;width:82.6vw">
    <el-alert
      :closable="false"
      title="数据库参数"
      type="success"
    />

    <el-table
      :data="tableData"
       max-height="50vh"
      border
      style="width: 100%;overflow-y: auto;"
    >
      <el-table-column
        align="center"
        prop="id"
        label="数据库id"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="name"
        label="数据库名"
      >
      </el-table-column>
      <el-table-column
        align="center"
        label="服务器IP/端口"
      >
        <template slot-scope="scope">
          <div>
            <span>ip:</span><span>{{scope.row.ip}}</span><br />
            <span>端口:</span><span>{{scope.row.port}}</span><br />
          </div>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="userName"
        label="数据库用户名"
      >
      </el-table-column>
      <el-table-column
        align="center"
        label="状态"
      >
        <template slot-scope="scope">
          <el-tag
            v-if="scope.row.status===0"
            type="success"
          >启用</el-tag>
          <el-tag
            v-else
            type="danger"
          >停用</el-tag>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="操作"
      >
        <template slot-scope="scope">
          <el-row>
            <el-col :span='8'>
              <el-tooltip
                class="item"
                effect="dark"
                content="修改名称"
                placement="top"
              >
                <el-button
                  type="primary"
                  icon="el-icon-edit-outline"
                  @click="changNameDialog(scope.row)"
                ></el-button>
              </el-tooltip>
            </el-col>
            <el-col :span='8'>
              <el-tooltip
                class="item"
                effect="dark"
                content="修改配置"
                placement="top"
              >
                <el-button
                  type="warning"
                  icon="el-icon-setting"
                  @click="modifyDialog(scope.row)"
                ></el-button>
              </el-tooltip>
            </el-col>
            <el-col :span='8'>
              <el-tooltip
                class="item"
                effect="dark"
                :content="scope.row.status===0?'停用':'启用'"
                placement="top"
              >
                <el-button
                  :type="scope.row.status===0?'danger':'success'"
                  :icon="scope.row.status===0?'el-icon-remove-outline':'el-icon-circle-check-outline'"
                  @click="offOrON(scope.row,scope.$index)"
                ></el-button>
              </el-tooltip>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title="修改名称"
      :visible.sync="dialogChangeVisible"
    >
      <el-form v-model="changNameform">
        <el-form-item
          label="数据库名称"
          label-width="120px"
        >
          <el-input v-model="changNameform.name"></el-input>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogChangeVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="changName"
        >确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="修改数据库配置信息"
      :visible.sync="changeDbVisible"
    >
      <ModifyForm @init='init' @hidden="modifyHidden" :dataObj='modifyForm' :isDefault='changNameform.isDefault'/>
    </el-dialog>

    <!-- <div
      class="block pagination"
    >
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="1"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      ></el-pagination>
    </div> -->

  </div>
</template>

<script>
import { DataBaseList, UpdateBaseInfo, UpdateStatus } from '@api/systemSetup/dataBase'
import ModifyForm from './ModifyForm'
export default {
  data() {
    return {
      tableData: [
        {
          id: "nulla eu minim",
          ip: "elit est eiusmod",
          isDefault: -75270224,
          name: "occaecat voluptate non sit",
          port: -3742555,
          status: 28552227,
          userName: "laboris"
        }
      ],
      changNameform: {
        id: '',
        name: ''
      },
      modifyForm: {
        id: Number,
        ip: String,
        port: Number,
        userName: String,
        password: String,
        isDefault: Number,
        dbName: String
      },
      dialogChangeVisible: false,
      changeDbVisible: false,
      toolbeRunning:false
    }
  },
  components:{
    ModifyForm
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      DataBaseList()
        .then(res => {
          if (res.code === 0) {
            this.tableData = res.data
          } else {
            this.$message.error(data.message)
          }
        })
        .catch(err => {
          this.$message.error('错误')
        })
    },
    // handleSizeChange(val) {
    //   console.log(`每页 ${val} 条`);
    // },
    // handleCurrentChange(val) {
    //   console.log(`当前页: ${val}`);
    // },
    changNameDialog(data) {
      this.changNameform = { id: data.id, name: data.name }
      this.dialogChangeVisible = true
    },
    changName() {
      UpdateBaseInfo(this.changNameform)
        .then(res => {
          if (res.code === 0) {
            this.$message({
              type: "success",
              message: "修改成功",
              duration: 500,
              onClose: () => {
                this.dialogChangeVisible = false
                this.init()
              }
            })
          } else {
            this.$message.error(res.message)
          }
        })
        .catch(err => {
          this.$message.error('错误')
        })
    },
    modifyHidden(){
      this.changeDbVisible = false
    },
    modifyDialog(data) {
      this.modifyForm = data
      this.changeDbVisible = true
    },
    offOrON(data, i) {
      if(this.toolbeRunning===false){
        this.toolbeRunning =true
        if (data.status === 0) { //目前是停用
          UpdateStatus({
            id: data.id,
            status: 100
          }).then(res => {
            this.toolbeRunning = false
            var obj = { ...data, status: 100 }
            this.$set(this.tableData, i, obj)
          }).catch(err => {
            this.toolbeRunning = false
          })
        } else { //目前是启用
          UpdateStatus({
            id: data.id,
            status: 0
          }).then(res => {
            this.toolbeRunning = false
            var obj = { ...data, status: 0 }
            this.$set(this.tableData, i, obj)
          }).catch(err => {
            this.toolbeRunning = false
          })
        }
      }
    },
  }
}
</script>

<style lang="scss" scoped>
  .pagination{
    margin-top: 15px;
  }
</style>
