<template>
 <div class="fnBox">
    <el-card>
      <div slot="header" class="cardHeader clearfix">
        <span style="font-size:18px;font-weight:700;">功能列表</span>
        <el-button style="float:right;padding:3px 0;" type="text" @click="insert">
          <i class="el-icon-plus"/>新增功能
        </el-button>
      </div>
      <el-tree :data="data" :props="defaultProps">
        <span slot-scope="{ node, data }" class="custom-tree-node">
          <span>{{ data.menuName?data.menuName:data.functionName }}</span>
          <span>
            <el-button type="text" size="mini" @click.stop="viewDetail(data)">查看详情</el-button>
            <el-button type="text" size="mini" @click.stop="deleteDep(data)">删除</el-button>
          </span>
        </span>
      </el-tree>
    </el-card>
    <el-card v-if="mode.length>0">
      <div slot="header" class="cardHeader clearfix textCenter" style="font-size:18px;font-weight:700;">
        {{ mode==='edit'?"功能详情":"新增功能" }}
      </div>
      <el-form ref="form" :model="form" label-position="top">
        <el-col :span="12" class="parentIdBox">
          <el-form-item label="上级功能" prop="fucntionParentId">
            <div>
              <el-cascader
                v-model="form.functionParentId"
                :options="options"
                :props="parentProp"
                :show-all-levels="false"
                clearable/>
            </div>
          </el-form-item>
        </el-col>

        <el-col :span="12" class="parentIdBox">
          <el-form-item label="上级菜单" prop="menuParentId">
            <div>
              <el-cascader
                v-model="form.menuParentId"
                :options="options1"
                :props="parentProp1"
                :show-all-levels="false"
                clearable/>
            </div>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="功能名称" prop="functionName">
            <el-input v-model="form.functionName" :maxlength="30"/>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="功能代码" prop="functionCode">
            <el-input v-model.number="form.functionCode" :maxlength="30"/>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="菜单名称" prop="menuName">
            <el-input v-model="form.menuName" :maxlength="30"/>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="菜单代码" prop="menuCode">
            <el-input v-model.number="form.menuCode" :maxlength="30"/>
          </el-form-item>
        </el-col>
      </el-form>
    </el-card>
    <div>
      <el-button v-if="mode === 'insert'" @click="submitInsert">
        确定新增
      </el-button>
      <el-button v-else-if="mode === 'edit'" @click="submitModify">
        确定修改
      </el-button>
    </div>
  </div>
</template>
<script>
import { getMenuFunction, updateMenuFunction, deleteMenuFunction, createMenuFunction } from '@/api/fnTree'
export default {
  data(){
    return {
      visible: false,
      data: [
        {
          id: "01",
          name: "人事管理",
          code: "01",
          parentId: "-1",
          children:[
            {
              id:"0101",
              name:"员工",
              code: "0101",
              parentId:"01",
              children:[]
            },
            {
              id:"0102",
              name:"部门",
              code: "0102",
              parentId:"01",
              children:[]
            },
            {
              id:"0103",
              name:"角色",
              code: "0103",
              parentId:"01",
              children:[]
            },
          ]
        },
        {
          id:"02",
          name: "设备管理",
          code: "02",
          parentId: "-1",
          children:[
            {
              id:"0201",
              name:'设备机构',
              code:"0201",
              parentId:"02",
              children:[]
            }
          ]
        },
        {
          id:"03",
          name: "设备数据",
          code: "03",
          parentId: "-1"
        }
      ],
      mode: '',
      form:{
      },
      options:[
        {
          functionId:-1,
          functionName:'顶级功能',
          nodes:[]
        },
      ],
      options1:[
        {
          menuId:-1,
          menuName:"顶级菜单",
          nodes:[]
        }
      ],
      parentProp: {
        value: 'functionId',
        label: 'functionName',
        children: 'nodes',
        checkStrictly: true
      },
      parentProp1: {
        value: 'menuId',
        label: 'menuName',
        children: 'nodes',
        checkStrictly: true
      },
      defaultProps: {
        children: 'nodes',
        label: 'menuName'
      },
    }
  },
  mounted(){
    this.init()
  },
  methods:{
    init(){
      getMenuFunction()
        .then(res=>{
          this.data = res.data.nodes
          this.options[0].nodes = JSON.parse(JSON.stringify(res.data.nodes))
          this.options1[0].nodes = JSON.parse(JSON.stringify(res.data.nodes))
        })
    },
    insert() {
      this.mode = 'insert'
      this.form = {}
    },
    viewDetail(data) {
      this.$set(this,'form',JSON.parse(JSON.stringify(data)))
      this.mode = 'edit'
    },
    deleteDep(data) {
      deleteMenuFunction({
        menuId:data.menuId,
        functionId:data.functionId
      }).then(res=>{
        this.$message({
          type: "success",
          message: "删除成功",
          duration: 500,
          onClose: () => {
            this.init()
          }
        });
      })
    },
    submitInsert(){
      const functionParentId = this.form.functionParentId instanceof Array?this.form.functionParentId[this.form.functionParentId.length-1]:this.form.functionParentId
      let opType
      if(this.form.menuName&&this.form.functionName){
        opType = 3
      }else if(this.form.menuName){
        opType = 1
      }else if(this.form.functionName){
        opType = 2
      }

      createMenuFunction({
        ...this.form,
        functionParentId,
        system:1,
        opType
      }).then(res=>{
        this.$message({
          type: "success",
          message: "新增成功",
          duration: 500,
          onClose: () => {
            this.init()
          }
        });
      })
    },
    submitModify(){
      let opType
      if(this.form.menuName&&this.form.functionName){
        opType = 3
      }else if(this.form.menuName){
        opType = 1
      }else if(this.form.functionName){
        opType = 2
      }
      let data = {...this.form,opType}
      delete data.nodes
      updateMenuFunction(data)
        .then(res=>{
          this.$message({
            type: "success",
            message: "修改成功",
            duration: 500,
            onClose: () => {
              this.init()
            }
          });
        })
    }
  }
}
</script>
<style lang="scss" scoped>
  .fnBox{
    display: flex;
    flex-direction: row;
    // justify-content: space-between;
    >div{
      flex:1;
    }
    >div:first-child{
      margin-right: 10px;
    }
  }
  .fnbuttonBox{
    display: flex;
    justify-content: center;
    .btn{
      margin-right: 20px;
    }
  }
  .custom-tree-node{
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
</style>
