<template>
  <el-dialog
    :append-to-body="true" 
    :modal-append-to-body="false" 
    :visible.sync="visible" 
    :close-on-click-modal="false" 
    title="视图模板编辑" 
    @close="onClose"
  >
    <el-form ref="form" :model="form" label-position="top">
      <el-form-item label="视图名称" prop="viewName" >
        <el-input v-model="form.viewName" />
      </el-form-item>

      <el-form-item label="视图类型" prop="viewTypeId" >
        <el-select v-model="form.viewTypeId" placeholder="请选择">
          <el-option
            label="状态视图"
            :value="10">
          </el-option>
          <el-option
            label="曲线视图"
            :value="100">
          </el-option>
          <el-option
            label="看板视图"
            :value="200">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="视图编码">
        <el-input v-model="form.viewCode" />
      </el-form-item>

      <el-form-item label="描述">
        <el-input type="textarea" v-model="form.remark" />
      </el-form-item>

      <el-form-item label="视图排序（越小越前）">
        <el-input v-model="form.sort" />
      </el-form-item>

      <el-form-item label="所选协议">
        <el-select :disabled="!tabsView" v-model="form.protocalId"  placeholder="请选择" @change="protocalChange">
          <el-option
            v-for="item in protocalList"
            :key="item.id"
            :label="item.protocalName"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="所选指令">
        <el-select :disabled="!tabsView" v-model="cmdIds" multiple placeholder="请选择">
          <el-option
            v-for="item in cmdList"
            :key="item.id"
            :label="item.cmdCode"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-tabs v-model="activeCmd" v-if="tabsView">
        <el-tab-pane 
          v-for="item in cmdIds" 
          :key="item" 
          :label="(cmdList.find(cur=>cur.id==item)||{}).cmdCode" 
          :name="item.toString()"
          >

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

      <el-table v-else :data="fieldsList" border>
        <el-table-column label="指令" align="center" prop="cmdId">
          <template slot-scope="scope">
            <div>
              {{
                cmdList.find(item=>item.id===scope.row.cmdId).cmdCode
              }}
            </div>
          </template>
        </el-table-column>

        <el-table-column label="指标代码" align="center" prop="fieldCode"/>
        <el-table-column label="指标名称" align="center" prop="fieldName"/>

        <el-table-column label="数值上限" align="center" prop="maxNumber">
          <template slot-scope="scope">
            <el-input v-model="scope.row.maxNumber" />
          </template>
        </el-table-column>

        <el-table-column label="数值下限" align="center" prop="minNumber">
          <template slot-scope="scope">
            <el-input v-model="scope.row.minNumber" />
          </template>
        </el-table-column>

        <el-table-column label="数值单位" align="center" prop="unit">
          <template slot-scope="scope">
            <el-input v-model="scope.row.unit" />
          </template>
        </el-table-column>

      </el-table>

      <el-button v-if="tabsView" @click="fieldsSubmit">
        确定指标
      </el-button>

      <div>
        <Json-editor ref="jsonEditor" v-model="json" />
      </div>
    </el-form>
    <div slot="footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button @click="submit">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { selectTable, common } from './mixin'
import { UpdateInfo,GetById } from '@api/instructions/template'
import { GetByProtocalId } from '@api/protocol/cmd'
import { GetAll } from '@api/protocol/communication'  //  获取全部通信协议
import { GetByCmdId, GetCmdFieldByViewId } from '@api/instructions/field' //  根据指令id,获取指令字段
export default {
  mixins:[selectTable, common],
  data(){
    return{
      tabsView:true,
      form:{
        protocalId:'',
        viewName:"",
        viewTypeId:'',
        remark:"",
        maxNumber:undefined,
        minNumber:undefined,
        unit:undefined,
        sort:undefined
      },
      fieldsList:[],
      viewId:undefined
    }
  },
  methods:{
    fieldsSubmit(){
      // 确定指标 根据viewId获取指标列表 与之前根据cmdid获取的指标列表进行比对
      let cmdFields = []
      Object.keys(this.chooseData)
        .forEach(item => {
          this.chooseData[item].forEach(cur=>{
            const obj = {
              ...cur,
              cmdId:Number(item),
              ...cur.name && {
                fieldName:cur.name
              },
              ...cur.code && {
                fieldCode:cur.code,
              },
              fieldId:cur.id
            }
            cmdFields.push(obj)
          })
        })
        if(!cmdFields||cmdFields.length<=0){
          this.$message({
            type: 'error',
            message: '请选择指标'
          })
          return
        }
      GetCmdFieldByViewId(this.viewId)
        .then(res=>{
          res.data.item2.forEach(item => {
            let dirtyData = cmdFields.find(cur=>cur.fieldId == item.id)
            dirtyData = {
              ...dirtyData,
              ...item
            }
          })
          this.$set(this, 'fieldsList',[...cmdFields])
          this.tabsView = false
        })
    },
    init(id){
      this.viewId = id
      this.visible = true
      GetById(id)
        .then(res=>{
          res.data.cmdFields.forEach(item=>{
            this.cmdIds.push(item.cmdId)
          })
          this.activeCmd = (this.cmdIds[0]||'').toString()
          this.$set(this,'form',res.data)
          this.json = JSON.parse(res.data.jsonData,null,0)
          res.data.cmdFields.forEach(item=>{
            this.chooseData[item.cmdId] = item.fields.map(cur=>({...cur,id:cur.fieldId}))
          })
          GetAll()
            .then(res=>{
              this.$set(this,'protocalList',res.data)
            })
          GetByProtocalId(this.form.protocalId)
            .then(res=>{
              this.$set(this,'cmdList',res.data)
            })
        })
    },
    submit(){
      if(this.tabsView){
        this.$message({
          type:"error",
          message:"请确认字段",
          duration:500
        })
        return
      }

      let cmdFields = this.formatter(this.fieldsList)

      const data = {
        ...this.form,
        jsonData:JSON.parse(this.json),
        cmdFields:cmdFields
      }
      UpdateInfo(data)
        .then(res=>{
          this.$message({
            type: "success",
            message: "修改成功",
            duration: 500,
            onClose:()=>{
              this.cancel()
            }
          })
        })
    },
  }
}
</script>>
