<template>
  <div>
    <el-form
      :model="numberValidateForm"
      ref="numberValidateForm"
      label-width="100px"
      class="demo-ruleForm"
      :rules="rules"
    >
      <el-form-item label="输入手机号" prop="phone" :label-width="formLabelWidth">
        <el-col :span="8">
          <el-input v-model="numberValidateForm.phone" placeholder="请输入手机号"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item
        label="图片验证码"
        prop="pictrue"
        :label-width="formLabelWidth"
        style="position: relative;"
      >
        <el-col :span="8">
          <el-input v-model="numberValidateForm.pictrue" placeholder="请输入图片验证码" style="float: left;"></el-input>
          <img src alt style="position: absolute; top: 0; margin-left: 10px;">
        </el-col>
      </el-form-item>
      <el-form-item
        label="短信验证码"
        prop="smsv"
        :label-width="formLabelWidth"
        style="position: relative;"
      >
        <el-col :span="8">
          <el-input v-model="numberValidateForm.smsv" placeholder="请输入短信验证码" style="float: left;"></el-input>
          <el-button
            type="info"
            plain
            style="position: absolute; top: 0; margin-left: 10px;"
          >点击获取验证码</el-button>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('numberValidateForm')">提交</el-button>
        <el-button @click="resetForm('numberValidateForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "phone",
  data() {
    return {
      numberValidateForm: {
        phone: ""
      },
      formLabelWidth: "150px",
      rules: {
        phone: [
          {
            required: true,
            message: "请输入电话号码"
          },
          {
            pattern: /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/,
            message: "手机格式不对"
          }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style>
</style>
