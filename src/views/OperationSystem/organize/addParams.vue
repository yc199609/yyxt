<template>
  <el-dialog title="新增业务参数" :visible.sync="dialogVisible" :closeOnClickModal="false" :modal-append-to-body="false" :append-to-body="true">
    <el-form ref="form" :model="form" :rules="rules">
      <el-form-item label="代码" prop="code" label-width="50px">
        <el-input v-model="form.code"></el-input>
      </el-form-item>
      <el-form-item label="名称" prop="name" label-width="50px">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="值" label-width="50px">
        <el-input type="textarea" v-model="form.value"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="description" label-width="50px">
        <el-input v-model="form.description"></el-input>
      </el-form-item>
      <el-form-item label="是否返回PC(1为返回，0为不返回)" prop="isToPC">
        <el-input-number v-model="form.isToPC" :min="0" :max="1"></el-input-number>
      </el-form-item>
      <el-form-item label="是否返回微信端(1为返回，0为不返回)" prop="isToWeChat">
        <el-input-number v-model="form.isToWeChat" :min="0" :max="1"></el-input-number>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitAdd('form')">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { createConfigItem } from "@/api/organize";

export default {
  name: 'AddParams',
  props: ['idParam'],
  data() {
    return {
      dialogVisible: false,
      form: {
        companyId: '', // 机构Id
        code: '',
        name: '',
        value: '',
        description: '',
        isToPC: 0,
        isToWeChat: 0
      },
      rules: {
        code: [
          { required: true, message: '请输入业务参数代码', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入业务参数名称', trigger: 'blur' }
        ],
        value: [
          { required: true, message: '请输入业务参数值', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入业务参数备注', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitAdd(form) {
      console.log(this.value)
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.form.companyId = this.idParam // 机构id
          console.log(this.form.value)
          console.log(this.form, this.idParam)
          createConfigItem(this.form).then(res => {
            this.$emit('init') // 调用父组件的方法, 刷新已有的业务参数
            this.$message({
              message: '新增成功',
              type: 'success'
            });
            this.dialogVisible = false
          })
        } else {
          return false;
        }
      });
    }
  }
}
</script>

<style lang='scss' scoped>

</style>