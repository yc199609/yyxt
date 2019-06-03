<template>
  <el-dialog :visible.sync="visible" :close-on-click-modal="false" :title="type==='insert'?'新增':'修改'" @close="onClose">
    <el-form ref="form" :model="form" :rules="rules">
      <el-row>
        <el-col :offset="1" :span="9">
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="form.name"/>
          </el-form-item>
        </el-col>
        <el-col :offset="3" :span="9">
          <el-form-item label="角色代码" prop="code">
            <el-input v-model="form.code"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :offset="1">
          <strong>功能权限</strong>
          <el-tree ref="tree" :props="defaultProps" :data="data" node-key="id" show-checkbox style="width: 50%"/>
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
// eslint-disable-next-line no-unused-vars
import { GetById, Create, UpdateInfo, GetAllFunction, UpdateRoleRights, SaveRoleRights } from '@api/Personnel/role'

export default {
  data() {
    return {
      visible: false,
      form: {
        name: '',
        code: '',
        type: [],
        functionIds: []
      },
      rules: {
        name: [
          {
            type: 'string',
            required: true,
            message: '请输入角色名称',
            trigger: 'blur'
          }
        ],
        code: [
          {
            type: 'string',
            required: true,
            message: '请输入角色代码',
            trigger: 'blur'
          }
        ]
      },
      defaultProps: {
        label: 'name',
        children: 'children'
      },
      type: 'insert',
      data: [],
      id: ''
    }
  },
  methods: {
    init(id) {
      this.id = id
      this.type = id == null ? 'insert' : 'edit'
      this.visible = true

      GetAllFunction().then(res => {
        this.data = res.data
      })

      if (id) {
        GetById(id).then(res => {
          res.data.birthday = this.$moment
            .utc(res.data.birthday)
            .local()
            .format()
          this.$set(this, 'form', res.data)
        })
      }
    },
    onSubmit() {
      // UpdateRoleRights
      // console.log(this.$refs.tree.getCheckedNodes()) // 返回目前被选中的节点所组成的数组
      const arr = []
      this.$refs.tree.getCheckedNodes().find(obj => {
        arr.push(obj.id)
      })
      this.form.functionIds = arr

      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.$refs.tree.getCheckedNodes().length === 0) {
            this.$message({
              message: '请选择至少一个功能权限',
              type: 'warning'
            })
            return
          }

          if (this.type === 'edit') {
            UpdateRoleRights({ roleName: this.form.name, code: this.form.code, roleId: this.id, functionIds: this.form.functionIds }).then(res => {
              this.visible = false
              this.$message({
                message: '保存成功',
                type: 'success'
              })
            })
          }

          if (this.type === 'insert') {
            SaveRoleRights({ roleName: this.form.name, code: this.form.code, functionIds: this.form.functionIds }).then(res => {
              this.visible = false
              this.$message({
                message: '保存成功',
                type: 'success'
              })
            })
          }
          this.$parent.init()
        }
      })
    },
    cancel() {
      this.visible = false
    },
    onClose() {
      this.$parent.detailShow = false
    }
  }
}
</script>
