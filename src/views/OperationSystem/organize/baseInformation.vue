<template>
  <el-dialog :visible.sync="visible" :closeOnClickModal="false">
  <div
    style="padding:30px;"
    class="container"
  >
    <section class="content-wrapper-container">
      <el-form :model="form" :rules="rules">
        <span>基本信息</span>
        <hr style="background-color:#f7eaea; height: 1px; border: none;">
        <el-row :gutter="24">
          <el-col :span="8">
            <el-form-item label="简称" prop="name">
              <el-input v-model="form.name" :maxlength="50"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="全称">
              <el-input v-model="form.fullName" :maxlength="50"></el-input>
            </el-form-item>
          </el-col>

          <!-- <el-col :span="8">
            <el-form-item label="代码">
              <el-input v-model="form.code" :maxlength="50"></el-input>
            </el-form-item>
          </el-col> -->
        </el-row>

        <el-row :gutter="24">
          <el-col :span="8">
            <el-form-item label="外线电话">
              <el-input
                placeholder="请输入外线电话"
                v-model="form.outsidePhone"
                :maxlength="50"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="内线电话">
              <el-input
                placeholder="请输入内线电话"
                v-model="form.insidePhone"
                :maxlength="50"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="传真">
              <el-input
                placeholder="请输入机构传真"
                v-model="form.fax"
                :maxlength="50"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="24">
          <el-col :span="8">
            <el-form-item label="经营范围">
              <el-input
                placeholder="请输入机构经营范围"
                v-model="form.businessScop"
                :maxlength="50"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="楼层">
              <el-input
                placeholder="请输入机构楼层"
                v-model="form.floor"
                :maxlength="50"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col>
            <el-form-item label="详细地址">
              <el-input
                placeholder="请输入机构详细地址"
                v-model="form.address"
                :maxlength="50"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-button
          type="primary"
          style="float: right;"
          @click="saveInfo"
        >保存</el-button>
        <el-button
          style="float: right; margin-right: 15px;"
          @click="closeInfo"
        >取消</el-button>
      </el-form>

    </section>

  </div>
  </el-dialog>
</template>

<script>
import { updateBaseInfo, getBaseInfoById } from '@/api/organize';
export default {
  name: "baseInformation",
  data() {
    return {
      visible:false,
      form: {
        name: '',
        fullName: '',
        code: '',
        outsidePhone: '',
        insidePhone: '',
        fax: '',
        businessScop: '',
        floor: '',
        address: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入机构简称', trigger: 'blur' },
          { min: 1, max: 50, message: '长度需在 1 到 50 个字符之间', trigger: 'blur' },
          { pattern:  /^\S*$/, message: "不能输入空格" }
        ],
      }
    }
  },
  methods: {
    init(id) {
      this.visible = true
      getBaseInfoById(id)
        .then(res => {
          this.$set(this,'form',res.data)
        })
    },
    closeInfo() {
      this.visible = false
    },
    saveInfo(formName) {
      // 保存修改基本信息
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
          updateBaseInfo(this.form)
          .then(res => {
            this.$message({
              type:'success',
              message:'成功',
              duration:500,
              onClose:()=>{
                this.visible = false
                this.$emit('render')
              }
            })
          })
        } else {
          console.log('error submit!!');
          return false;
        }
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

