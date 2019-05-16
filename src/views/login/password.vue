<template>
  <div class="all-container">
    <div class="all-container-padding bg">
      <el-form :model="userlist" :rules="rules" ref="EditorUserForms">
        <el-form-item label="电话" prop="mobile" :label-width="formLabelWidth">
          <el-col :span="8">
            <el-input v-model="userlist.mobile" @blur="imgCode" placeholder="请输入电话"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="图片验证码" prop="pictrue" :label-width="formLabelWidth" style="position: relative;">
          <el-col :span="8">
            <el-input v-model="userlist.pictrue" placeholder="请输入图片验证码" style="float: left;"></el-input>
            <img src="" @click="imgCode" ref="imgcode" alt="" style="position: absolute; top: 0; margin-left: 10px; border: 0">
          </el-col>
        </el-form-item>
        <el-form-item label="短信验证码" prop="sms" :label-width="formLabelWidth" style="position: relative;">
          <el-col :span="8">
            <el-input v-model="userlist.sms" placeholder="请输入短信验证码" style="float: left;"></el-input>
            <el-button :type="sendsms?'primary':'info'" plain style="position: absolute; top: 0; margin-left: 10px; border: 0"
              @click="SendForgetPsw">{{sendCode}}</el-button>
          </el-col>
        </el-form-item>

        <br>

        <el-form-item label="新密码" prop="password" :label-width="formLabelWidth">
          <el-col :span="8">
            <el-input v-model="userlist.password" placeholder="请输入新密码" id="newkey" type="password"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="重复新密码" prop="checknewpass" :label-width="formLabelWidth">
          <el-col :span="8">
            <el-input v-model="userlist.checknewpass" placeholder="请再次输入新密码" type="password"></el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <div class="grid-content bg-purple">
        <el-button type="primary" @click="EditorUserClick()">保存</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { sendForpwsSMS, updatePswBySMS } from "@/api/login";
import axios from "axios";
import { resolve, reject } from "q";
export default {
  name: "password",
  data() {
    /*****检验两次密码是否一致***/
    var validatePass = (rule, value, callback) => {
      // console.log(value);
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value.length < 6){
        callback(new Error("密码不能少于6位数"));
      } else {
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.userlist.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      sendCode: "点击获取验证码",
      sendsms: true,
      activeName: "first",
      loading: true,
      userlist: {
        mobile: "",
        sms: "",
        password: "",
        checknewpass: ""
      }, //信息表单
      formLabelWidth: "150px",
      /***校验***/
      rules: {
        mobile: [
          {
            required: true,
            message: "请输入电话号码"
          },
          {
            pattern: /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/,
            message: "手机格式不对"
          }
        ],
        pictrue: [
          {
            required: true,
            message: "请输入图片验证码"
          }
        ],
        sms: [
          {
            required: true,
            message: "请输入短信验证码"
          }
        ],
        password: [
          {
            validator: validatePass,
            required: true,
            trigger: "blur"
          }
        ],
        checknewpass: [
          {
            validator: validatePass2,
            required: true,
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {},
  methods: {
    // 电话失焦,拿到图片验证码
    imgCode() {
      var _that = this;
      this.$refs.EditorUserForms.validateField("mobile", err => {
        if (!err) {
          console.log(this.$refs.imgcode)
          this.$refs.imgcode.setAttribute('src','/api/User/GetImageCode?mobile=' + this.userlist.mobile + '&rander=' + Math.random(1))
        }
      });
    },
    // 发送短信验证码
    SendForgetPsw() {
      var _that = this;
      const mobile = _that.userlist.mobile
      const imageCode = _that.userlist.pictrue
      var promise1 = new Promise((resolve, reject) => {
        this.$refs.EditorUserForms.validateField("mobile", err => {
          if (!err) {
            resolve();
          }
        });
      });
      var promise2 = new Promise((resolve, reject) => {
        this.$refs.EditorUserForms.validateField("pictrue", err => {
          if (!err) {
            resolve();
          }
        });
      });
      Promise.all([promise1, promise2]).then(() => {
        if (_that.sendsms) {
          _that.sendsms = false
          var n = 60
          _that.sendCode = n + "秒后重新获取验证码"
          var timer = setInterval(() => {
            n--
            if (n <= 0) {
              _that.sendCode = "重新获取验证码"
              _that.sendsms = true
              clearInterval(timer)
            }else{
              _that.sendCode = n + "秒后重新获取验证码"
            }
          }, 1000)
          sendForpwsSMS(mobile, imageCode)
            .then(response => {})
            .catch(err => {
              clearInterval(timer)
              _that.sendsms = true
              _that.sendCode = "重新获取"
            })
        }
      })
    },
    // 编辑提交的方法
    EditorUserClick() {
      this.$refs.EditorUserForms.validate(valid => {
        if (valid) {
          updatePswBySMS(this.userlist)
            .then(response => {
                this.$emit("hidden");
                this.$notify({
                  title: "成功",
                  message: "密码修改成功",
                  type: "success"
                });
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    }
  }
};
</script>