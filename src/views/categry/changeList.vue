<template>
  <div>
    <h3>修改分类</h3>
    <div class="admin-wrap">
      <div class="item"><span>作者：</span><el-input type="word" v-model="infoData.title"></el-input></div>
      <picup v-model="infoData.icon"></picup>
      <div class="item"><span>index：</span>
        <el-input-number v-model="infoData.index" :min="1"></el-input-number></div>
      <!--<div class="item"><span>book_id：</span><el-input type="email" v-model="infoData.book_id"></el-input></div>-->
      <!--<div class="item"><span>type：</span><el-input type="word" v-model="infoData.type"></el-input></div>-->
      <!--<div class="item"><span>描述：</span><el-input type="textarea" v-model="infoData.desc"></el-input></div>-->
      <div class="btn"><el-button type="primary" @click="handleSave">确定</el-button></div>
    </div>
  </div>
</template>

<script>
  import picup from '@/components/pic'
  export default {
    data(){
      return{
        infoData:{
          title:'',
          index:'',
          icon:''
        }
      }
    },
    components:{picup},
    methods:{
      getbook(){
        let id = this.$route.query.id
        this.$axios.get(`/category/${id}`).then(res=>{
          this.infoData = res.data
        })
      },
      handleSave(){
        let id = this.$route.query.id
        this.$axios.put(`/category/${id}`,this.infoData).then(res=>{
          if(res.code == 200){
            this.$message({
              message: res.msg,
              type: 'success'
            })
            this.$router.push('/index/categorylist')
          }
        })
      }
    },
    created(){
      this.getbook()
    }
  }
</script>

<style scoped lang="scss" src="@/style/admin/index.scss"></style>
