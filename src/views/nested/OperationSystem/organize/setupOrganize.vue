<template>
  <div style="padding:30px;">
    <el-form ref="form" :model="form">
      <span>机构设置</span>
      <hr style="background-color:#f7eaea; height: 1px; border: none;">
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item label="代码">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="站点">
            <el-input v-model="form.site"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      
      <el-form-item label="数据库">
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
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          name: '',
          site: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>

<style>

</style>

