<template>
  <el-dialog
    :append-to-body="true" 
    :modal-append-to-body="false" 
    :visible.sync="visible" 
    :close-on-click-modal="false" 
    title="解绑终端" 
    @close="onClose"
  >
    <el-form>
      <el-form-item label="终端code">
        <el-input disabled v-model.trim="form.code"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input disabled v-model.trim="form.remark"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button @click="visible=false">
        取消
      </el-button>
      <el-button @click="handleSubmit">
        解绑
      </el-button>
    </div>
  </el-dialog>
</template>
<script>
import { unboundDevice } from '@api/physicalEquipment/bindTerminal'
export default {

}
</script>
