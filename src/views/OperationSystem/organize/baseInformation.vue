<template>
  <div style="padding:30px;" class="container">
    <section class="content-wrapper-container">
      <el-form>
        <span>基本信息</span>
        <hr style="background-color:#f7eaea; height: 1px; border: none;">
        <el-row :gutter="24">
          <el-col :span="8">
            <el-form-item label="简称">
              <el-input></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8"> 
            <el-form-item label="全称">
              <el-input></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="代码">
              <el-input></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="24">
          <el-col :span="8">
            <el-form-item label="外线电话">
              <el-input placeholder="请输入外线电话"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="内线电话">
              <el-input placeholder="请输入内线电话"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="传真">
              <el-input placeholder="请输入机构传真"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="24">
          <el-col :span="8">
            <el-form-item label="经营范围">
              <el-input placeholder="请输入机构经营范围"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="楼层">
              <el-input placeholder="请输入机构楼层"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col>
            <el-form-item label="详细地址">
              <el-input placeholder="请输入机构详细地址"></el-input>
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
        </el-row> -->
       
      </el-form>

      <!-- <img src="./timg.gif" alt="" style="width: 10vw;float: right;margin-left: 5vw;"> -->
    </section>

    <!-- <section class="picture">
      <img src="./timg.gif" alt="">
    </section> -->
  </div>
</template>

<script>
export default {
  name: 'baseInformation'
}
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

