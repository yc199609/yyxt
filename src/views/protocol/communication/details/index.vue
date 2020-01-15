<template>
  <el-dialog 
    :append-to-body="true" 
    :modal-append-to-body="false" 
    :visible.sync="visible" 
    :close-on-click-modal="false" 
    :title="mode==='insert'?'新增':'修改'" 
    @close="onClose"
    >

    <el-form ref="form" :model="form" label-position="top" :rules="rules">
      <el-form-item label="协议名称" prop="protocalName">
        <el-input v-model.trim="form.protocalName" />
      </el-form-item>
      <el-form-item label="代号" prop="protocalCode">
        <el-input v-model.trim="form.protocalCode" />
      </el-form-item>
      <el-form-item label="当前版本" prop="currentVersion">
        <el-input v-model.trim="form.currentVersion" />
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model.trim="form.description" />
      </el-form-item>
    </el-form>

    <div slot="footer">
      <el-button @click="cancel">取消</el-button>
      <el-button @click="submit">确定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { GetById, UpdateInfo, create } from '@/api/protocol/communication'
export default {
  data() {
    return {
      visible: false,
      mode: 'insert',
      id: '',
      form: {},
      rules:{
        protocalName:[
          {
            required: true,
            message: '协议名称不能为空',
            trigger: 'blur'
          },
        ],
        protocalCode:[
          {
            required: true,
            message: '代号不能为空',
            trigger: 'blur'
          },
        ],
        currentVersion:[
          {
            required: true,
            message: '当前版本不能为空',
            trigger: 'blur'
          },
        ],
        description:[
          {
            required: true,
            message: '描述不能为空',
            trigger: 'blur'
          },
        ]
      }
    }
  },
  methods: {
    init(id) {
      this.id = id
      if (id === undefined) {
        this.mode = 'insert'
        this.visible = true
      } else {
        this.mode = 'edit'
        GetById(id)
          .then(res => {
            this.$set(this, 'form', res.data)
            this.visible = true
          })
      }
    },
    onClose() {
      this.$emit('reload')
    },
    cancel() {
      this.visible = false
    },
    submit(){
      this.$refs.form.validate(valid=>{
        if(valid){
          this[this.mode]()
        }
      });

    },
    insert(){
      create(this.form)
        .then(res=>{
          this.$message({
            type:"success",
            message:"新增成功",
            duration:500,
            onClose:()=>{
              this.cancel()
            }
          })
        })
    },
    edit(){
      UpdateInfo(this.form)
        .then(res=>{
          this.$message({
            type:"success",
            message:"修改成功",
            duration:500,
            onClose:()=>{
              this.cancel()
            }
          })
        })
    }
  }
}
</script>
