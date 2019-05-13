<template>
  <el-dialog :visible.sync="visible" :closeOnClickModal="false" :title="type==='insert'?'新增':'修改'">
    <el-form :model="form" :rules="rules" ref="form">
      <el-row>
        <el-col :offset="1" :span="9">
          <el-form-item label="真实姓名" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :offset="3" :span="9">
          <el-form-item label="手机号" prop="mobile">
            <el-input v-model="form.mobile"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :offset="1" :span="15">
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="form.email"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :offset="1" :span="9">
          <el-form-item label="昵称" prop="nickName">
            <el-input v-model="form.nickName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :offset="3" :span="9">
          <el-form-item label="简拼" prop="pinYing">
            <el-input v-model="form.pinYing"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :offset="1" :span="9">
          <el-form-item label="性别" prop="sex">
            <el-col>
              <el-select placeholder="请选择性别" v-model="form.sex">
                <el-option label="女" :value="0"></el-option>
                <el-option label="男" :value="1"></el-option>
              </el-select>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :offset="3" :span="9">
          <el-form-item label="生日" prop="birthday">
            <el-col>
              <el-date-picker v-model="form.birthday" type="date" placeholder="选择日期">
              </el-date-picker>
            </el-col>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :offset="1" :span="22">
          <el-form-item label="备注" prop="remark">
            <el-input type="textarea" v-model="form.remark"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item class="buttonRow" style="text-align:center;">
        <el-button class="mr10px" type="primary" @click="onSubmit">确 定</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
import { GetById, Create, UpdateInfo } from "@api/hr/staff.js";
import { validPhone, validEmail } from "@/utils/validate.js";
export default {
  data() {
    return {
      visible: false,
      form: {
        name: "",
        mobile: "",
        email: "",
        nickName: "",
        pinYing: "",
        birthday: "",
        sex: "",
        remark: ""
      },
      rules: {
        name: [
          {
            type: "string",
            required: true,
            message: "请输入姓名",
            trigger: "blur"
          }
        ],
        mobile: [
          {
            type: "number",
            required: true,
            validator: validPhone,
            trigger: "blur"
          }
        ],
        email: [
          {
            required: true,
            type: "string",
            validator: validEmail,
            trigger: "blur"
          }
        ],
        sex: [
          {
            required: true,
            message: "请选择性别",
            trigger: "change"
          }
        ]
      },
      type: "insert"
    };
  },
  methods: {
    init(id) {
      this.type = id == null ? "insert" : "edit";
      this.visible = true;
      this.$nextTick(() => {
        this.$refs.form.resetFields();
      });
      if (id) {
        GetById(id).then(res => {
          res.data.birthday = this.$moment
            .utc(res.data.birthday)
            .local()
            .format();
          this.$set(this, "form", res.data);
        });
      }
    },
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          var utc
          if(this.form.birthday){
            utc = this.$moment(this.form.birthday)
            .utc()
            .format();
          }else{
            utc = ''
          }
          switch (this.type) {
            case "insert":
              Create({
                ...this.form,
                birthday: utc
              }).then(res => {
                this.$message({
                  type: "success",
                  message: "新增成功",
                  duration: 500,
                  onClose: () => {
                    this.cancel();
                    this.$emit("reload");
                  }
                });
              });
              break;
            case "edit":
              UpdateInfo({
                ...this.form,
                birthday: utc
              }).then(res => {
                this.$message({
                  type: "success",
                  message: "修改成功",
                  duration: 500,
                  onClose: () => {
                    this.cancel();
                    this.$emit("reload");
                  }
                });
              });
              break;
          }
        }
      });
    },
    cancel() {
      this.visible = false;
    }
  }
};
</script>
