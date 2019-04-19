<template>
  <div style="padding:1vw;">
    <span>业务参数</span>
    <hr style="background-color:#f7eaea; height: 1px; border: none;">
    <el-table :data="businessData" border style="width: 100%">
      <el-table-column align="center" prop="code" label="代码"></el-table-column>
      <el-table-column align="center" prop="name" label="名称"></el-table-column>
      <el-table-column align="center" prop="value" label="值"></el-table-column>
      <el-table-column align="center" prop="description" label="备注"></el-table-column>
      <el-table-column align="center" prop="operation" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" @click="modify(scope.row)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { updateConfigItem } from "@/api/organize";

export default {
  data() {
    return {
    }
  },
  props: ["businessData"],
  created() {

  },
  methods: {
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
