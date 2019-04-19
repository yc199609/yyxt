<template>
  <el-form v-model="modifyForm">

    <el-form-item
      label="数据库id"
      label-width="120px"
    >
      <el-input
        v-model="modifyForm.id"
        :disabled='true'
      ></el-input>
    </el-form-item>

    <el-form-item
      label="服务器IP"
      label-width="120px"
    >
      <el-input v-model="modifyForm.ip"></el-input>
    </el-form-item>

    <el-form-item
      label="服务器端口"
      label-width="120px"
    >
      <el-input v-model="modifyForm.port"></el-input>
    </el-form-item>

    <el-form-item
      label="数据库用户名"
      label-width="120px"
    >
      <el-input v-model="modifyForm.userName"></el-input>
    </el-form-item>

    <el-form-item
      label="数据库密码"
      label-width="120px"
    >
      <el-input v-model="modifyForm.password"></el-input>
    </el-form-item>

    <el-form-item
      label="数据库名"
      label-width="120px"
    >
      <el-input v-model="modifyForm.dbName"></el-input>
    </el-form-item>

    <el-switch
      style="display: block"
      v-model="modifyForm.isdefault"
      active-color="#13ce66"
      inactive-color="#ff4949"
      active-text="默认数据库"
      inactive-text="非默认数据库"
      active-value="1"
      inactive-value="0"
    >
    </el-switch>

    <el-form-item>
        <el-button
            type="primary"
            @click="onSubmit"
        >确 定</el-button>
        <el-button @click="cancel">取消</el-button>
    </el-form-item>

  </el-form>
</template>
<script>
import { UpdateConfigInfo } from '@api/systemSetup/dataBase'
export default {
    props:['dataObj'],
    data(){
        return {
            modifyForm:{
            },
        }
    },
    mounted(){
        this.$set(this,'modifyForm',this.dataObj)
    },
    methods:{
        onSubmit(){
            UpdateConfigInfo(this.modifyForm)
                .then(res => {
                    if (res.code === 0) {
                        this.$message({
                        type: "success",
                        message: "修改成功",
                        duration: 500,
                        onClose: () => {
                            this.$emit('hidden')
                            this.$emit('init')
                        }
                        })
                    } else {
                        this.$message.error(res.message)
                    }
                })
                .catch(err => {
                    this.$message.error('错误')
                })
        },
        cancel(){
            this.$emit('hidden')
        }
    }
}
</script>