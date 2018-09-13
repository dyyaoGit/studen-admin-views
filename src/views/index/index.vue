<template>
  <div class="wrap-tap">
    <div class="nav-tab">
      <el-row class="tac">
        <el-col :span="12">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            background-color="#2d3a4b"
            text-color="#fff"
            :router="true"
            @open="handleOpen"
            @close="handleClose"
            @select="handleSelect"
            active-text-color="#ffd04b">
            <el-submenu index="用户管理">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">用户管理</span>
              </template>
              <el-menu-item-group index="用户列表">
                <el-menu-item index="/index/users">用户列表</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="分类管理">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span slot="title">分类管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/index/categorylist">分类列表</el-menu-item>
                <el-menu-item index="/index/addlist">添加分类</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="管理员用户">
              <template slot="title">
                <i class="el-icon-document"></i>
                <span slot="title">管理员用户</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/index/admin">管理员列表</el-menu-item>
                <el-menu-item index="/index/changePassword">修改密码</el-menu-item>
                <el-menu-item index="/index/changeMyinfo">修改个人信息</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="图书管理">
              <template slot="title">
                <i class="el-icon-setting"></i>
                <span slot="title">图书管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/index/books">图书列表</el-menu-item>
                <el-menu-item index="/index/addBooks">添加图书</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="轮播图管理">
              <template slot="title">
                <i class="el-icon-setting"></i>
                <span slot="title">轮播图管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/index/getSwiper">轮播图列表</el-menu-item>
                <!--<el-menu-item index="/index/addSwiper">添加轮播图</el-menu-item>-->
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-col>
      </el-row>
    </div>
    <div class="top-tab">
      <h2>云书后台管理{{title}}</h2>
      <div class="login-layla">
        <el-dropdown @command="handleCommand">
           <span class="el-dropdown-link">
             <img :src="userInfo.avatar">
             <i class="el-icon-arrow-down el-icon--right"></i>
           </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="1">修改个人信息</el-dropdown-item>
            <el-dropdown-item command="2">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="content">
      <router-view/>
    </div>
  </div>
</template>

<script>
  import {mapState}  from 'vuex'
  export default {
    data() {
      return {
        isCollapse: false,
        title: '',
        text: '',
        path: ''
      };
    },
    methods: {
      handleClose(key, keyPath) {
        this.title = ''
      },
      handleOpen(key, keyPath) {
        this.title = '>' + key
      },
      handleSelect(key, keyPath) {
        this.title = '>' + keyPath[0]
      },
      handleCommand(command) {
        let click = command
        if(click == 1){
          this.$router.push('/index/changeMyinfo')
        }else if(click == 2){
          this.$axios.get('logout').then(res=>{
             if(res.code == 200){
               this.$store.commit('SET_INFO',null)
               this.$router.push('/login')
             }
          })
        }
      }
    },
    beforeRouteUpdate(to, from, next) {
      this.path = to.path
      if (to.meta && to.meta.title) {
        this.text = '>' + to.meta.title
        this.title = this.title + this.text
        // if(!this.title.includes(this.text)){
        //   this.title = this.title + this.text
        // }
      }
      next()
    },
    computed:{
      ...mapState(['userInfo'])
    },
    watch: {
      path() {
        this.title = this.text
      }
    }
  }
</script>

<style scoped lang="scss" src="@/style/index/index.scss"></style>
<style lang="scss">
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
  }
  .el-dropdown-link {
    cursor: pointer;
    img{
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
  }
  .el-icon-arrow-down {
    font-size: 12px;
    color: #fff;
  }
  /*.el-scrollbar__wrap{*/
  /*overflow-x: hidden;*/
  /*}*/
</style>
