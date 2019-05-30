<template>
  <section class="conditional-query-container" style="margin-top: .5rem">
    <section class="query-wrapper-row">
      <section class="query-wrapper-row-item ">
        <section class="label-text">复合筛选</section>
        <section>
          <el-input
            @change="changeKeyword"
            placeholder="请输入关键字搜索"
            @keyup.enter.native="search"
            size="small"
            v-model="keyword"
            :clearable="true"
          ></el-input>
        </section>
      </section>

      <el-button type="success" plain size="small" icon="el-icon-search" @click="search">搜索</el-button>
      <slot></slot>
    </section>
  </section>
</template>
<style lang="scss" scoped>
  /*查询条件样式区*/
  .conditional-query-container {
    padding: 1rem;
    border: 1px solid #e4e7ed;
    border-radius: 0.3rem;
    margin-bottom: 20px;
    background-color: #fff;
    .query-wrapper-row{
      display: flex;
      display: -webkit-flex;
      align-items: flex-end;
      font-size: 0.875rem;
      height: 3.5rem;

      &:not(:last-child){
        margin-bottom: 1rem;
      }

      .query-wrapper-row-left{
        display: -webkit-inline-flex;
        display: inline-flex;
        justify-content: flex-start;
        align-items: flex-end;
        width: 6%;
      }

      .query-wrapper-row-right{
        margin-right: 1rem;
        display: flex;
        display: -webkit-flex;
        justify-content: flex-start;
      }
    }
    .query-wrapper-row-item{
      height: 3.5rem;
      display: inline-flex;
      display: -webkit-inline-flex;
      flex-direction: column;
      justify-content: flex-end;
      padding-right: 1rem;

      &:last-child{
        padding-right: 0;
      }
      
      .label-text{
        color: #c0c4cc;
        font-size: 0.75rem;
        padding-bottom: 0.3rem;
      }
    }
  }
</style>
<script>
export default {
  name:'Search',
  data(){
    return{
      keyword:''
    }
  },
  methods:{
    search(){
      this.$emit('changeKeyword',this.keyword)
      this.$emit("search")
    },
    changeKeyword(){
      this.$emit('changeKeyword',this.keyword)
    }
  }
}
</script>