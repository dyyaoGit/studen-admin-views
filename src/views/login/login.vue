<template>
    <div class="login-container">
      <div class="login-form">
        <h2>欢迎使用云书后台管理</h2>
        <el-form label-width="100px" class="loginForm">
          <el-form-item label="用户名" prop="username">
            <el-input type="word" v-model="login.username" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="login.pass" auto-complete="off"></el-input>
          </el-form-item>
          <el-button type="primary" @click="handeLogin">登录</el-button>
        </el-form>
      </div>
    </div>
</template>

<script>
    export default {
       data(){
         return{
           login:{
             username:'admin',
             pass:'admin'
           }
         }
       },
      methods:{
        handeLogin(){
          let params = {
            username:this.login.username,
            password:this.login.pass
          }
          this.$axios.post(this.$api.login,params).then(res=>{
            if(res.code == 200){
              this.$store.commit('SET_INFO',res.data)
              this.$message({
                message: res.msg,
                type: 'success'
              });
              this.$router.push('/index/index')
              }else{
              this.$message.error(res.msg)
            }
            }).catch(err=>{
              console.log(err);
            })
        }
      },
      computed:{

      }
    }
</script>

<style scoped lang="scss" src="@/style/login/login.scss"></style>
<style>
  .el-form-item__label{
    color: #fff;
  }
</style>
