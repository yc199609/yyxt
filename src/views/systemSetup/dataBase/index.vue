<template>
  <div style="padding:3vw;width:82.6vw">
    <el-alert :closable="false" title="数据库参数" type="success">
      <router-view />
    </el-alert>
    
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        align="center"
        prop="databaseID"
        label="数据库id">
      </el-table-column>
      <el-table-column
        align="center"
        prop="databaseName"
        label="数据库名">
      </el-table-column>
      <el-table-column
        align="center"
        prop="port"
        label="服务器IP/端口">
      </el-table-column>
      <el-table-column
        align="center"
        prop="databaseUsername"
        label="数据库用户名">
      </el-table-column>
      <el-table-column
        align="center"
        prop="state"
        label="状态">
      </el-table-column>
      <el-table-column
        align="center"
        prop="operation"
        label="操作">
      </el-table-column>
    </el-table>

    <div class="block" style="margin-top: 15px;">
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
          operation: 'true'
        },
        {
          operation: 'true'
        },
        {
          operation: 'true'
        },
        {
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
