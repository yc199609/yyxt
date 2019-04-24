<template>
  <el-dialog :visible.sync="visible">
    <div style="padding:30px;">
      <el-form
        ref="form"
        :model="form"
      >
        <span>创建机构</span>
        <hr style="background-color:#f7eaea; height: 1px; border: none;">
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="简称">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="名称">
              <el-input v-model="form.fullName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="代码">
              <el-input v-model="form.code"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="数据库"><br>
              <el-select
                v-model="form.dbId"
                placeholder="请选择数据库名称"
              >
                <el-option
                  v-for="item in tableData"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

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
import { companyCreate } from "@/api/organize"
import { DataBaseList } from "@/api/systemSetup/dataBase"

export default {
  data() {
    return {
      form: {
        name: '',
        fullName: '',
        code: '',
        dbId: ''
      },
      tableData: [],
      value: '',
      visible: false
    }
  },
  methods: {
    init() {
      this.visible = true
      this.dataBase()
    },
    saveInfo() {
      // 创建机构  机构设置
      companyCreate(this.form)
        .then(res => {
          this.$message({
            type: 'success',
            message: '创建成功',
            duration: 500,
            onClose: () => {
              this.visible = false,
              this.form = {
                name: '',
                fullName: '',
                code: '',
                dbId: ''
              }
              this.$emit('render')
            }
          });
        })
    },
    dataBase() {
      DataBaseList()
        .then(res => {
          this.tableData = res.data
        })
        .catch(err => {
          this.$message.error('错误')
        })
    }
  }
}
</script>

<style>
</style>

