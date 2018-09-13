import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      redirect:'/login',
    },
    {
      path:'/login',
      meta:{
        title:'后台登录'
      },
      component:()=>import('@/views/login/login')
    },
    {
      path:'/index',
      meta:{
        title:'后台管理'
      },
      component:()=>import('@/views/index/index'),
      children:[
        {
        path:'index',
        meta:{
          title:'首页'
        },
        component:()=> import('@/views/user/index')
      },
        {
          path:'users',
          meta:{
            title:'用户列表'
          },
          component:()=> import('@/views/user/users')
        },
        {
          path:'categorylist',
          meta:{
            title:'分类列表'
          },
          component:()=> import('@/views/categry/categorylist')
        },
        {
          path:'addlist',
          meta:{
            title:'添加列表'
          },
          component:()=> import('@/views/categry/addlist')
        },
        {
          path:'admin',
          meta:{
            title:'管理员列表'
          },
          component:()=> import('@/views/admin/index'),
        },
        {
          path:'addAdmin',
          meta:{
            title:'添加管理员'
          },
          component:()=> import('@/views/admin/addaAdmin')
        } ,
        {
          path:'changePassword',
          meta:{
            title:'修改密码'
          },
          component:()=> import('@/views/admin/changePassword')
        },
        {
          path:'changeMyinfo',
          meta:{
            title:'修改个人信息'
          },
          component:()=> import('@/views/admin/changeMyinfo')
        },
        {
          path:'books',
          meta:{
            title:'获取图书'
          },
          component:()=> import('@/views/books/books')
        },
        {
          path:'changeBooks',
          meta:{
            title:'修改图书'
          },
          component:()=> import('@/views/books/changeBooks')
        },
        {
          path:'addBooks',
          meta:{
            title:'添加图书'
          },
          component:()=> import('@/views/books/addBooks')
        },
        {
          path:'oneCategory',
          meta:{
            title:'分类详情'
          },
          component:()=> import('@/views/categry/oneCategory')
        },
        {
          path:'changeList',
          meta:{
            title:'分类详情'
          },
          component:()=> import('@/views/categry/changeList')
        },
        {
          path:'getSwiper',
          meta:{
            title:'轮播图列表'
          },
          component:()=> import('@/views/swiper/getSwiper')
        },
        {
          path:'addSwiper',
          meta:{
            title:'添加轮播图'
          },
          component:()=> import('@/views/swiper/addSwiper')
        },
        {
          path:'changeSwiper',
          meta:{
            title:'修改轮播图'
          },
          component:()=> import('@/views/swiper/changeSwiper')
        }
      ]
    }
  ]
})
 router.beforeEach((to,from,next)=>{
   if (to.meta && to.meta.title) {
     document.title = to.meta.title
   }
   next();
 })
export default router
