<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose">

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm" label-position="top" label-width="110px">
      <el-form-item label="字段名" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      
      <el-form-item label="字段值类型(1为开关量, 2为整数, 3为浮点数, 4为字符串, 5为表达式, 6为数组, 7为坐标点, 8为坐标点数组)" prop="valueType">
        <el-input-number :min="1" :max="8" v-model="ruleForm.valueType"></el-input-number>
      </el-form-item>

      <el-form-item label="影射字段" prop="code">
        <el-input v-model="ruleForm.code"></el-input>
      </el-form-item>

      <el-form-item label="是否有公式(0为否, 1为是)" prop="hasFormula">
        <el-input-number :min="0" :max="1" v-model="ruleForm.hasFormula"></el-input-number>
      </el-form-item>

      <el-form-item label="公式">
        <el-input v-model="ruleForm.formula"></el-input>
      </el-form-item>

      <el-form-item label="字段描述" prop="fieldDescription">
        <el-input v-model="ruleForm.fieldDescription"></el-input>
      </el-form-item>

      <el-form-item label="指令Id" prop="cmdId">
        <el-input v-model="ruleForm.cmdId"></el-input>
      </el-form-item>
    </el-form>
    
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="submit('ruleForm')">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { UpdateInfo, create } from '@api/instructions/field'

export default {
  data() {
    return {
      dialogVisible: false,
      ruleForm: {},
      rules: {
        name: { required: true, message: '字段名不能为空', trigger: 'blur' },
        valueType: { required: true, message: '字段值类型', trigger: 'blur' },
        code: { required: true, message: '影射字段不能为空', trigger: 'blur' },
        hasFormula: { required: true, message: '是否有公式不能为空', trigger: 'blur' },
        fieldDescription: { required: true, message: '字段描述不能为空', trigger: 'blur' },
        cmdId: { required: true, message: '指令Id', trigger: 'blur' }
      },
      title: '新增'
    };
  },
  methods: {
    init(row) {
      this.dialogVisible = true
      if (row) {
        this.title = '修改'
        this.ruleForm = row
      } else {
        this.title = '新增'
      }
    },
    handleClose(done) {
      this.dialogVisible = false
      this.ruleForm = {}
    },
    submit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var formula = this.ruleForm.formula
          if (formula === undefined) {
            formula = ''
          }
          if (this.title == '修改') {
            UpdateInfo({ formula: formula, ...this.ruleForm }).then(res => {
              this.$message({
                type: 'success',
                message: '修改成功',
                duration: 500,
              })
            })
          } else if (this.title == '新增') {
            create({ formula: formula, ...this.ruleForm }).then(res => {
              this.$message({
                type: 'success',
                message: '新增成功',
                duration: 500,
              })
            })
          }
          this.dialogVisible = false
          this.$parent.init()
          this.ruleForm = {}
        } else {
          console.log('error submit!!');
          return false;
        }
      });

    }
  }
}
</script>

<style lang='scss' scoped>

</style>