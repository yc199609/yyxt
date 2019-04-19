<template>
  <div style="padding:30px;">
    <el-form :data="organizeData">
      <span>机构设置</span>
      <hr style="background-color:#f7eaea; height: 1px; border: none;">
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item label="id">
            <el-input :value="organizeData.id"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="站点">
            <el-input :value="organizeData.dmsSite"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <!-- <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item label="数据库"><br>
            <el-select placeholder="请选择数据库">
              <el-option :label="organizeData.db.name"></el-option>
              <el-option label="DB2" value="DB2"></el-option>
              <el-option label="DB3" value="DB3"></el-option>
              <el-option label="DB4" value="DB4"></el-option>
              <el-option label="DB5" value="DB5"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row> -->

      <template>
        <el-form-item label="系统开通">
          <el-checkbox v-model="checked" label="管理系统"></el-checkbox>
        </el-form-item>
      </template>

      <el-button type="primary" style="float: right;" @click="saveInfo">保存</el-button>
    </el-form>
  </div>
</template>

<script>
import { companyCreate } from "@/api/organize";

export default {
  data() {
    return {
      checked: this.organizeData.isDMSEnable
    }
  },
  props: ["organizeData"],
  methods: {
    saveInfo() {
      // 创建机构  机构设置
      const _that = this;
      console.log(_that.form);
      return new Promise((resolve, reject) => {
        companyCreate(_that.form)
          .then(res => {
            this.$message({
              type: "success",
              message: "创建成功"
            });
            // _that.form = ""
            _that.$emit("hiddenOrganize");
          })
          .catch(err => {
            console.log(err);
          });
      });
    }
  }
};
</script>

<style>
</style>

