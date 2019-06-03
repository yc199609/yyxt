<template>
  <div class="container">
    <el-row :gutter="20">
      <!-- 左边的树 -->
      <el-col :span="8">
        <el-card style="min-height:80vh;">
          <div slot="header" class="cardHeader clearfix">
            <span style="font-size:18px;font-weight:700;">部门列表</span>
            <el-button style="float:right;padding:3px 0;" type="text" @click="insert">
              <i class="el-icon-plus"/> 新增部门
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
      </el-col>
      <!-- 右边的表 -->
      <el-col :span="16">
        <el-card style="min-height:80vh;">
          <div slot="header" class="cardHeader clearfix textCenter">
            {{ mode==='edit'?'部门详情':'新增部门' }}
          </div>
          <el-form ref="form" :model="form" :rules="rules">

            <el-col :span="12">
              <el-form-item label="上级部门" prop="parentId">
                <el-input v-model="form.parentId" :maxlength="30"/>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="部门名称" prop="name">
                <el-input v-model="form.name" :maxlength="30"/>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="部门代码" prop="code">
                <el-input v-model="form.code" :maxlength="30"/>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="外线电话" prop="contactPhone">
                <el-input v-model="form.contactPhone" :maxlength="30"/>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="内线电话" prop="phone">
                <el-input v-model="form.phone" :maxlength="30"/>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="电子邮件" prop="email">
                <el-input v-model="form.email" :maxlength="30"/>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="部门性质" prop="properties">
                <el-input v-model="form.properties" :maxlength="30"/>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="传真" prop="fax">
                <el-input v-model="form.fax" :maxlength="30"/>
              </el-form-item>
            </el-col>

            <el-col :span="24">
              <el-form-item label="地址" prop="address">
                <el-input v-model="form.address" :maxlength="30"/>
              </el-form-item>
            </el-col>

            <el-col :span="24">
              <el-form-item style="text-align:center;">
                <el-button :type="mode==='edit'?'warning':'primary'" @click="submit"> {{ mode==='edit'?'确定修改':"确定新增" }}</el-button>
              </el-form-item>
            </el-col>

          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { GetAll, updateinfo, Create, Delete } from '@api/Personnel/department'
import { success } from '@/mixin'
import validate from './validate'
export default {
  mixins: [success, validate],
  data() {
    return {
      mode: 'edit',
      data: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      form: {
        parentId: '',
        name: '',
        code: '',
        phone: '',
        contactPhone: '',
        email: '',
        properties: '',
        fax: '',
        address: ''
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      GetAll()
        .then(res => {
          this.data = res.data
          console.log(this.data)
        })
    },
    viewDetail(data) {
      this.$refs.form.resetFields()
      this.mode = 'edit'
      const obj = JSON.parse(JSON.stringify(data))
      this.$set(this, 'form', obj)
    },
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          switch (this.mode) {
            case 'edit':
              updateinfo(this.form)
                .then(res => {
                  this.success('修改成功')
                })
              break
            case 'insert':
              Create({ ...this.form, remark: 'sds' })
                .then(res => {
                  this.success('新增成功')
                })
              break
          }
        }
      })
    },
    insert() {
      this.$refs.form.resetFields()
      this.mode = 'insert'
    },
    deleteDep(data) {
      this.$confirm('此操作将删除改部门, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        Delete(data.id)
          .then(res => {
            this.success('删除成功')
          })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .container {
    padding: 1vw 3vw 0;
    .custom-tree-node {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      padding-right: 8px;
    }
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  .textCenter{
    font-size: 18px;
    font-weight: 700;
    text-align: center;
  }
  .cardHeader{
    height: 26px;
  }
</style>
