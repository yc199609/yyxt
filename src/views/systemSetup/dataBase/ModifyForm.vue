<template>
  <el-form :model="modifyForm" :rules="rules" ref="form">

    <el-form-item label="数据库id" label-width="120px" prop="id">
      <el-input v-model="modifyForm.id" :disabled='true'></el-input>
    </el-form-item>

    <el-form-item label="服务器IP" label-width="120px" prop="ip">
      <el-input v-model="modifyForm.ip"></el-input>
    </el-form-item>

    <el-form-item label="服务器端口" label-width="120px" prop="port">
      <el-input v-model="modifyForm.port"></el-input>
    </el-form-item>

    <el-form-item label="数据库用户名" label-width="120px" prop="userName">
      <el-input v-model="modifyForm.userName"></el-input>
    </el-form-item>

    <el-form-item label="数据库密码" label-width="120px" prop="password">
      <el-input v-model="modifyForm.password"></el-input>
    </el-form-item>

    <el-form-item label="数据库名" label-width="120px" prop="name">
      <el-input v-model="modifyForm.name"></el-input>
    </el-form-item>

    <el-switch style="display: block" v-model="modifyForm.isDefault" active-color="#13ce66" inactive-color="#ff4949"
      active-text="默认数据库" inactive-text="非默认数据库" :active-value="1" :inactive-value="0">
    </el-switch>

    <el-form-item class="buttonRow">
      <el-button class="mr10px" type="primary" @click="onSubmit">确 定</el-button>
      <el-button @click="cancel">取消</el-button>
    </el-form-item>

  </el-form>
</template>
<script>
import { UpdateConfigInfo } from "@api/systemSetup/dataBase";

export default {
  name: "ModifyForm",
  props: ["dataObj"],
  data() {
    return {
      modifyForm: {},
      rules: {
        id: [{ required: true, message: "id不能为空", trigger: "blur" }],
        ip: [{ required: true, message: "ip不能为空", trigger: "blur" }],
        port: [
          { required: true, message: "服务器端口不能为空", trigger: "blur" }
        ],
        userName: [
          { required: true, message: "数据库用户名不能为空", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        name: [{ required: true, message: "数据库名不能为空", trigger: "blur" }]
      }
    };
  },
  mounted() {
    this.$set(this, "modifyForm", this.dataObj);
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          UpdateConfigInfo({
            ...this.modifyForm,
            dbName: this.modifyForm.name
          }).then(res => {
            if (res.code === 0) {
              this.$message({
                type: "success",
                message: "修改成功",
                duration: 500,
                onClose: () => {
                  this.$emit("hidden");
                  this.$emit("init");
                }
              });
            } else {
              this.$message.error(res.message);
            }
          });
        }
      });
    },
    cancel() {
      this.$emit("hidden");
    }
  }
};
</script>
<style lang="scss" scoped>
.buttonRow {
  margin: 10px;
  text-align: center;
}
.mr10px {
  margin-right: 10px;
}
</style>
