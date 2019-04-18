<template>
  <div style="padding:1vw;">
    <span>业务参数</span>
    <hr style="background-color:#f7eaea; height: 1px; border: none;">
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        align="center"
        prop="code"
        label="代码">
      </el-table-column>
      <el-table-column
        align="center"
        prop="name"
        label="名称">
      </el-table-column>
      <el-table-column
        align="center"
        prop="value"
        label="值">
      </el-table-column>
      <el-table-column
        align="center"
        prop="remarks"
        label="备注">
      </el-table-column>
      <el-table-column
        align="center"
        prop="operation"
        label="操作">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          name: 'Madik',
          code: 'Madik',
          value: '100',
          operation: 'true'
        },
        {
          name: 'Madik',
          code: 'Madik',
          value: '100',
          operation: 'true'
        },
        {
          name: 'Madik',
          code: 'Madik',
          value: '100',
          operation: 'true'
        },
        {
          name: 'Madik',
          code: 'Madik',
          value: '100',
          operation: 'true'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
  
</style>
