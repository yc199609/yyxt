<template>
  <div style="padding:30px;" class="container">
    <section class="content-wrapper-container">
      <el-form v-model="form">
        <span>基本信息</span>
        <hr style="background-color:#f7eaea; height: 1px; border: none;">
        <el-row :gutter="24">
          <el-col :span="8">
            <el-form-item label="简称">
              <el-input v-model="form.id"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="全称">
              <el-input v-model="form.fullName"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="代码">
              <el-input v-model="form.code"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="24">
          <el-col :span="8">
            <el-form-item label="外线电话">
              <el-input placeholder="请输入外线电话" v-model="form.outsidePhone"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="内线电话">
              <el-input placeholder="请输入内线电话" v-model="form.insidePhone"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="传真">
              <el-input placeholder="请输入机构传真" v-model="form.fax"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="24">
          <el-col :span="8">
            <el-form-item label="经营范围">
              <el-input placeholder="请输入机构经营范围" v-model="form.businessScop"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="楼层">
              <el-input placeholder="请输入机构楼层" v-model="form.floor"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col>
            <el-form-item label="详细地址">
              <el-input placeholder="请输入机构详细地址" v-model="form.address"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-row>
          <el-col :span="8">
            <el-form-item :label="$t('User.table.account')" prop="account">
              <el-input
                type="text"
                v-model="formObject.account"
                :placeholder="$t('User.placeholder.account')"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>-->
        <el-button type="primary" style="float: right;" @click="saveInfo">保存</el-button>
        <el-button style="float: right; margin-right: 15px;" @click="closeInfo">取消</el-button>
      </el-form>

      <!-- <img src="./timg.gif" alt="" style="width: 10vw;float: right;margin-left: 5vw;"> -->
    </section>

    <!-- <section class="picture">
      <img src="./timg.gif" alt="">
    </section>-->
  </div>
</template>

<script>
import { updateBaseInfo } from '@/api/organize';
export default {
  name: "baseInformation",
  props: ["infoData"],
  data() {
    return {
      form: {
        id: '',
        fullname: '',
        code: '',
        outsidePhone: '',
        insidePhone: '',
        fax: '',
        businessScop: '',
        floor: '',
        address: ''
      }
    }
  },
  mounted() {
  },
  methods: {
    closeInfo() {
      this.$emit('hidden')
    },
    saveInfo() {
      // 此处没写
      // 保存修改基本信息
      const _that = this
      return new Promise((resolve, reject) => {
        updateBaseInfo(_that.form).then(res => {
          console.log(res)
          this.$emit('hidden')
        }).catch(err => {
          console.log(err)
        })
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  // width: 75vw;
  .picture {
    position: absolute;
    right: 10px;
    top: 85px;
    width: 10vw;
    img {
      width: 100%;
    }
  }
}
</style>

