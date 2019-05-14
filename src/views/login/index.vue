<template>
  <div id="contanier" class="login-container">

    <div id="mask" ref="mask" class="mask">
      <div class="mask_container">
        <img src="./onloadgif.gif" alt="正在加载中">
      </div>
    </div>

    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">{{ $t('login.title') }}</h3>
        <lang-select class="set-language"/>
      </div>

      <!-- <el-form-item
        prop="organize"
        :rules="[
          { required: true, message: '机构名称不能为空'}
        ]"
      >
        <span class="svg-container">
          <svg-icon icon-class="tree"/>
        </span>
        <el-input
          v-model="loginForm.organize"
          name="organize"
          type="text"
          auto-complete="off"
          placeholder="organize"
        />
      </el-form-item> -->
      <el-form-item
        prop="cellPhone"
        :rules="[
          { required: true, message: '电话号码不能为空'}
        ]"
      >
        <span class="svg-container">
          <svg-icon icon-class="user"/>
        </span>
        <el-input
          v-model="loginForm.cellPhone"
          name="cellPhone"
          type="text"
          auto-complete="on"
          placeholder="cellPhone"
        />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password"/>
        </span>
        <el-input
          :type="pwdType"
          v-model="loginForm.password"
          name="password"
          auto-complete="on"
          placeholder="password"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="pwdType === 'password' ? 'eye' : 'eye-open'"/>
        </span>
      </el-form-item>
      <el-form-item>
        <el-button
          :loading="loading"
          type="primary"
          style="width:100%;"
          @click.native.prevent="handleLogin"
        >{{ $t('login.login') }}</el-button>
      </el-form-item>
      <div class="tips">
        <span style="margin-right:20px;">
          <el-button
            class="thirdparty-button"
            type="primary"
            @click="showDialogPassword=true"
          >{{ $t('login.forgetPassword') }}</el-button>
        </span>
      </div>
    </el-form>

    <el-dialog
      :title="$t('login.RetrievePassword')"
      :visible.sync="showDialogPassword"
      :modal-append-to-body="false"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
    >
      <password @hidden='hiddenColse'/>
    </el-dialog>

    <el-dialog
      :title="$t('login.phone')"
      :visible.sync="showDialogPhone"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
    >
      <phone/>
    </el-dialog>

    <el-dialog
      @close="initPasswordHidden"
      :visible.sync="initView"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
      title="首次登录请重置密码">
      <initPassword @submit='initPasswordSubmit' />
    </el-dialog>

  </div>
</template>

<script>
import { isvalidUsername } from "@/utils/validate";
import LangSelect from "@/components/LangSelect";
import password from "./password";
import phone from "./phone";
import { setToken } from '@/utils/auth'
import initPassword from './initPassword'

export default {
  name: "Login",
  components: { LangSelect, password, phone, initPassword},
  data() {
    const validatePass = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("密码不能小于6位"));
      }
      callback()
    };
    return {
      loginForm: {
        organize: "test2",
        cellPhone: "18888888888",
        password: "gosafenet.com"
      },
      loginRules: {
        password: [{ required: true, trigger: "blur", validator: validatePass }]
      },
      loading: false,
      pwdType: "password",
      showDialogPhone: false,
      showDialogPassword: false,
      redirect: undefined,
      initView: false,
      token:''
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  created() {
    window.setTimeout(() => {
      this.$store.dispatch("GetInfo", this.loginForm).then(res => {
        const contanier = document.getElementById("contanier")
        const mask = document.getElementById("mask")
        contanier.removeChild(mask)
      })
    }, 1000)
  },
  mounted() {
    this.$refs.mask.style.height =
      document.getElementById("app").clientHeight + "px";
  },
  methods: {
    hiddenColse() {
      this.showDialogPassword = false
    },
    showPwd() {
      if (this.pwdType === "password") {
        this.pwdType = "";
      } else {
        this.pwdType = "password";
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("Login", this.loginForm)
            .then(res => {
              if (res&&res.isNeedResetPassword === true) {
                this.initView = true
                this.token = res.token
              } else {
                this.$router.push( { path: "/" } )
              }
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          return false;
        }
      });
    },
    initPasswordSubmit(){
      this.initPasswordHidden()
      this.$store.commit('SET_TOKEN', this.token)
      setToken(this.token)
      this.$router.push({ path: this.redirect || '/' })
    },
    initPasswordHidden(){
      this.loading = false
      this.initView = false
    }
  }
};
</script>

<style lang="css" scoped>
/* 修复input 背景不协调 和光标变色 */
.login-form >>> .el-input__inner {
  background-color: #283343;
  border: none;
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg: #2d3a4b;
$light_gray: #eee;
$cursor: #fff;
$dark_gray: #889aa4;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    .el-input__inner {
      background-color: transparent !important;
    }
    input {
      // background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $bg !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}

.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;

  .mask {
    width: 100%;
    opacity: 1;
    background-color: #ffffff;
    bottom: 0;
    left: 0;
    position: fixed;
    z-index: 998;

    .mask_container {
      // width: 450px;
      // height: 235px;
      z-index: 999;
      position: fixed;
      right: 30%;
      top: 30%;
      // background: red;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    max-width: 100%;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }
  .tips {
    float: right;
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      font-weight: 400;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }

    .set-language {
      color: #fff;
      position: absolute;
      top: 3px;
      font-size: 18px;
      right: 0px;
      cursor: pointer;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
