<template>
  <el-dialog :visible.sync="visible">
    <div style="padding:1vw;">
      <span>业务参数</span>
      <hr style="background-color:#f7eaea; height: 1px; border: none;">
      <el-table
        :data="businessData"
        border
        style="width: 100%"
      >
        <el-table-column
          align="center"
          prop="code"
          label="代码"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="name"
          label="名称"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="value"
          label="值"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="description"
          label="备注"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="operation"
          label="操作"
        >
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              @click="modify(scope.row)"
            >修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-dialog>

</template>

<script>
import { updateConfigItem,getConfigById } from "@/api/organize";

export default {
  data() {
    return {
      visible: false,
      businessData: [],
      pageIndex: 1,
      PageSize: 20
    }
  },
  methods: {
    init(id) {
      this.visible = true
      getConfigById({id,pageIndex:this.pageIndex,PageSize:this.PageSize})
        .then(res => {
          this.$set(this,"businessData",res.data.items)
        })
    },
    modify(res) {
      // 修改业务参数值
      console.log(res);
      const _that = this;
      return new Promise((resolve, reject) => {
        updateConfigItem(res)
          .then(response => {
            console.log(response);
          })
          .catch(err => {
            console.log(err);
          });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
