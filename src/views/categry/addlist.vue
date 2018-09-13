<template>
  <div>
    <h3>添加分类</h3>
    <div class="admin-wrap">
      <div class="item"><span>分类名：</span><el-input type="word" v-model="infoData.title"></el-input></div>
      <picup v-model="infoData.icon"></picup>
      <div class="btn"><el-button type="primary" @click="handleSave">确定</el-button></div>
    </div>
  </div>
</template>

<script>
  import picup from '@/components/pic'
    export default {
      components:{picup},
       data(){
         return{
           infoData:{
             title:'',
             icon:''
           },
         }
       },
      methods:{
        handleSave(){
          this.$axios.post(this.$api.getLists,this.infoData).then(res=>{
            if(res.code == 200){
              this.$message.success(res.msg)
              this.$router.push('/index/categorylist')
            }
          })
        }
      }
    }
</script>

<style scoped>

</style>
