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
      <el-tab-pane :disabled="step" label="选择模板指标" name="first">
        <el-form label-position="top">

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
            <el-select v-model="cmdIds" multiple placeholder="请选择">
              <el-option
                v-for="(item,index) in cmdList"
                :key="index"
                :label="item.cmdCode"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>

          <el-tabs v-model="activeCmd">
            <el-tab-pane v-for="item in cmdIds" :key='item' :label="cmdList.find(cur=>cur.id==item).cmdCode" :name="item.toString()">
   
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
            <el-input v-model="form2.viewCode" />
          </el-form-item>

          <el-form-item label="视图排序（越小越前）">
            <el-input v-model="form2.sort" />
          </el-form-item>

          <el-form-item label="描述">
            <el-input type="textarea" v-model="form2.remark">
            </el-input>
          </el-form-item>

          <el-form-item label="所选指标">
            <el-table :data="fieldsList" border>
              <el-table-column align="center" prop="id" label="序号" />
              <el-table-column align="center" prop="name" label="指标名称" />
              <el-table-column align="center" prop="code" label="指标代号" />

              <el-table-column label="指令" align="center" prop="cmdId">
                <template slot-scope="scope">
                  <div>
                    {{
                      cmdList.find(item=>item.id===scope.row.cmdId).cmdCode
                    }}
                  </div>
                </template>
              </el-table-column>

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
import { selectTable, common } from './mixin'
import { create } from '@api/instructions/template'
import { GetAll } from '@api/protocol/communication'  //获取全部通信协议
export default {
  mixins:[selectTable, common],
  data() {
    return {
      fieldsList:[],
      activeName: 'first',
      step: false,
      protocal:"",
      form2:{
        viewName:"",
        viewTypeId:'',
        remark:'',
        viewCode:'',
        maxNumber:undefined,
        minNumber:undefined,
        unit:undefined,
        sort:undefined
      },
    };
  },
  methods: {
    next(){
      this.step = true
      this.$nextTick(()=>{
        this.activeName = 'second'
      })
      let fieldsList = Object.keys(this.chooseData).reduce((per,next)=>per.concat(this.chooseData[next]),[])
      fieldsList = fieldsList.map(item=>({...item,fieldId:item.id}))
      this.$set(this,'fieldsList',[...fieldsList])
    },
    init() {
      this.visible = true
        GetAll()
          .then(res=>{
            this.$set(this,'protocalList',res.data)
          })
    },
    submit(){
      const cmdFields = this.formatter(this.fieldsList)
      const formdata = {
        ...this.form2,
        jsonData: JSON.parse(this.json),
        cmdFields
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
    },
  }
}
</script>

<style lang='scss' scoped>

</style>
