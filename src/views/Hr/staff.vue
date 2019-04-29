<template>
  <div class="container">
    <Search @search='init'>
      <el-button type="warning" plain size="small" icon="el-icon-plus" @click="insert">新增</el-button>
    </Search>

    <el-alert :closable="false" title="员工列表" type="success" />

    <el-table class="Thistable" :data="tableData" border style="width: 100%;">

      <el-table-column align="center" prop="name" label="姓名">
      </el-table-column>

      <el-table-column align="center" prop="code" label="登录账号">
      </el-table-column>

      <el-table-column align="center" label="性别">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.sex===100" type="primary">男</el-tag>
          <el-tag v-else type="danger">女</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" prop="mobile" label="手机号">
      </el-table-column>

      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-row>
            <el-col :offset="3" :span='8' class="ycbutton">
              <el-tooltip effect="dark" content="编辑" placement="top">
                <el-button type="primary" icon="el-icon-edit-outline" @click="edit(scope.row)"></el-button>
              </el-tooltip>
            </el-col>

            <el-col :span='8' :offset="2" class="ycbutton">
              <el-tooltip effect="dark" content="删除" placement="top">
                <el-button type="warning" icon="el-icon-setting" @click="del(scope.row)"></el-button>
              </el-tooltip>
            </el-col>

          </el-row>
        </template>
      </el-table-column>
    </el-table>

  <Detail ref="detail" />
  </div>
</template>
<script>
import Search from "@/components/Search";
import { GetEmployeesByName } from "@api/hr/staff";
import Detail from './details'
export default {
  data() {
    return {
      tableData: []
    };
  },
  components:{
    Search,
    Detail
  },
  mounted() {
    this.init();
  },
  methods: {
    init(keyword) {
      GetEmployeesByName(keyword)
      .then(res => {
        this.$set(this,'tableData',res.data)
      });
    },
    insert(){},
    edit() {
      this.$refs.detail.init()
    },
    del() {}
  }
};
</script>
<style lang="scss" scoped>
.container {
  padding: 1vw 3vw 0;
}
</style>
