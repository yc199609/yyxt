<template>
  <div class="navbar">
    <h3 :class="sidebar.opened?'h3':'h3 h3hidden'">
      <div class="imgBox">
        <img :src="require('@/assets/icon/logo-sm.png')" width="30px" height="30px" class="titleImg" />
      </div>
      <span class="SystemTitle">联桥网云运营系统</span>
    </h3>
    <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container" />
    <breadcrumb />
    <lang-select class="right-menu-item hover-effect" />
    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <img :src="require('@/assets/icon/avatar1.png')" width="30px" height="30px" alt="">
        <!-- <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar"> -->
        <i class="el-icon-caret-bottom" />
      </div>
      <el-dropdown-menu slot="dropdown" class="user-dropdown">
        <router-link class="inlineBlock" to="/">
          <el-dropdown-item>
            {{ $t('loginOut.home') }}
          </el-dropdown-item>
        </router-link>
        <el-dropdown-item divided>
          <span style="display:block;" @click="logout">{{ $t('loginOut.loginOut') }}</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import LangSelect from '@/components/LangSelect'

export default {
  components: {
    Breadcrumb,
    Hamburger,
    LangSelect
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.SystemTitle{
  font-size: 17px;
}
.imgBox{
  display: inline-block;
  width: 54px;
  text-align: center;
  .titleImg{
    vertical-align: middle;
  }
}

.h3{
  overflow: hidden;
  background-color: #67c23a;
  white-space : nowrap ;
  color:white;
  position: fixed;
  margin: 0;
  width: 210px;
  height: 50px;
  left: 0;
  top: 0;
  transition:width 0.28s;
  @media screen and (max-width: 992px) {
    width: 54px;
  }
}
.h3hidden{
  width: 54px;
}
.navbar {
  position: relative;
  height: 50px;
  width: 100%;
  line-height: 50px;
  background-color: #fff;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  position: fixed;
  top: 0;
  z-index: 999999;

  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }

  .right-menu-item {
    position: fixed;
    top: 0;
    right: 85px;
    line-height: 50px;
    display: inline-block;
    padding: 0 8px;
    font-size: 18px;
    color: #5a5e66;
    vertical-align: text-bottom;

    &.hover-effect {
      cursor: pointer;
      transition: background 0.3s;

      &:hover {
        background: rgba(0, 0, 0, 0.025);
      }
    }
  }

  .avatar-container {
    height: 50px;
    display: inline-block;
    position: fixed;
    top: 0;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 12px;
      position: relative;
      line-height: initial;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
</style>

