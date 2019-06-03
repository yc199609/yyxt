<template>
  <el-dialog :append-to-body="true" :modal-append-to-body="false" :visible.sync="visible" :close-on-click-modal="false" :title="mode==='insert'?'新增':'修改'" @close="onClose">
    <el-tabs v-if="visible" :value="activeName">
      <el-tab-pane name="基本信息" label="基本信息">
        <baseInfo :mode="mode" :data="data" @submit="baseInfo" @hidden="hidden"/>
      </el-tab-pane>
      <el-tab-pane v-if="mode === 'edit'||step>=1" name="员工权限" label="员工权限">
        <power :mode="mode" :data="data" @hidden="hidden"/>
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>
<script>
import { GetById } from '@api/Personnel/employees'
import baseInfo from './baseInfo'
import power from './power'
export default {
  components: {
    baseInfo,
    power
  },
  data() {
    return {
      tabArr: ['基本信息', '员工权限'],
      visible: false,
      mode: 'insert',
      id: '',
      step: 0,
      data: {}
    }
  },
  computed: {
    activeName: function() {
      return this.tabArr[this.step]
    }
  },
  methods: {
    init(id) {
      this.id = id
      if (id === undefined) {
        this.mode = 'insert'
        this.visible = true
        this.step = 0
      } else {
        GetById(id)
          .then(res => {
            this.$set(this, 'data', res.data)
            this.visible = true
            this.mode = 'edit'
            this.step = 0
          })
      }
    },
    onClose() {
      this.$emit('reload')
    },
    baseInfo(val) {
      this.$set(this, 'data', { ...this.data, ...val })
      this.step++
    },
    hidden() {
      console.log(2321)
      this.visible = false
    }
  }
}
</script>
