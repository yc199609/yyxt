<template>
  <el-dialog 
    :append-to-body="true" 
    :modal-append-to-body="false" 
    :visible.sync="visible" 
    :close-on-click-modal="false" 
    title="功能树" 
    @close="onClose"
  >
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
            <span>{{ node.label }}</span>
            <span>
              <el-button type="text" size="mini" @click.stop="viewDetail(data)">查看详情</el-button>
              <el-button type="text" size="mini" @click.stop="deleteDep(data)">删除</el-button>
            </span>
          </span>
        </el-tree>
      </el-card>
      <el-card>
        <div slot="header" class="cardHeader clearfix textCenter" style="font-size:18px;font-weight:700;">
          {{ mode==='edit'?"功能详情":"新增功能" }}
        </div>
        <el-form ref="form" :model="form">
          <el-col :span="12" class="parentIdBox">
            <el-form-item label="上级功能" prop="parentId">
              <div>
                <el-cascader
                  v-model="form.parentId"
                  :options="options"
                  :props="parentProp"
                  :show-all-levels="false"
                  clearable/>
              </div>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="功能名称" prop="name">
              <el-input v-model="form.name" :maxlength="30"/>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="功能代码" prop="code">
              <el-input v-model="form.code" :maxlength="30"/>
            </el-form-item>
          </el-col>
        </el-form>
      </el-card>
    </div>
    <div slot="footer" class="fnbuttonBox">
      <el-button class="btn">取消</el-button>
      <el-button type="primary">确定</el-button>
    </div>
  </el-dialog>
</template>
<script>
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
      mode: 'edit',
      form:{
        parentId: [],
        name: '',
        code: ''
      },
      options:[
        {
          id:"-1",
          code:"-1",
          name:'顶级功能',
          children:[
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
          ]
        },
      ],
      parentProp: {
        value: 'id',
        label: 'name',
        children: 'children',
        checkStrictly: true
      },
      defaultProps: {
        children: 'children',
        label: 'name'
      },
    }
  },
  methods:{
    init(id) {
      this.visible = true
    },
    onClose() {

    },
    insert() {
      this.mode = 'insert'
      this.form = {
        parentId: [],
        name: '',
        code: ''
      }
    },
    viewDetail(data) {
      this.$set(this,'form',data)
    },
    deleteDep() {

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