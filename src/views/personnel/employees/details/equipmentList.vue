<template>
  <el-table :data="tableData" class="table" border>
    <el-table-column align="center" prop="name" label="设备编号"/>
    <el-table-column align="center" prop="ss" label="设备名称"/>
    <el-table-column align="center" prop="type" label="设备类型"/>
    <el-table-column align="center" prop="time" label="授权时间"/>
    <el-table-column align="center" label="操作">
      <template slot-scope="scope">
        <el-button @click="removeRight(scope.row.id)">解除授权</el-button>
        <el-row>
          <el-col :offset="3" :span="8" class="ycbutton">
            <el-tooltip effect="dark" content="编辑" placement="top">
              <el-button type="warning" icon="el-icon-edit-outline" @click="edit(scope.row.id)"/>
            </el-tooltip>
          </el-col>
          <el-col :span="8" :offset="2" class="ycbutton">
            <el-tooltip effect="dark" content="删除" placement="top">
              <el-button type="danger" icon="el-icon-delete" @click="del(scope.row.id)"/>
            </el-tooltip>
          </el-col>
        </el-row>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  data() {
    return {
      tableData: []
    }
  },
  methods: {
    removeRight(id) {
      console.log(id)
    }
  }
}
</script>
