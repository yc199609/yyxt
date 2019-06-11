<template>
  <div>
    <el-card shadow="hover">
      <el-form ref="form" :model="form" :rules="rules" class="form">
        <el-row>
          <el-col :offset="1" :span="9">
            <el-form-item label="真实姓名" prop="name">
              <el-input v-model="form.name"/>
            </el-form-item>
          </el-col>
          <el-col :offset="3" :span="9">
            <el-form-item label="手机号" prop="mobile">
              <el-input :disabled="mode==='edit'" v-model="form.mobile"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :offset="1" :span="15">
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="form.email"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :offset="1" :span="9">
            <el-form-item label="昵称" prop="nickName">
              <el-input v-model="form.nickName"/>
            </el-form-item>
          </el-col>

          <el-col :offset="3" :span="9">
            <el-form-item label="简拼" prop="pinYing">
              <el-input v-model="form.pinYing"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :offset="1" :span="9">
            <el-form-item label="性别" prop="sex">
              <el-col>
                <el-select v-model="form.sex" placeholder="请选择性别">
                  <el-option :value="0" label="女"/>
                  <el-option :value="1" label="男"/>
                </el-select>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :offset="3" :span="9">
            <el-form-item label="生日" prop="birthday">
              <el-col>
                <el-date-picker v-model="form.birthday" type="date" placeholder="选择日期"/>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :offset="1" :span="22">
            <el-form-item label="备注" prop="remark">
              <el-input v-model="form.remark" type="textarea"/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card class="department" shadow="hover" style="margin-top:10px;">
      <div slot="header" class="clearfix">
        <span style="line-height:38px;font-weight:700;">所属部门</span>
        <el-button style="float:right;" type="text" @click="showDep">修改</el-button>
      </div>
      <div>
        <el-tag v-for="item in form.departments" :key="item.id" style="margin-right:5px;">{{ item.name }}</el-tag>
      </div>
    </el-card>
    <div style="text-align:center;margin-top:10px;">
      <el-button class="mr10px" type="primary" @click="onSubmit">{{ mode==='insert'?'下一步':'修 改' }}</el-button>
    </div>
    <Department v-if="depView" ref="department" @submit="departmentChoose" />
  </div>
</template>
<script>
import { success } from '@/mixin'
import { UpdateInfo } from '@api/Personnel/employees'
import { validPhone, validEmail } from '@/utils/validate.js'
import Department from './Department'
export default {
  components: {
    Department
  },
  mixins: [success],
  props: ['mode', 'data'],
  data() {
    return {
      form: {
        name: '',
        mobile: '',
        email: '',
        nickName: '',
        pinYing: '',
        birthday: '',
        sex: '',
        remark: ''
      },
      rules: {
        name: [
          {
            type: 'string',
            required: true,
            message: '请输入姓名',
            trigger: 'blur'
          }
        ],
        mobile: [
          {
            type: 'number',
            required: true,
            validator: validPhone,
            trigger: 'blur'
          }
        ],
        email: [
          {
            required: true,
            type: 'string',
            validator: validEmail,
            trigger: 'blur'
          }
        ],
        sex: [
          {
            required: true,
            message: '请选择性别',
            trigger: 'change'
          }
        ]
      },
      depView: false
    }
  },
  mounted() {
    this.$set(this, 'form', this.data)
  },
  methods: {
    init() {},
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          var utc
          if (this.form.birthday) {
            utc = this.$moment(this.form.birthday)
              .utc()
              .format()
          } else {
            utc = ''
          }
          var roleIds = (this.form.roles || []).map(item => item.id)
          var departmentIds = (this.form.departments || []).map(item => item.id)
          const obj = { ...this.form, birthday: utc, departmentIds, roleIds }
          switch (this.mode) {
            case 'insert':
              this.$emit('submit', obj)
              break
            case 'edit':
              UpdateInfo(obj)
                .then(res => {
                  this.success('修改成功', 'hidden')
                })
              break
          }
        }
      })
    },
    showDep() {
      this.depView = true
      this.$nextTick(() => {
        this.$refs.department.init(this.form.departments)
      })
    },
    departmentChoose(val) {
      this.form.departments = val
    }
  }
}
</script>
<style scoped>
  .form >>> .el-form-item{
    margin-bottom: 0 !important;
  }
  .department >>> .el-card__header{
    padding-top: 1px;
    padding-bottom: 1px;
  }
</style>
