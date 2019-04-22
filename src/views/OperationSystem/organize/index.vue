<template>
  <div style="padding:1vw;width:82.6vw;margin:auto;">
    <section class="conditional-query-container" style="margin-top: .5rem">
      <el-row class="query-wrapper-row">
        <el-col :span="10">
          <el-button
            type="success"
            size="small"
            @click="showDialogCreatedOrganize=true"
          >创建机构</el-button>
        </el-col>

        <el-col :span="20" class="query-wrapper-row-right">
          <section class="query-wrapper-row-item">
            <section class="label-text">复合筛选</section>

            <section>
              <el-input
                placeholder="请输入关键字搜索"
                @keyup.enter.native="handleLoadAndQuery"
                size="small"
                :clearable="true"
              ></el-input>
            </section>
          </section>
        </el-col>

        <el-col :span="2">
          <el-button type="danger" size="small" icon="el-icon-search" @click="handleLoadAndQuery">搜索</el-button>
        </el-col>
      </el-row>
    </section>

    <el-alert :closable="false" title="机构列表" type="success">
      <router-view/>
    </el-alert>

    <el-table :data="retData" border style="width: 100%">
      <el-table-column align="center" prop="name" label="简称"></el-table-column>
      <el-table-column align="center" prop="code" label="代码"></el-table-column>
      <el-table-column align="center" prop="dmsSite" label="站点"></el-table-column>
      <el-table-column align="center" prop="isDMSEnable" label="状态"></el-table-column>
      <el-table-column align="center" prop="parentCompanyName" label="父级机构名"></el-table-column>
      <el-table-column align="center" prop="operation" label="操作">
        <template slot-scope="scope">
          <el-button style="margin-bottom: 10px;" @click="baseInfo(scope.row)">基本信息</el-button>
          <br>
          <el-button
            style="margin-bottom: 10px;"
            type="primary"
            @click="setOrganize(scope.row)"
          >机构设置</el-button>
          <br>
          <el-button type="success" @click="busParams(scope.row)">业务参数</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="block" style="margin-top: 15px;" :data="pageData">
      <!-- <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageData.pageIndex"
        :page-sizes="[2, 5, 10, 100]"
        :page-size="pageData.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageData.totalCount"
      ></el-pagination> -->
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

    <el-dialog :visible.sync="showDialogInformation" :modal-append-to-body="false">
      <baseInformation ref="baseInformation" v-if="showDialogInformation" @hidden="hidden"/>
    </el-dialog>

    <el-dialog :visible.sync="showDialogSetupOrganize" :modal-append-to-body="false">
      <setupOrganize :organizeData="organizeData"/>
    </el-dialog>

    <el-dialog :visible.sync="showDialogBusinessParameters" :modal-append-to-body="false">
      <businessParameters :businessData="businessData"/>
    </el-dialog>

    <el-dialog :visible.sync="showDialogCreatedOrganize" :modal-append-to-body="false">
      <createdOrganize @hiddenOrganize="hiddenOrganize"/>
    </el-dialog>
  </div>
</template>

<script>
import baseInformation from "./baseInformation"
import setupOrganize from "./setupOrganize"
import businessParameters from "./businessParameters"
import createdOrganize from "./createdOrganize"
import { companyList, getBaseInfoById, getConfigById, getSystemInfoById } from "@/api/organize"

export default {
  components: { baseInformation, setupOrganize, businessParameters, createdOrganize },
  data() {
    return {
      ret: "",
      retData: [],
      pageData: "",
      businessData: [],
      organizeData: "",
      currentPage: "",
      pageIndex: 1,
      pageSize: 20,
      totalCount: 1,
      showDialogInformation: false,
      showDialogSetupOrganize: false,
      showDialogBusinessParameters: false,
      showDialogCreatedOrganize: false
    };
  },
  methods: {
    init() {
      debugger
      companyList({
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
        // totalCount: this.totalCount
      }).then(res => {
        debugger
        console.log(res)
        this.pageIndex = res.data.pageIndex
        this.pageSize = res.data.pageSize
        this.totalCount = res.data.totalCount
        this.tableData = res.data.items
      })
    },
    organizeInformation() {
      // 获取机构列表信息
      const _that = this;
      return new Promise((resolve, reject) => {
        companyList()
          .then(response => {
            _that.ret = response.data;
            _that.retData = response.data.items;
            _that.pageData = response.data;
          })
          .catch(err => {
            console.log(err);
          });
      });
    },
    baseInfo(res) {
      // 基本信息
      const _that = this;
      _that.showDialogInformation = true;
      return new Promise((resolve, reject) => {
        getBaseInfoById(res.id)
          .then(response => {
            const formData = response.data;
            this.$refs.baseInformation.form = formData;
            console.log(formData);
          })
          .catch(err => {
            console.log(err);
          });
      });
    },
    busParams(res) {
      // 业务参数
      const _that = this;
      const ret = this.ret;
      this.showDialogBusinessParameters = true;
      return new Promise((resolve, reject) => {
        getConfigById(res.id, "", ret.pageIndex, ret.PageSize)
          .then(response => {
            _that.businessData = response.data.items;
            console.log(_that.businessData);
          })
          .catch(err => {
            console.log(err);
          });
      });
    },
    setOrganize(res) {
      // 获取系统设置  机构设置
      const _that = this
      _that.showDialogSetupOrganize = true
      return new Promise((resolve,reject) => {
        getSystemInfoById(res.id).then(res => {
          _that.organizeData = res.data
          console.log(_that.organizeData)
        }).catch(err => {
          console.log(err)
        })
      })
    },
    hidden() {
      this.showDialogInformation = false;
    },
    hiddenOrganize() {
      this.showDialogCreatedOrganize = false;
    },
    handleLoadAndQuery() {
      console.log("点击搜索按钮了");
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.init()
    },
    handleCurrentChange(val) {
      this.pageIndex = val
      this.init()
    }
  },
  created() {
    this.organizeInformation()
  },
  mounted() {
    this.init()
  }
};
</script>

<style lang="scss" scoped>
/*表单模块样式*/

/*查询条件样式区*/
.conditional-query-container .query-wrapper-row .query-wrapper-row-left {
  display: -webkit-inline-flex;
  display: inline-flex;
  justify-content: flex-start;
  align-items: flex-end;
  width: 6%;
}

.conditional-query-container .query-wrapper-row .query-wrapper-row-right {
  margin-right: 1rem;
  display: flex;
  display: -webkit-flex;
  justify-content: flex-start;
}

.conditional-query-container .query-wrapper-row-item .label-text {
  color: #c0c4cc;
  font-size: 0.75rem;
  padding-bottom: 0.3rem;
}

.conditional-query-container .query-wrapper-row-item {
  height: 3.5rem;
  display: inline-flex;
  display: -webkit-inline-flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-right: 1rem;
  width: 100%;
}

.conditional-query-container .query-wrapper-row-item:last-child {
  padding-right: 0;
}

.conditional-query-container .query-wrapper-row {
  display: flex;
  display: -webkit-flex;
  align-items: flex-end;
  font-size: 0.875rem;
  height: 3.5rem;
}

.conditional-query-container .query-wrapper-row:not(:last-child) {
  margin-bottom: 1rem;
}

.conditional-query-container {
  padding: 1rem;
  border: 1px solid #e4e7ed;
  border-radius: 0.3rem;
  margin-bottom: 20px;
  background-color: #fff;
}
</style>
