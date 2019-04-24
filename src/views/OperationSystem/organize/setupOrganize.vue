<template>
  <el-dialog :visible.sync="visible">
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
              <el-select
                v-model="value"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in tableData"
                  :key="item.id"
                  :label="item.name"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <template>
          <el-form-item label="系统开通">
            <el-checkbox
              v-model="organizeData.isDMSEnable"
              label="管理系统"
            ></el-checkbox>
          </el-form-item>
        </template>

        <el-button
          type="primary"
          style="float: right;"
          @click="saveInfo"
        >保存</el-button>
      </el-form>
    </div>
  </el-dialog>

</template>

<script>
import { getSystemInfoById, updateSystemInfo } from "@/api/organize"
import { DataBaseList } from "@/api/systemSetup/dataBase"

export default {
  data() {
    return {
      tableData: [],
      value: {},
      visible: false,
      organizeData: {}
    }
  },
  methods: {
    init(id) {
      this.visible = true
      getSystemInfoById(id).then(res => {
        this.organizeData = res.data
      })
      this.dataBase()
    },
    saveInfo() {
      // 创建机构  机构设置
      updateSystemInfo({...this.organizeData,db:this.value})
        .then(res => {
          this.$message({
            type: "success",
            message: "修改成功"
          })
          this.visible = false
        })
    },
    dataBase() {
      DataBaseList()
        .then(res => {
          this.tableData = res.data
        })
    }
  }
}
</script>

<style>
</style>

