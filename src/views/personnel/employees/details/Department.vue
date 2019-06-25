<template>
  <el-dialog :append-to-body="true" :modal-append-to-body="false" :visible.sync="visible" @close="onClose">
    <el-tree
      ref="tree"
      :data="data"
      :props="defaultProps"
      :check-strictly="true"
      :default-checked-keys="defaultKey"
      show-checkbox
      node-key="id"
      highlight-current
    />
    <el-button @click="submit">
      确定
    </el-button>
  </el-dialog>
</template>
<script>
import { GetAll } from '@api/Personnel/department'
export default {
  data() {
    return {
      visible: false,
      data: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      defaultKey: []
    }
  },
  methods: {
    submit() {
      this.$emit('submit', this.$refs.tree.getCheckedNodes())
      this.visible = false
    },
    init(val) {
      this.visible = true
      this.defaultKey = (val || []).map(item => item.id)
      this.$nextTick(() => {
        GetAll()
          .then(res => {
            this.data = res.data
          })
      })
    },
    onClose() {
      this.$parent.depView = false
    }
  }
}
</script>

