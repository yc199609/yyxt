<template>
  <el-dialog :visible.sync="visible" :closeOnClickModal="false" title="修改数据库配置信息">
    <el-form :model="form" :rules="rules"  ref="form">
      <el-row type="flex" justify="space-between">
        <el-col :span="10">
          <el-form-item label="登录账号" prop="code">
            <el-col :span="21">
              <el-input v-model="form.code"></el-input>
            </el-col>
            <el-col :span="3">
              <span>@able</span>
            </el-col>

          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="真实姓名" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="space-between">
        <el-col :span="10">
          <el-form-item label="手机号" prop="mobile">
            <el-input v-model="form.mobile"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="邮箱" prop="email">
            <el-input  v-model="form.email"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="space-between">
        <el-col :span="10">
          <el-form-item label="昵称" prop="nickName">
            <el-input v-model="form.nickName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="简拼" prop="id">
            <el-input></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="space-between">
        <el-col :span="10">
          <el-form-item label="性别" prop="sex">
            <el-input></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="生日" prop="birthday">
            <el-input></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="备注">
        <el-input type="textarea" v-model="form.remark"></el-input>
      </el-form-item>
      <el-form-item class="buttonRow">
        <el-button class="mr10px" type="primary" @click="onSubmit">确 定</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
import { GetById } from "@api/hr/staff.js";
export default {
  data() {
    return {
      visible: false,
      form: {},
      rules: {}
    };
  },
  methods: {
    init(id) {
      this.visible = true;
      console.log(this.$refs)
      this.$refs.form.resetFields();

      //   if (id) {
      GetById(id)
      .then(res => {
        this.$set(this,'form',res.data)
      });
      //   }
    },
    onSubmit() {},
    cancel() {}
  }
};
</script>
