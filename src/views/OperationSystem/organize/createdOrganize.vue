<template>
  <div style="padding:30px;">
    <el-form ref="form" :model="form">
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
            <el-select v-model="form.dbId" placeholder="请选择数据库名称">
              <el-option v-for="item in tableData" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-button type="primary" style="float: right;" @click="saveInfo">保存</el-button>
    </el-form>
  </div>
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
        value: ''
      }
    },
    methods: {
      saveInfo() {
        // 创建机构  机构设置
        const _that = this
        return new Promise((resolve, reject) => {
          companyCreate(_that.form).then(res => {
            _that.$message({
              type: 'success',
              message: '创建成功'
            });
            // 创建完毕,重新调用一次机构列表
            _that.$emit('hiddenOrganize')
            _that.form = ''
          }).catch(err => {
            console.log(err)
          })
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
    },
    created() {
      this.dataBase()
    }
  }
</script>

<style>

</style>

