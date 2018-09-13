<template>
    <div id="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :current-page="currentPn"
        :total="100">
      </el-pagination>
    </div>
</template>

<script>
    export default {
      name:'pagination',
      props:{
        pn:{
          type:[String,Number]
        }
      },
      data(){
        return{
          currentPn:this.pn
        }
      },
      methods:{
        handleCurrentChange(val) {
          this.$emit('input',val)
        }
      },
      watch:{
        pn(val){
          this.currentPn = val
        }
      }
    }
</script>

<style>
  #pagination {
    float: right;
    margin-top: 20px;
  }
</style>
