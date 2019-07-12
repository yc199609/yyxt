<template>
  <el-dialog :visible.sync="visible" :close-on-click-modal="false" :title="type==='insert'?'新增':'修改'" @close="onClose">
    <el-form ref="form" :model="form" :rules="rules">
      <el-row>
        <el-col :offset="1" :span="9">
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="form.name" :maxlength="50"/>
          </el-form-item>
        </el-col>
        <el-col :offset="3" :span="9">
          <el-form-item label="角色代码" prop="code">
            <el-input v-model="form.code" :maxlength="100"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :offset="1">
          <strong>功能权限</strong>
          <el-tree ref="tree" :props="defaultProps" :check-strictly="true" :data="data" :default-checked-keys="checkedKeys" @check-change="handleCheckChange" node-key="id" show-checkbox style="width: 50%"/>
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
      id: '',
      checkedKeys: []
    }
  },
  methods: {
    handleCheckChange(e, checked) {
      if (checked) {
        this.$refs.tree.store.nodesMap[e.id].expanded = true
        this.$refs.tree.setChecked(e.parentId, true)
      } else {
        e.children.forEach(item => {
          this.$refs.tree.setChecked(item.id, false)
        })
      }
    },
    init(id) {
      this.id = id
      this.type = id == null ? 'insert' : 'edit'
      this.visible = true

      GetAllFunction().then(res => {
        this.data = res.data
      })

      if (id) {
        GetById(id).then(res => {
          this.checkedKeys = res.data.functionIds
          res.data.birthday = this.$moment
            .utc(res.data.birthday)
            .local()
            .format()
          this.$set(this, 'form', res.data)
        })
      }
    },
    onSubmit() {
      let arr = []
      this.$refs.tree.getCheckedNodes().find(obj => {
        arr.push(obj.id)
      })
      arr = [...this.$refs.tree.getHalfCheckedKeys(), ...arr]
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
            UpdateRoleRights({ roleName: this.form.name, code: this.form.code, roleId: this.id, functionIds: this.form.functionIds })
              .then(res => {
                this.$message({
                  message: '保存成功',
                  type: 'success',
                  duration: 500,
                  onClose: () => {
                    this.$emit('reload')
                    this.visible = false
                  }
                })
              })
          }

          if (this.type === 'insert') {
            SaveRoleRights({ roleName: this.form.name, code: this.form.code, functionIds: this.form.functionIds }).then(res => {
              this.$message({
                message: '新增成功',
                type: 'success',
                duration: 500,
                onClose: () => {
                  this.$emit('reload')
                  this.visible = false
                }
              })
            })
          }
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
