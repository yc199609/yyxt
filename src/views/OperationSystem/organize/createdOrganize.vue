<template>
  <el-dialog :visible.sync="visible" :closeOnClickModal="false">
    <div style="padding:30px;">
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
      >
        <span>创建机构</span>
        <hr style="background-color:#f7eaea; height: 1px; border: none;">
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="简称" prop="name">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="名称" prop="fullName">
              <el-input v-model="form.fullName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="24" style="margin-bottom: 12px">
          <el-col :span="12">
            <el-form-item label="代码" prop="code">
              <el-input v-model="form.code"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="数据库" prop="dbId"><br>
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

        <span>管理员</span>
        <hr style="background-color:#f7eaea; height: 1px; border: none;">
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="手机号" prop="adminMobile">
              <el-input v-model="form.adminMobile"></el-input>
            </el-form-item>
          </el-col>
          
          <el-col :span="12">
            <el-form-item label="姓名" prop="adminName">
              <el-input v-model="form.adminName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="昵称" prop="adminNickName">
              <el-input v-model="form.adminNickName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-button
          type="primary"
          style="float: right;"
          @click="saveInfo('form')"
        >保存</el-button>
      </el-form>
    </div>
  </el-dialog>
</template>

<script>
import { companyCreate } from "@/api/organize"
import { DataBaseList } from "@/api/systemSetup/dataBase"

export default {
  name: 'createdOrganize',
  data() {
    return {
      form: {
        name: '',
        fullName: '',
        code: '',
        dbId: '',
        adminMobile: '',
        adminName: '',
        adminNickName: ''
      },
      tableData: [],
      value: '',
      visible: false,
      rules: {
        name: [
          { required: true, message: '请输入机构简称', trigger: 'blur' },
          { min: 1, max: 50, message: '长度需在 1 到 50 个字符之间', trigger: 'blur' }
        ],
        fullName: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 1, max: 50, message: '长度需在 1 到 50 个字符之间', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入代码', trigger: 'blur' },
          // { min: 4, max: 10, message: '长度需在 4 到 10 个字符之间', trigger: 'blur' }
          { pattern: /^(?=.*?[a-z)(?=.*>[A-Z])(?=.*?[0-9])[a-zA_Z0-9]{4,10}$/, message: "长度需在 4 到 10 个字符之间, 并且由数字和字母组成" }
        ],
        dbId: [
          { required: true, message: '请选择数据库', trigger: 'blur' }
        ],
        adminMobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/, message: "手机格式不对" }
        ],
        adminName: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 1, max: 50, message: '长度需在 1 到 50 个字符之间', trigger: 'blur' }
        ],
        adminNickName: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
          { min: 1, max: 50, message: '长度需在 1 到 50 个字符之间', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    init() {
      this.visible = true
      this.dataBase()
    },
    saveInfo(formName) {
      // 创建机构  机构设置
      this.$refs[formName].validate((valid) => {
        if (valid) {
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
                  dbId: '',
                  adminMobile: '',
                  adminName: '',
                  adminNickName: ''
                }
                this.$emit('render')
              }
            });
          })
        }
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

