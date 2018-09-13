<template>
  <div>
    <h3>添加管理员</h3>
    <div class="admin-wrap">
      <div class="item"><span>用户名：</span><el-input type="word" v-model="infoData.username"></el-input></div>
      <div class="item"><span>昵称：</span><el-input type="word" v-model="infoData.nickname"></el-input></div>
      <div class="item"><span>邮箱：</span><el-input type="email" v-model="infoData.email"></el-input></div>
      <picup @img="getImg"></picup>
      <div class="item"><span>密码：</span><el-input type="password" v-model="infoData.password"></el-input></div>
      <div class="item"><span>确认密码：</span><el-input type="password" v-model="checkpassword"></el-input></div>
      <div class="item"><span>描述：</span><el-input type="textarea" v-model="infoData.desc"></el-input></div>
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
          avatar:'',
          username:'',
          nickname:'',
          desc:'',
          password:'',
          email:''
        },
        checkpassword:''
      }
    },
     components:{picup},
      methods:{
        getImg(img){
          console.log(img);
          this.infoData.avatar = img
        },
        handleSave(){
          if(this.infoData.password == this.checkpassword ){
            this.$axios.post(this.$api.user,this.infoData).then(res=>{
              console.log(res);
              if(res.code == 200){
                this.$message({
                  message: res.msg,
                  type: 'success'
                });
                this.$router.go(-1)
              }
              this.$message.error(res.msg)
            })
          }else{
            this.$message.error('两次输入的密码不一致')
          }
        }
      }
    }
</script>

<style scoped lang="scss" src="@/style/admin/index.scss"></style>
