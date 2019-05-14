<template>
  <div class="container">
    <el-form :model="form" ref="form" label-width="100px" class="demo-ruleForm" :rules="rules">
      <el-form-item label="输入手机号" prop="mobile" :label-width="formLabelWidth">
        <el-col :span="8">
          <el-input v-model="form.mobile" :maxlength="50" @change="imgCode" placeholder="请输入手机号"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="图片验证码" prop="imageCode" :label-width="formLabelWidth" style="position: relative;">
        <el-col :span="8">
          <el-input v-model="form.imageCode"  :maxlength="50" placeholder="请输入图片验证码" style="float: left;"></el-input>
          <img :src="imgCodeShow?'/api/User/GetImageCode?mobile='+form.mobile:''" alt style="position: absolute; top: 0; margin-left: 10px;">
        </el-col>
      </el-form-item>
      <el-form-item label="短信验证码" prop="sms" :label-width="formLabelWidth" style="position: relative;">
        <el-col :span="8">
          <el-input v-model="form.sms" placeholder="请输入短信验证码" :maxlength="50" style="float: left;"></el-input>
          <el-button :type="sendsms?'primary':'info'" @click="SendForgetPsw" plain style="position: absolute; top: 0; margin-left: 10px;">{{sendCode}}</el-button>
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
import { SendUpdateMobileSMS, updateMobile } from "@/api/user";
export default {
  name: "mobile",
  data() {
    return {
      sendsms: true,
      sendCode: "点击获取验证码",
      form: {
        mobile: "",
        imageCode: "",
        sms: ""
      },
      imgCodeShow: false,
      formLabelWidth: "150px",
      rules: {
        mobile: [
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
        imageCode: [
          { required: true, message: "请输入图片验证码", trigger: "blur" }
        ],
        sms: [{ required: true, message: "请输入短信验证码", trigger: "blur" }]
      }
    };
  },
  methods: {
    imgCode() {
      this.$refs.form.validateField("mobile", err => {
        if (!err) {
          this.imgCodeShow = true;
        }
      });
    },
    // 发送短信验证码
    SendForgetPsw() {
      var _that = this;
      const mobile = _that.form.mobile;
      const imageCode = _that.form.imageCode;
      const promise1 = new Promise((resolve, reject) => {
        this.$refs.form.validateField("mobile", err => {
          if (!err) {
            resolve();
          }
        });
      });
      const promise2 = new Promise((resolve, reject) => {
        this.$refs.form.validateField("imageCode", err => {
          if (!err) {
            resolve();
          }
        });
      });
      Promise.all([promise1, promise2]).then(() => {
        if (_that.sendsms) {
          _that.sendsms = false;
          var n = 60;
          _that.sendCode = n + "秒后重新获取验证码";
          var timer = setInterval(() => {
            n--;
            if (n <= 0) {
              _that.sendsms = true;
              clearInterval(timer);
            }
            _that.sendCode = n + "秒后重新获取验证码";
          }, 1000);
          SendUpdateMobileSMS({mobile, imageCode})
            .then(response => {})
            .catch(err => {
              clearInterval(timer);
              _that.sendsms = true;
              _that.sendCode = "服务器错误请重新获取";
            });
        }
      });
    },
    submitForm() {
      this.$refs.form.validate(valid => {
        updateMobile(this.form)
        .then(res=>{
          this.$message({
            type:'success',
            message:'修改手机号成功',
            duration:500
          })
        })
      });
    },
    resetForm() {
      this.$refs.form.resetFields();
    }
  }
};
</script>

<style lang="scss" scoped>
 .container {
    padding: 3vw 2vw 0;
  }
</style>