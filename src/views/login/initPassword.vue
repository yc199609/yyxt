<template>
  <el-form
    :model="from"
    ref="form"
  >
    <!-- :rules="newloginRules" -->
    <el-form-item
      prop="newpassword"
      label='新密码'
      :rules="[
        { required: true, message: '新密码不能为空'}
      ]"
    >
      <el-input v-model="from.newpassword"></el-input>
    </el-form-item>
    <el-form-item
      prop="submitpassword"
      label='确认密码'
      :rules="[
        { required: true, message: '确认密码不能为空'}
      ]"
    >
      <el-input v-model="from.submitpassword"></el-input>
    </el-form-item>
    <el-form-item>
      <template>
        <el-button @click="submit">确定</el-button>
      </template>
    </el-form-item>
  </el-form>
</template>
<script>
import { fristChangePwd } from '@api/login'
export default {
  data() {
    const checkSubmitpassword = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请确认密码'))
      } else if (value !== this.from.newpassword) {
        return callback(new Error('2次密码输入不一致'))
      } else {
        callback()
      }
    }
    return {
      from: {
        newpassword: '',
        submitpassword: ''
      },
      rules: {
        newpassword: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '请输入6位以上密码', trigger: 'blur' }
        ],
        submitpassword: [
          { validator: checkSubmitpassword, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          fristChangePwd(this.from.newpassword)
            .then(res => {
              this.$emit('submit')
            })
        }
      })
    }
  }
}
</script>