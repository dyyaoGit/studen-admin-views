<template>
  <div>
    <h3>修改个人信息</h3>
    <div class="admin-wrap">
      <div class="item"><span>用户名：</span><el-input type="word" v-model="userInfo.username"></el-input></div>
      <div class="item"><span>昵称：</span><el-input type="word" v-model="userInfo.nickname"></el-input></div>
      <div class="item"><span>邮箱：</span><el-input type="email" v-model="userInfo.email"></el-input></div>
      <picup v-model="userInfo.avatar"></picup>
      <div class="item"><span>描述：</span><el-input type="textarea" v-model="userInfo.desc"></el-input></div>
      <div class="btn"><el-button type="primary" @click="handleSave">确定</el-button></div>
    </div>
  </div>
</template>

<script>
  import picup from '@/components/pic'
  import {mapState} from 'vuex'
  export default {
    data(){
      return{

      }
    },
    components:{picup},
    methods:{
      getImg(img){
        console.log(img);
        this.infoData.avatar = img
      },
      handleSave(){
          this.$axios.put(this.$api.changeinfo,this.userInfo).then(res=>{
            if(res.code == 200){
              this.$message({
                message: res.msg,
                type: 'success'
              });
            }
            this.$message.error(res.msg)
          })
      }
    },
    computed:{
      ...mapState(['userInfo'])
    }
  }
</script>

<style scoped lang="scss" src="@/style/admin/index.scss"></style>
