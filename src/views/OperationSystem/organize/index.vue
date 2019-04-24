<template>
  <div style="padding:1vw;width:82.6vw;margin:auto;">
    <section class="conditional-query-container" style="margin-top: .5rem">
      <el-row class="query-wrapper-row">
        <el-col :span="10">
          <el-button
            type="success"
            size="small"
            @click="createdOrganizeDialog"
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

    <el-alert :closable="false" title="机构列表" type="success"></el-alert>

    <el-table :data="retData" border class="Thistable" style="width: 100%;">
      <el-table-column align="center" prop="name" label="简称"></el-table-column>
      <el-table-column align="center" prop="code" label="代码"></el-table-column>
      <el-table-column align="center" prop="dmsSite" label="站点"></el-table-column>
      <el-table-column align="center" prop="isDMSEnable" label="状态"></el-table-column>
      <el-table-column align="center" prop="parentCompanyName" label="父级机构名"></el-table-column>
      <el-table-column align="center" prop="operation" label="操作">
        <template slot-scope="scope">
          <el-row>
            <el-col :span='8' class="ycbutton">
              <el-tooltip content="基本信息" placement="top" effect="dark">
                <el-button  type="info" icon="el-icon-document" @click="baseInfo(scope.row.id)"></el-button>
              </el-tooltip>
            </el-col>
            <el-col :span='8' class="ycbutton">
              <el-tooltip content="机构设置" placement="top" effect="dark">
                <el-button type="warning" icon="el-icon-setting" @click="setOrganize(scope.row.id)"></el-button>
              </el-tooltip>
            </el-col>
            <el-col :span='8' class="ycbutton">
              <el-tooltip content="业务参数" placement="top" effect="dark">
                <el-button type="success" icon="el-icon-menu" @click="busParams(scope.row.id)"></el-button>
              </el-tooltip>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
    </el-table>

    <div class="block" style="margin-top: 15px;">
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

    <baseInformation @render="init" ref="baseInf"/>

    <setupOrganize @render="init" ref="setOrganize"/>

    <businessParameters @render="init" ref="businessData"/>

    <createdOrganize @render="init" ref="createdOrganize"/>

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
      businessData: [],
      organizeData: {},
      currentPage: "",
      keyword: "",
      pageIndex: 1,
      pageSize: 20,
      totalCount: 1,
      showDialogBusinessParameters: false,
      showDialogCreatedOrganize: false
    };
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      // 获取机构列表信息
      companyList({
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      }
      ).then(res => {
        this.pageIndex = res.data.pageIndex
        this.pageSize = res.data.pageSize
        this.totalCount = res.data.totalCount
        this.$set(this,"retData",res.data.items)
      })
    },
    // 打开基本信息弹框
    baseInfo(id) {
      // 基本信息
      this.$refs.baseInf.init(id)
   },
   // 获取系统设置  机构设置
    setOrganize(id) {
      this.$refs.setOrganize.init(id)
    },
    // 业务参数
    busParams(id) {
      this.$refs.businessData.init(id)
    },
    // 新增弹框
    createdOrganizeDialog(){
      this.$refs.createdOrganize.init()
    },
    handleLoadAndQuery() {
      console.log("点击搜索按钮了")
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

<style lang='css' scoped>
  .Thistable >>> .el-table__body-wrapper {
      max-height:50vh;
      overflow-y:auto;
  }
  .ycbutton >>> .el-button--medium {
    padding: 0.5vw 1vw;
  }
</style>