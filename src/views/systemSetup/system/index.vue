<template>
  <div style="padding:3vw;width:82.6vw">
    <el-alert :closable="false" title="系统参数" type="success">
      <router-view />
    </el-alert>
    
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

    <div class="block" style="margin-top: 20px;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="1"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      ></el-pagination>
    </div>
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
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
}
</script>

<style lang="scss" scoped>
  
</style>
