export const selectTable = {
  data() {
    return {
      activeCmd: '',
      chooseData: {},
      cmdIds: [],
      pageIndex: 1,
      pageSize: 10,
      totalCount: 20
    }
  },
  watch: {
    cmdIds: function(val, oldval) {
      if (val.length > oldval.length) {
        var c = val.filter((v) => oldval.indexOf(v) === -1)
        this.chooseData[c] = []
        if (oldval.length === 0) {
          this.activeCmd = c.toString()
        }
      } else {
        var d = oldval.filter((v) => val.indexOf(v) === -1)
        delete this.chooseData[d]
      }
    },
    activeCmd: function(val, oldval) {
      this.pageIndex = 1
      this.cmdChange()
    }
  },
  methods: {
    handleChooseAll(selection) {
      const chooseIds = this.chooseData[this.activeCmd].map(item => item.id)
      if (selection.length > 0) { // 全选
        const intersection = selection.filter(v => !chooseIds.includes(v.id))
        this.chooseData[this.activeCmd] = this.chooseData[this.activeCmd].concat(intersection)
      } else { // 全取消
        this.chooseData[this.activeCmd] = this.chooseData[this.activeCmd].filter(v => !this.codeList.map(item => item.id).includes(v.id))
      }
    },
    handleChoose(selection, row) {
      // 判断是新增选中还是取消选中
      const flag = selection.some((item) => item.id === row.id)
      if (flag) {
        const ishas = this.chooseData[this.activeCmd].some(item => item.id === row.id)
        if (!ishas) {
          this.chooseData[this.activeCmd].push(row)
        }
      } else {
        const index = this.chooseData[this.activeCmd].findIndex((item) => item.id === row.id)
        this.chooseData[this.activeCmd].splice(index, 1)
      }
    },
    toggleSelection(rows) {
      const intersection = this.codeList.filter(v => rows.map(item => item.id).includes(v.id))
      intersection.forEach(row => {
        this.$nextTick(() => {
          this.$refs['multipleTable' + this.activeCmd][0].toggleRowSelection(row, true)
        })
      })
    },
    handleCurrentChange(val) {
      this.pageIndex = val
      this.cmdChange()
    }
  }
}

import { GetByCmdId } from '@api/instructions/field' //  根据指令id,获取指令字段
import { GetByProtocalId } from '@api/protocol/cmd' //  根据协议id获取指令
import JsonEditor from '@/components/jsonEditor'
export const common = {
  data() {
    return {
      visible: false,
      tabsView: true,
      cmdList: [],
      codeList: [],
      json: {},
      protocalList: []
    }
  },
  components: {
    JsonEditor
  },
  methods: {
    cancel() {
      this.visible = false
    },
    onClose() {
      this.$emit('reload')
    },
    formatter(arr) {
      const _cmdIds = []
      arr.forEach(item => {
        const sds = _cmdIds.find(cur => cur.cmdId == item.cmdId)
        if (sds) {
          sds.fieldIds.push({ ...item, fieldId: item.id })
        } else {
          _cmdIds.push({
            cmdId: item.cmdId,
            fieldIds: [item]
          })
        }
      })
      return _cmdIds
    },
    cmdChange() {
      GetByCmdId({
        cmdId: this.activeCmd,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      })
        .then(res => {
          this.$set(this, 'codeList', res.data.items)
          this.totalCount = res.data.totalCount
          this.pageIndex = res.data.pageIndex
          this.pageSize = res.data.pageSize
          this.toggleSelection(this.chooseData[this.activeCmd])
        })
    },
    protocalChange(e) {
      GetByProtocalId(e)
        .then(res => {
          this.$set(this, 'cmdList', res.data)
          this.codeList = []
          this.cmdIds = ''
        })
    }
  }
}
