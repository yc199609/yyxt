export const pagging = {
  data() {
    return {
      pageIndex: 1,
      pageSize: 10,
      totalCount: 50
    }
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val
      this.init()
    },
    handleCurrentChange(val) {
      this.pageIndex = val
      this.init()
    }
  }
}

export const deviceSearch = {
  data() {
    return {
      deviceTypeOption: {
        name: ''
      },
      deviceView: false,
      deviceOption: {
        name: ''
      }
    }
  },
  methods: {
    changeDeviceOption(val, mode) {
      this.$nextTick(() => {
        switch (mode) {
          case 'device':
            this.$set(this, 'deviceOption', val)
            break
          case 'deviceType':
            this.$set(this, 'deviceTypeOption', val)
            break
        }
      })
    },
    deviceSearch(mode) {
      this.deviceView = true
      this.$nextTick(() => {
        this.$refs.deviceSearch.init(mode)
      })
    },
    clearDeviceOption(mode) {
      switch (mode) {
        case 'device':
          this.deviceOption = {
            name: ''
          }
          break
        case 'deviceType':
          this.deviceTypeOption = {
            name: ''
          }
          break
      }
    }
  }
}

export const keyword = {
  data() {
    return {
      keyword: null
    }
  },
  methods: {
    changeKeyword(val) {
      this.keyword = val
    }
  }
}

export const success = {
  methods: {
    success(msg, emit) {
      this.$message({
        type: 'success',
        message: msg,
        duration: 500,
        onClose: () => {
          this.init()
          if (emit) {
            this.$emit(emit)
          }
        }
      })
    }
  }
}

export const buttonPermissions = {
  methods: {
    buttonPermissions(code) {
      return this.$store.state.user.userInfo.functions.some(item => item.code === code)
    }
  }
}
