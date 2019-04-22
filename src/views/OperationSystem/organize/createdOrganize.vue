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
          <el-form-item label="dbId">
            <el-input v-model="form.dbId"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      
      <!-- <el-form-item label="数据库">
        <el-select v-model="form.region" placeholder="请选择数据库">
          <el-option label="DB1" value="DB1"></el-option>
          <el-option label="DB2" value="DB2"></el-option>
          <el-option label="DB3" value="DB3"></el-option>
          <el-option label="DB4" value="DB4"></el-option>
          <el-option label="DB5" value="DB5"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="系统开通">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="业务系统" name="type"></el-checkbox>
          <el-checkbox label="运维系统" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item> -->

      <el-button type="primary" style="float: right;" @click="saveInfo">保存</el-button>
    </el-form>
  </div>
</template>

<script>
  import { companyCreate } from "@/api/organize";

  export default {
    data() {
      return {
        form: {
          name: '',
          fullName: '',
          code: '',
          dbId: ''
          // region: ''
        }
      }
    },
    methods: {
      saveInfo() {
        // 创建机构  机构设置
        const _that = this
        console.log(_that.form)
        return new Promise((resolve, reject) => {
          companyCreate(_that.form).then(res => {
            _that.$message({
              type: 'success',
              message: '修改成功'
            });
            _that.organizeInformation()
            _that.$emit('hiddenOrganize')
          }).catch(err => {
            console.log(err)
          })
        })
      }
    }
  }
</script>

<style>

</style>

