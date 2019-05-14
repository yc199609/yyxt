<template>
  <el-form
    :model="form"
    ref="form"
    :rules="rules"
  >
    <!-- :rules="newloginRules" -->
    <el-form-item
      prop="newpassword"
      label='新密码'
    >
      <el-input v-model="from.newpassword" type="password" :maxlength="50"></el-input>
    </el-form-item>
    <el-form-item
      prop="submitpassword"
      label='确认密码'
    >
      <el-input v-model="from.submitpassword" type="password" :maxlength="50"></el-input>
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
  name: 'initPassword',
  data() {
    const checkSubmitpassword = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请确认密码'))
      } else if (value !== this.form.newpassword) {
        return callback(new Error('2次密码输入不一致'))
      } else {
        callback()
      }
    }
    return {
      form: {
        newpassword: '',
        submitpassword: ''
      },
      rules: {
        newpassword: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 30, message: '密码需在6-30位之间', trigger: 'blur' }
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
          fristChangePwd(this.form.newpassword)
            .then(res => {
              this.$emit('submit')
            })
        }
      })
    }
  }
}
</script>