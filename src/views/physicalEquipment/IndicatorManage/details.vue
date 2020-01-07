<template>
  <el-dialog
    :append-to-body="true" 
    :modal-append-to-body="false" 
    :visible.sync="visible" 
    :close-on-click-modal="false" 
    :title="mode=='insert'? '新增':'修改'" 
    @close="onClose"
  >
    <el-form>
      <el-form-item label="协议">
        <el-select v-model="protocal" @change="protocalChange">
          <el-option 
            v-for="(item,index) in protocalList" 
            :key="index"
            :label="item.protocalName"
            :value="item.id" 
          />
        </el-select>
      </el-form-item>
      <el-form-item label="指令">
        <el-select v-model="cmds"  multiple placeholder="请选择">
          <el-option
            v-for="item in cmdList"
            :key="item.id"
            :label="item.cmdCode"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-tabs v-model="activeCmd">
        <el-tab-pane v-for="item in cmds" :key="item" :label="(cmdList.find(cur=>cur.id==item)||{}).cmdCode" :name="item.toString()">

          <el-table
            v-if="activeCmd==item"
            :ref="'multipleTable' + item"
            :data="codeList"
            class="table"
            border
            @select="handleChoose"
            @select-all="handleChooseAll"
          >
            <el-table-column type="selection" width="40"/>
            <el-table-column label="指标代码" align="center" prop="code"/>
            <el-table-column label="指标名称" align="center" prop="name"/>
          </el-table>

          <el-pagination
            :current-page="pageIndex"
            :page-sizes="[10 ,20, 30, 40, 50, 100]"
            :page-size="pageSize"
            :total="totalCount"
            layout="total, prev, pager, next, jumper"
            @current-change="handleCurrentChange"
          />

        </el-tab-pane>
      </el-tabs>
    </el-form>
    <div slot="footer">
      <el-button @click="cancel">
        取消
      </el-button>
      <el-button @click="submit">
        确定
      </el-button>
    </div>
  </el-dialog>
</template>
<script>
import { GetByCmdId } from '@api/instructions/field' //根据指令id,获取指令字段
import { GetAll } from '@/api/protocol/communication' //获取全部通信协议
import { GetByProtocalId } from '@api/protocol/cmd' //根据协议id获取指令
import { create, GetById, UpdateInfo } from '@api/physicalEquipment/IndicatorManage'

export default {
  name:"Detail",
  data(){
    return {
      id:undefined,
      mode:"insert",
      activeCmd:'',
      visible: false,
      protocalList: [],
      protocal:undefined,
      cmdList:[],
      cmds:[],
      choose: {},
      codeList:[],
      pageIndex: 1,
      pageSize: 10,
      totalCount: 30,
    }
  },
  watch:{
    activeCmd(val,oldVal) {
      this.pageIndex = 1
      this.cmdChange(val)
    },
    cmds:function(val,oldval) {
      if(val.length>oldval.length){
        var c = val.filter(function(v){ return oldval.indexOf(v) == -1 })
        this.choose[c] = []
        if(oldval.length==0){
          this.activeCmd = c.toString()
        }
      }else{
        var d = oldval.filter(function(v){ return val.indexOf(v) == -1 })
        delete this.choose[d]
      }
    }
  },
  methods:{
    submit(){
      const f = Object.keys(this.choose)
      const s = f.reduce((pre,next)=>{
        return pre.concat(this.choose[next])
      },[])
      const sdd = s.map(item=>({
        cmdId:item.cmdId,
        fieldId:item.id,
      }))
      if(this.mode=='insert'){
        create({
          protocalId:this.protocal,
          name:this.name,
          items:sdd
        })
          .then(res=>{
            this.$message({
              type:"success",
              message:'新增成功',
              duration:500,
              onClose:()=>{
                this.visible = false
              }
            })
          })
      }else{
        UpdateInfo({
          id:this.id,
          protocalId:this.protocal,
          name:this.name,
          items:sdd
        })
          .then(res=>{
            this.$message({
              type:"success",
              message:'修改成功',
              duration:500,
              onClose:()=>{
                this.visible = false
              }
            })
          })
      }
    },
    onClose() {
      this.$emit('reload')
    },
    cancel() {
      this.visible = false
    },
    handleCurrentChange(val) {
      this.pageIndex = val
      this.cmdChange(this.activeCmd)
    },
    toggleSelection(rows) {
      const intersection = this.codeList.filter(v => rows.map(item => item.id.toString()).includes(v.id.toString()))
      intersection.forEach(row => {
        this.$nextTick(() => {
          this.$refs['multipleTable' + this.activeCmd][0].toggleRowSelection(row, true)
        })
      })
    },
    cmdChange(v){
      GetByCmdId({
        cmdId: v,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      })
        .then(res=>{
          this.$set(this, 'codeList', res.data.items)
          this.totalCount = res.data.totalCount
          this.pageIndex = res.data.pageIndex
          this.pageSize = res.data.pageSize
          this.toggleSelection(this.choose[v])
        })
    },
    handleChooseAll(selection) {
      const chooseIds = this.choose[this.activeCmd].map(item => item.id)
      if (selection.length > 0) { // 全选
        const intersection = selection.filter(v => !chooseIds.includes(v.id))
        this.choose[this.activeCmd] = this.choose[this.activeCmd].concat(intersection)
      } else { // 全取消
        this.choose[this.activeCmd] = this.choose[this.activeCmd].filter(v => !this.codeList.map(item => item.id).includes(v.id))
      }
    },
    handleChoose(selection, row) {
      // 判断是新增选中还是取消选中
      const flag = selection.some((item) => item.id == row.id)
      if (flag) {
        const ishas = this.choose[this.activeCmd].some(item => item.id == row.id)
        if (!ishas) {
          this.choose[this.activeCmd].push(row)
        }
      } else {
        const index = this.choose[this.activeCmd].findIndex((item) => item.id == row.id)
        this.choose[this.activeCmd].splice(index, 1)
      }
    },
    init(id){
      this.visible = true
      if(id){
        this.id = id
        this.mode = 'edit'
        GetById(id)
          .then(res=>{
            this.name = res.data.name
            res.data.items.forEach(item=>{
              if(!this.cmds.includes(item.cmdId)){
                this.cmds.push(item.cmdId.toString())
              }
            })
            this.activeCmd = (this.cmds[0]||'').toString()
            this.protocal = res.data.protocalId
            res.data.items.forEach(item=>{
              if(!this.choose[item.cmdId]) {
                this.choose[item.cmdId] = [].concat({...item,id:item.fieldId})
              } else {
                this.choose[item.cmdId].push({...item,id:item.fieldId})
              }
            })
            GetAll()
              .then(res=>{
                this.$set(this,'protocalList',res.data)
              })
            GetByProtocalId(this.protocal)
              .then(res=>{
                this.$set(this,'cmdList',res.data.map(item=>({...item,id:item.id.toString()})))
              })
          })
      }else{
        GetAll()
          .then(res=>{
            this.$set(this,'protocalList',res.data)
          })
      }
    },
    protocalChange(e){
      GetByProtocalId(e)
        .then(res=>{
          this.$set(this,'cmdList',res.data)
          this.codeList = []
          this.cmds = []
          this.choose = {}
        })
    }
  },
}
</script>