<template>
  <el-dialog :visible.sync="visible" :closeOnClickModal="false" title="修改密码" @close="close">
    <el-form :model="form" ref="form" label-width="100px" :rules="rules">
      <el-form-item label="原始密码" prop="oldPassword" :label-width="formLabelWidth">
        <el-col :span="8">
          <el-input v-model="form.oldPassword" placeholder="请输入原始密码" :maxlength="40"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword" :label-width="formLabelWidth">
        <el-col :span="8">
          <el-input v-model="form.newPassword" placeholder="请输入新密码" :maxlength="40"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="确认新密码" prop="subPassword" :label-width="formLabelWidth">
        <el-col :span="8">
          <el-input v-model="form.subPassword" placeholder="请再次输入新密码" :maxlength="40"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()">提交</el-button>
        <el-button @click="resetForm()">重置</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
import { UpdatePasswordByOld } from "@api/user";
export default {
  name: "resetPassword",
  data() {
    const checkSubmitpassword = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请确认密码"));
      } else if (value.length < 6 || value.length > 30) {
        return callback(new Error("密码长度在6-30之间"));
      } else if (value !== this.form.newPassword) {
        return callback(new Error("2次密码输入不一致"));
      } else {
        callback();
      }
    };
    const checkNewPassword = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入新密码"));
      } else if (value.length < 6 || value.length > 30) {
        return callback(new Error("密码长度在6-30之间"));
      } else if (value === this.form.oldPassword) {
        return callback(new Error("新密码应该和原始密码不同"));
      } else {
        callback();
      }
    };
    return {
      form: {
        oldPassword: "",
        newPassword: "",
        subPassword: ""
      },
      formLabelWidth: "150px",
      rules: {
        oldPassword: [
          {
            required: true,
            message: "请输入原始密码(6-30位)",
            trigger: "blur",
            max: 30,
            min: 6
          }
        ],
        newPassword: [
          {
            required: true,
            validator: checkNewPassword,
            trigger: "blur"
          }
        ],
        subPassword: [
          {
            required: true,
            validator: checkSubmitpassword,
            trigger: "blur"
          }
        ]
      },
      visible:false
    };
  },
  methods: {
    init(){
      this.visible = true
    },
    close(){
      this.$refs.form.resetFields()
    },
    submitForm() {
      this.$refs.form.validate(valid => {
        UpdatePasswordByOld(this.form).then(res => {
          this.$message({
            type: "success",
            message: "修改成功",
            duration: 500,
            onClose:()=>{
              this.visible = false
            }
          });
        });
      });
    },
    resetForm() {
      this.$refs.form.resetFields();
    }
  }
};
</script>