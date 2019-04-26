<template>
  <div class="all-container">
    <div class="all-container-padding bg">
      <el-form :model="userlist" :rules="rules" ref="EditorUserForms">
        <el-form-item label="电话" prop="phone" :label-width="formLabelWidth">
          <el-col :span="8">
            <el-input v-model="userlist.phone" @change="imgCode" placeholder="请输入电话"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="图片验证码" prop="pictrue" :label-width="formLabelWidth" style="position: relative;">
          <el-col :span="8">
            <el-input v-model="userlist.pictrue" placeholder="请输入图片验证码" style="float: left;"></el-input>
            <img src="" alt="" style="position: absolute; top: 0; margin-left: 10px;">
          </el-col>
        </el-form-item>
        <el-form-item label="短信验证码" prop="smsv" :label-width="formLabelWidth" style="position: relative;">
          <el-col :span="8">
            <el-input v-model="userlist.smsv" placeholder="请输入短信验证码" style="float: left;"></el-input>
            <el-button type="info" plain id="sendCode" style="position: absolute; top: 0; margin-left: 10px; border: 0" @click="SendForgetPsw">点击获取验证码</el-button>
          </el-col>
        </el-form-item>

        <br>
        
        <el-form-item label="新密码" prop="pass" :label-width="formLabelWidth">
          <el-col :span="8">
            <el-input
              v-model="userlist.pass"
              placeholder="请输入新密码"
              id="newkey"
              type="password"
            ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="重复新密码" prop="checknewpass" :label-width="formLabelWidth">
          <el-col :span="8">
            <el-input
              v-model="userlist.checknewpass"
              placeholder="请再次输入新密码"
              type="password"
            ></el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <div class="grid-content bg-purple">
        <el-button type="primary" @click="EditorUserClick('userlist')">保存</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { getImgCode, sendForpwsSMS, updatePswBySMS } from '@/api/login'

export default {
  name: 'password',
  data() {
    /*****检验两次密码是否一致***/
    var validatePass = (rule, value, callback) => {
      console.log(value)
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.userlist.checknewpass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      activeName: "first",
      loading: true,
      baseUrl: process.env.BASE_API,
      userlist: {
        phone: '',
        smsv: '',
        pass: '',
        checknewpass: ''
      }, //信息表单
      formLabelWidth: "150px",
      /***校验***/
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
        ],
        pictrue: [
          {
            required: true,
            message: "请输入图片验证码"
          }
        ],
        smsv: [
          {
            required: true,
            message: "请输入短信验证码"
          }
        ],
        pass: [
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
  created() {
    // this.getUser();
    // this.upload();
  },
  methods: {
    // 电话失焦,拿到图片验证码
    imgCode() {
      console.log(this.userlist.phone)
      console.log('拿到图片验证码')
      const mobile = this.userlist.phone
      console.log(mobile)
      return new Promise((resolve, reject) => {
        getImgCode(mobile).then(response => {
          console.log(response)
        })
      })
    },
    // 发送短信验证码
    SendForgetPsw() {
      console.log('发送短信验证码了')

      const element = document.getElementById('sendCode')
      console.log(element)
      var num = 60
      var timer = setInterval(function () {
        num--
        element.innerHTML = num + '秒后重新获取'
        element.style.background = ' #ccc'
        element.disabled = 'disabled'
        if (num === 0) {
          element.disabled = ''
          element.style.background = ' #f4f4f5'
          element.innerHTML = '点击获取验证码'
          clearInterval(timer)
        }
      }, 1000)
      const mobile = this.userlist.phone
      console.log(mobile)
      const imageCode = this.userlist.pictrue
      return new Promise((resolve, reject) => {
        sendForpwsSMS(mobile, imageCode).then(response => {
          console.log(response)
        })
      })
    },
    //获取个人用户的信息
    getUser() {
      // postData("接口", this.username).then(response => {
      //   if (response.status === 200) {
      //     this.userlist = response.data;
      //     this.loading = false;
      //     console.log(this.userlist, 9696);
      //   } else {
      //     this.$message({
      //       message: "获取信息失败," + response.message,
      //       type: "error"
      //     });
      //   }
      // });
    },
    // 编辑提交的方法
    EditorUserClick() {
      // console.log('点击保存了')
      this.$refs.EditorUserForms.validate(valid => {
        if (valid) {
          return new Promise((resolve, reject) => {
            updatePswBySMS(this.userlist).then(response => {
              if (response.code == 0) {
                console.log('跳转')
                this.$emit('hidden')
                this.$notify({
                  title: '成功',
                  message: '密码修改成功',
                  type: 'success'
                });
              } else {
                this.$notify.error({
                  title: '错误',
                  message: '表单信息验证错误'
                });
              }
            }).catch(err=>{
              console.log(err)
            })
          })
        }
      });
    }
  }
};
</script>