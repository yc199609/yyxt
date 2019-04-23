<template>
  <div style="padding:30px;">
    <el-form :data="organizeData">
      <span>机构设置</span>
      <hr style="background-color:#f7eaea; height: 1px; border: none;">
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item label="代码">
            <el-input v-model="organizeData.code"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="站点">
            <el-input v-model="organizeData.dmsSite"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item label="数据库"><br>
            <el-select v-model="value" placeholder="请选择数据库名称">
              <el-option v-for="item in tableData" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <template>
        <el-form-item label="系统开通">
          <el-checkbox v-model="organizeData.isDMSEnable" label="管理系统"></el-checkbox>
        </el-form-item>
      </template>

      <el-button type="primary" style="float: right;" @click="saveInfo">保存</el-button>
    </el-form>
  </div>
</template>

<script>
import { updateSystemInfo } from "@/api/organize"
import { DataBaseList } from "@/api/systemSetup/dataBase"

export default {
  data() {
    return {
      tableData: [],
      vaule: ''
    }
  },
  props: ["organizeData"],
  methods: {
    saveInfo() {
      // 创建机构  机构设置
      const _that = this
      console.log(_that.organizeData)
      return new Promise((resolve, reject) => {
        updateSystemInfo(_that.organizeData)
          .then(res => {
            this.$message({
              type: "success",
              message: "修改成功"
            })
            _that.$emit('hiddenSetupOrganize')
          })
          .catch(err => {
            console.log(err)
          })
      })
    },
    dataBase() {
      DataBaseList()
        .then(res => {
          this.tableData = res.data
          console.log(this.tableData)
        })
        .catch(err => {
          this.$message.error('错误')
        })
    }
  },
  created() {
    this.dataBase()
    console.log(this.organizeData)
  }
}
</script>

<style>
</style>

