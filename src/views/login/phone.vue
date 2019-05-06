<template>
  <div>
    <el-form :model="numberValidateForm" ref="numberValidateForm" label-width="100px" class="demo-ruleForm" :rules="rules">
      <el-form-item label="输入手机号" prop="phone" :label-width="formLabelWidth">
        <el-col :span="8">
          <el-input v-model="numberValidateForm.phone" @change="imgCode" placeholder="请输入手机号"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="图片验证码" prop="pictrue" :label-width="formLabelWidth" style="position: relative;">
        <el-col :span="8">
          <el-input v-model="numberValidateForm.pictrue" placeholder="请输入图片验证码" style="float: left;"></el-input>
          <img :src="imgCodeShow?'/api/User/GetImageCode?mobile='+numberValidateForm.phone:''" alt style="position: absolute; top: 0; margin-left: 10px;">
        </el-col>
      </el-form-item>
      <el-form-item label="短信验证码" prop="smsv" :label-width="formLabelWidth" style="position: relative;">
        <el-col :span="8">
          <el-input v-model="numberValidateForm.smsv" placeholder="请输入短信验证码" style="float: left;"></el-input>
          <el-button :type="sendSmsv?'primary':'info'" @click="SendForgetPsw" plain style="position: absolute; top: 0; margin-left: 10px;">{{sendCode}}</el-button>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()">提交</el-button>
        <el-button @click="resetForm()">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { sendForpwsSMS,updatePswBySMS } from "@/api/login";
export default {
  name: "phone",
  data() {
    return {
      sendSmsv:true,
      sendCode: "点击获取验证码",
      numberValidateForm: {
        phone: "",
        pictrue:'',
        smsv:''
      },
      imgCodeShow:false,
      formLabelWidth: "150px",
      rules: {
        phone: [
          {
            required: true,
            message: "请输入电话号码",
            trigger: "blur"
          },
          {
            pattern: /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/,
            message: "手机格式不对"
          }
        ],
        pictrue: [
          { required: true, message: "请输入图片验证码", trigger: "blur" }
        ],
        smsv: [{ required: true, message: "请输入短信验证码", trigger: "blur" }]
      }
    };
  },
  methods: {
    imgCode() {
      this.$refs.numberValidateForm.validateField("phone", err => {
        if (!err) {
          this.imgCodeShow = true;
        }
      });
    },
    // 发送短信验证码
    SendForgetPsw() {
      var _that = this;
      const mobile = _that.numberValidateForm.phone
      const imageCode = _that.numberValidateForm.pictrue
      const promise1 = new Promise((resolve, reject) => {
        this.$refs.numberValidateForm.validateField("phone", err => {
          if (!err) {
            resolve();
          }
        });
      });
      const promise2 = new Promise((resolve, reject) => {
        this.$refs.numberValidateForm.validateField("pictrue", err => {
          if (!err) {
            resolve();
          }
        });
      });
      Promise.all([promise1, promise2]).then(() => {
        if (_that.sendSmsv) {
          _that.sendSmsv = false
          var n = 60
          _that.sendCode = n + "秒后重新获取验证码"
          var timer = setInterval(() => {
            n--
            if (n <= 0) {
              _that.sendSmsv = true
              clearInterval(timer)
            }
            _that.sendCode = n + "秒后重新获取验证码"
          }, 1000)
          sendForpwsSMS(mobile, imageCode)
            .then(response => {})
            .catch(err => {
              clearInterval(timer)
              _that.sendSmsv = true
              _that.sendCode = "服务器错误请重新获取"
            })
        }
      })
    },
    submitForm() {
      this.$refs.numberValidateForm.validate(valid => {
        if (valid) {
          updatePswBySMS(numberValidateForm.phone,numberValidateForm.smsv,numberValidateForm.pictrue)
        }
      });
    },
    resetForm() {
      this.$refs.numberValidateForm.resetFields();
    }
  }
};
</script>

<style>
</style>
