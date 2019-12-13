<template>
  <el-dialog
    :append-to-body="true" 
    :modal-append-to-body="false" 
    :visible.sync="visible" 
    :close-on-click-modal="false" 
    title="新增" 
    @close="onClose"
    >
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="选择模板指标" name="first">
        <el-form ref="form1" :model="form1" label-position="top" :rules="rules1">

          <el-form-item label="选择协议" prop="">
            <el-select v-model="protocal" placeholder="请选择" @change="protocalChange">
              <el-option
                v-for="item in protocalList"
                :key="item.id"
                :label="item.protocalName"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="选择指令">
            <el-select v-model="cmd" multiple placeholder="请选择">
              <el-option
                v-for="(item,index) in cmdList"
                :key="index"
                :label="item.cmdCode"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>

          <el-tabs v-model="activeCmd">
            <el-tab-pane v-for="item in cmd" :key='item' :label="cmdList.find(cur=>cur.id==item).cmdCode" :name="item.toString()">
   
              <el-table
                v-if="activeCmd==item"
                :ref="'multipleTable'+item"
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
                @current-change="handleCurrentChange"/>

            </el-tab-pane>
          </el-tabs>

        </el-form>
      </el-tab-pane>

      <el-tab-pane v-if="step" label="第二步" name="second">
        <el-form ref="form2" :model="form2" label-position="top">
          <el-form-item label="视图名称" prop="viewName">
            <el-input v-model="form2.viewName"></el-input>
          </el-form-item>
          <el-form-item label="视图类型">
            <el-select v-model="form2.viewTypeId" placeholder="请选择">
              <el-option
                label="状态视图"
                :value="10">
              </el-option>
              <el-option
                label="温度曲线"
                :value="100">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="描述">
            <el-input type="textarea" v-model="form2.remark">
            </el-input>
          </el-form-item>
          <el-form-item label="所选指标">
            <el-table :data="Object.keys(yc).reduce((per,next)=>per.concat(yc[next]),[])" border>
              <el-table-column align="center" prop="id" label="序号" />
              <el-table-column align="center" prop="name" label="指标名称" />
              <el-table-column align="center" prop="code" label="指标代号" />
            </el-table>
          </el-form-item>
        </el-form>
        <div v-if="activeName==='second'">
          <Json-editor ref="jsonEditor" v-model="json" />
        </div>
      </el-tab-pane>
    </el-tabs>
    
    <div slot="footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button @click="next" v-if="activeName==='first'">下一步</el-button>
      <el-button @click="submit" v-else>确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { create } from '@api/instructions/template'
import { GetAll } from '@api/protocol/communication'  //获取全部通信协议
import { GetByProtocalId } from '@api/protocol/cmd' //根据协议id获取指令
import { GetByCmdId } from '@api/instructions/field' //根据指令id,获取指令字段

import JsonEditor from '@/components/jsonEditor'

export default {
  data() {
    return {
      activeCmd: '',
      json: {},
      visible: false,
      activeName: 'first',
      step: false,
      protocalList:[],
      cmdList:[],
      codeList:[],
      protocal:"",
      cmd:[],
      form1:{},
      form2:{
        viewName:"",
        viewTypeId:'',
        remark:''
      },
      rules1:{},
      chooseArray: [],
      pageIndex: 1,
      pageSize: 10,
      totalCount: 30,
      yc:{},
      console:console
    };
  },
  components:{
    JsonEditor
  },
  watch:{
    cmd:function(val,oldval){
      if(val.length>oldval.length){
        var c =  val.filter(function(v){ return oldval.indexOf(v) == -1 })
        this.yc[c] = []
        if(oldval.length==0){
          this.activeCmd = c.toString()
        }
      }else{
        var d = oldval.filter(function(v){ return val.indexOf(v) == -1 })
        delete this.yc[d]
      }
    },
    activeCmd:function(val,oldval){
      this.cmdChange()
    }
  },
  methods: {
    cmdChange(){
      GetByCmdId({
        cmdId:this.activeCmd,
        pageIndex:this.pageIndex,
        pageSize:this.pageSize
      })
        .then(res=>{
          this.$set(this, 'codeList', res.data.items)
          this.totalCount = res.data.totalCount
          this.pageIndex = res.data.pageIndex
          this.pageSize = res.data.pageSize
          this.toggleSelection(this.yc[this.activeCmd])
        })
    },
    next(){
      this.step = true
      this.$nextTick(()=>{
        this.activeName = 'second'
      })
    },
    handleCurrentChange(val) {
      this.pageIndex = val
      this.cmdChange()
    },
    handleChooseAll(selection) {
      const chooseIds = this.yc[this.activeCmd].map(item => item.id)
      if (selection.length > 0) { // 全选
        const intersection = selection.filter(v => !chooseIds.includes(v.id))
        this.yc[this.activeCmd] = this.yc[this.activeCmd].concat(intersection)
      } else { // 全取消
        this.yc[this.activeCmd] = this.yc[this.activeCmd].filter(v => !this.codeList.map(item => item.id).includes(v.id))
      }
    },
    handleChoose(selection, row) {
      // 判断是新增选中还是取消选中
      const flag = selection.some((item) => item.id === row.id)
      if (flag) {
        const ishas = this.yc[this.activeCmd].some(item => item.id === row.id)
        if (!ishas) {
          this.yc[this.activeCmd].push(row)
        }
      } else {
        const index = this.yc[this.activeCmd].findIndex((item) => item.id === row.id)
        this.yc[this.activeCmd].splice(index, 1)
      }
    },
    toggleSelection(rows) {
      const intersection = this.codeList.filter(v => rows.map(item => item.id).includes(v.id))
      intersection.forEach(row => {
        this.$nextTick(() => {
          this.$refs['multipleTable' + this.activeCmd][0].toggleRowSelection(row, true)
        })
      })
    },
    protocalChange(e){
      GetByProtocalId(e)
        .then(res=>{
          this.$set(this,'cmdList',res.data)
          this.codeList = []
          this.cmd = ''
          this.chooseArray = []
        })
    },
    init() {
      this.visible = true
        GetAll()
          .then(res=>{
            this.$set(this,'protocalList',res.data)
          })
    },
    onClose() {
      this.$emit('reload')
    },
    cancel() {
      this.visible = false
    },
    submit(){
      const array = Object.keys(this.yc).reduce((per,next)=>per.concat({cmdId:next,fieldIds:this.yc[next].map(item=>item.id)}),[])
      const formdata = {
        ...this.form2,
        jsonData: JSON.parse(this.json),
        cmdFields:array
      }

      create(formdata)
        .then(res=>{
          this.$message({
            type: "success",
            message: "新增成功",
            duration: 500,
            onClose:()=>{
              this.cancel()
            }
          })
        })
    }
  }
}
</script>

<style lang='scss' scoped>

</style>