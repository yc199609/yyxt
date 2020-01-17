<template>
  <div class="contain">
    <Search :show-btn="true" @search="search" @changeKeyword="changeKeyword">
      <el-button type="warning" plain size="small" icon="el-icon-plus" @click="insert">新增</el-button>
    </Search>
  
    <el-card>
      <el-table :data="tableData">
        <el-table-column label="名称" prop="name" />
        <el-table-column label="操作" >
          <template slot-scope="scope">
            <el-button @click="edit(scope.row.id)">修改</el-button>
            <el-button @click="del(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-pagination
      :current-page="pageIndex"
      :page-sizes="[10 ,20, 30, 40, 50]"
      :page-size="pageSize"
      :total="totalCount"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      />
    <Detail v-if="detailVisible" ref="detail" @reload='hidden'/>
  </div>
</template>
<script>
import Detail from './details'
import { GetList, del } from '@/api/templateImport'
import Search from '@/components/Search'
import { pagging, keyword } from '@/mixin'
export default {
  data(){
    return {
      tableData:[],
      detailVisible:false
    }
  },
  components: {
    Search,
    Detail
  },
  mixins: [pagging, keyword],
  mounted(){
    this.init()
  },
  methods:{
    search() {
      this.pageIndex = 1
      this.init()
    },
    hidden(){
      this.detailVisible = false
      this.init()
    },
    init(){
      GetList({
        keyword: this.keyword,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      }).then(res=>{
        this.$set(this,'tableData',res.data.items)
      })
    },
    edit(id){
      this.detailVisible = true
      this.$nextTick(()=>{
        this.$refs.detail.init(id)
      })
    },
    del(id){
      del(id)
        .then(res=>{
          this.$message({
            type:"success",
            message:'删除成功',
            duration:500,
            onClose:()=>{
              this.pageIndex = 1
              this.init()
            }
          })
        })
    },
    insert(){
      this.detailVisible = true
      this.$nextTick(()=>{
        this.$refs.detail.init()
      })
    }
  }
}
</script>
<style lang="scss">
  .contain{
    padding: 1vw 3vw 0;
  }
</style>
