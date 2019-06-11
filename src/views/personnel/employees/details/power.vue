<template>
  <el-form>
    <el-card>
      <div slot="header" class="clearfix">
        <span>角色</span>
        <el-button class="headerbutton" type="text" @click="handleCheckAll">{{ checkAll?'反选':'全选' }}</el-button>
      </div>
      <el-checkbox-group v-model="checkedRoles" class="clearfix" @change="handleCheckedRole">
        <el-checkbox v-for="role in roles" :label="role.id" :key="role.id" class="checkbox">{{ role.name }}</el-checkbox>
      </el-checkbox-group>
    </el-card>
    <el-form-item class="buttonRow" style="text-align:center;">
      <el-button class="marginTop" type="primary" @click="onSubmit">{{ mode==='insert'?'保存':'修 改' }}</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { GetAll } from '@api/Personnel/role'
import { UpdateInfo, Create } from '@api/Personnel/employees'
import { success } from '@/mixin'
export default {
  mixins: [success],
  props: ['mode', 'data'],
  data() {
    return {
      checkAll: false,
      checkedRoles: [],
      roles: []
    }
  },
  mounted() {
    GetAll()
      .then(res => {
        this.$set(this, 'roles', res.data)
      })
    var checkedRoles = (this.data.roles || []).map(item => item.id)
    this.$nextTick(() => {
      this.$set(this, 'checkedRoles', checkedRoles)
    })
  },
  methods: {
    init() {},
    handleCheckAll(val) {
      if (this.checkAll) {
        this.checkedRoles = []
      } else {
        this.checkedRoles = (this.roles || []).map(item => item.id)
      }
      this.checkAll = !this.checkAll
    },
    handleCheckedRole(value) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.roles.length
    },
    onSubmit() {
      var utc
      if (this.data.birthday) {
        utc = this.$moment(this.data.birthday)
          .utc()
          .format()
      } else {
        utc = ''
      }
      var departmentIds = (this.data.departments || []).map(item => item.id)
      const obj = { ...this.data, birthday: utc, roleIds: this.checkedRoles, departmentIds }
      delete obj.departments
      switch (this.mode) {
        case 'insert':
          Create(obj)
            .then(res => {
              this.success('新增成功', 'hidden')
            })
          break
        case 'edit':
          UpdateInfo(obj)
            .then(res => {
              this.success('修改成功', 'hidden')
            })
          break
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  .clearfix:after {
      clear: both
  }
  .headerbutton{
      float: right;
      padding: 3px 0;
  }
  .marginTop{
      margin-top: 30px;
  }
  .checkbox{
    float: left;
    margin-bottom: 20px;
  }
</style>
