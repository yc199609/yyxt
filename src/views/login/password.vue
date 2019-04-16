<template>
  <div class="all-container">
    <div class="all-container-padding bg">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="基本信息" name="first">
          <el-form :model="userlist" :rules="rules" ref="EditorUserForms">
            <el-form-item label="用户名" prop="username" :label-width="formLabelWidth">
              <el-col :span="8">
                <el-input v-model="userlist.username" disabled></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="电话" prop="phone" :label-width="formLabelWidth">
              <el-col :span="8">
                <el-input v-model="userlist.phone" placeholder="请输入电话"></el-input>
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
                <el-button type="info" plain style="position: absolute; top: 0; margin-left: 10px;">点击获取验证码</el-button>
              </el-col>
            </el-form-item>
          </el-form>
          <div class="grid-content bg-purple">
            <el-button type="primary" @click="EditorUserClick('userlist')">保存</el-button>
          </div>
        </el-tab-pane>

        <el-tab-pane label="修改密码" name="second">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
            <el-form-item label="原密码" prop="pass" :label-width="formLabelWidth">
              <el-col :span="8">
                <el-input v-model="ruleForm.pass" placeholder="请输入原密码" type="password"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="新密码" prop="newpass" :label-width="formLabelWidth">
              <el-col :span="8">
                <el-input
                  v-model="ruleForm.newpass"
                  placeholder="请输入新密码"
                  id="newkey"
                  type="password"
                ></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="重复新密码" prop="checknewpass" :label-width="formLabelWidth">
              <el-col :span="8">
                <el-input
                  v-model="ruleForm.checknewpass"
                  placeholder="请再次输入新密码"
                  id="newkey1"
                  type="password"
                ></el-input>
              </el-col>
            </el-form-item>
          </el-form>
          <div class="grid-content bg-purple">
            <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    /*****检验两次密码是否一致***/
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checknewpass !== "") {
          this.$refs.ruleForm.validateField("checknewpass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.newpass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      // uploadParm: {}, //图片的上传
      ruleForm: {}, //修改密码的表单
      activeName: "first",
      loading: true,
      baseUrl: process.env.BASE_API,
      userlist: {}, //用户信息表单
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
        pass: [
          {
            required: true,
            trigger: "blur",
            message: "请输入密码"
          }
        ],
        newpass: [
          {
            validator: validatePass,
            trigger: "blur"
          }
        ],
        checknewpass: [
          {
            validator: validatePass2,
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
    //tab切换
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    //修改密码
    submitForm(ruleForm) {
      var obj = {
        username: this.username,
        oldpwd: this.ruleForm.pass,
        newpwd: this.ruleForm.newpass
      };
      console.log(obj);
      postData("/api/User/UpdatePasswordByOld", obj).then(response => {
        if (response.status == 0) {
          this.$message({
            message: "保存成功",
            type: "success"
          });
        } else {
          this.$message({
            message: "修改失败" + response.message,
            type: "error"
          });
        }
      });
    },
    // 编辑提交的方法
    EditorUserClick() {
      this.$refs.EditorUserForms.validate(valid => {
        if (valid) {
          console.log(this.userlist);
          putData("接口", this.userlist).then(response => {
            if (response.status == 200) {
              this.$message({
                message: "编辑成功",
                type: "success"
              });
            } else {
              this.$message({
                message: "修改失败" + response.message,
                type: "error"
              });
            }
          });
        }
      });
    }
  }
};
</script>