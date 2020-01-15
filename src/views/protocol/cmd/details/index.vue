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
      <el-form-item label="指令名称" prop="cmdName">
        <el-input v-model.trim="form.cmdName" />
      </el-form-item>
      <el-form-item label="指令协议" prop="cmdCode">
        <el-input v-model.trim="form.cmdCode" />
      </el-form-item>
      <el-form-item label="所属协议" prop="protocalId">
        <el-select v-model.trim="form.protocalId" placeholder="请选择">
          <el-option
            v-for="item in communication"
            :key="item.id"
            :label="item.protocalName"
            :value="item.id">
          </el-option>
        </el-select>
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
import { GetAll } from '@/api/protocol/communication'
import { GetById, UpdateInfo, create } from '@/api/protocol/cmd'
export default {
  data() {
    return {
      visible: false,
      mode: 'insert',
      id: '',
      form: {},
      communication: [],
      rules:{
        cmdName:[
          {
            required: true,
            message: '指令名称不能为空',
            trigger: 'blur'
          },
        ],
        cmdCode:[
          {
            required: true,
            message: '指令协议不能为空',
            trigger: 'blur'
          },
        ],
        protocalId:[
          {
            required: true,
            message: '所属协议不能为空',
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
  mounted(){
    GetAll()
      .then(res=>{
        this.communication = res.data
      })
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
