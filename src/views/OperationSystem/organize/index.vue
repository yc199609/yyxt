<template>
  <div style="padding:1vw;width:82.6vw;margin:auto;">
    <section class="conditional-query-container" style="margin-top: .5rem">
      <el-row class="query-wrapper-row">
        <el-col :span="5" class="query-wrapper-row-right">
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

        <el-col :span="5">
          <el-button type="danger" size="small" icon="el-icon-search" @click="handleLoadAndQuery">搜索</el-button>
        </el-col>
      </el-row>
    </section>

    <el-alert :closable="false" title="机构列表" type="success">
      <router-view/>
    </el-alert>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column align="center" prop="Abbreviation" label="简称"></el-table-column>
      <el-table-column align="center" prop="code" label="代码"></el-table-column>
      <el-table-column align="center" prop="site" label="站点">
        <!-- <template slot-scope="{row}">
          <router-link :to="'/example/edit/'+row.id" class="link-type">
            <span>{{ row.title }}</span>
          </router-link>
        </template>-->
      </el-table-column>
      <el-table-column align="center" prop="state" label="状态"></el-table-column>
      <el-table-column align="center" prop="ParentalOrganizationName" label="父级机构名"></el-table-column>
      <el-table-column align="center" prop="operation" label="操作">
        <template slot-scope="scope">
          <el-button style="margin-bottom: 10px;" @click="showDialogInformation=true">基本信息</el-button><br>
          <el-button style="margin-bottom: 10px;" type="primary" @click="showDialogSetupOrganize=true">机构设置</el-button><br>
          <el-button type="success" @click="showDialogBusinessParameters=true">业务参数</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :visible.sync="showDialogInformation"
      :modal-append-to-body="false"
    >
      <baseInformation/>
    </el-dialog>

    <el-dialog
      :visible.sync="showDialogSetupOrganize"
      :modal-append-to-body="false"
    >
      <setupOrganize/>
    </el-dialog>

    <el-dialog
      :visible.sync="showDialogBusinessParameters"
      :modal-append-to-body="false"
    >
      <businessParameters/>
    </el-dialog>

    <div class="block" style="margin-top: 15px;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="1"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import baseInformation from './baseInformation'
import setupOrganize from './setupOrganize'
import businessParameters from './businessParameters'

export default {
  components: { baseInformation, setupOrganize, businessParameters },
  data() {
    return {
      tableData: [
        {
          Abbreviation: "Madik",
          code: "Madik",
          site: "www.Madik.gosafenet.com",
          state: "正常",
          ParentalOrganizationName: "迈迪克集团",
          operation: "true"
        },
        {
          Abbreviation: "Madik",
          code: "Madik",
          site: "www.Madik.gosafenet.com",
          state: "正常",
          ParentalOrganizationName: "迈迪克集团",
          operation: "true"
        },
        {
          Abbreviation: "Madik",
          code: "Madik",
          site: "www.Madik.gosafenet.com",
          state: "正常",
          ParentalOrganizationName: "迈迪克集团",
          operation: "true"
        },
        {
          Abbreviation: "Madik",
          code: "Madik",
          site: "www.Madik.gosafenet.com",
          state: "正常",
          ParentalOrganizationName: "迈迪克集团",
          operation: "true"
        }
      ],
      currentPage: '',
      showDialogInformation: false,
      showDialogSetupOrganize: false,
      showDialogBusinessParameters: false
    };
  },
  methods: {
    handleLoadAndQuery() {
      console.log("点击搜索按钮了");
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
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
