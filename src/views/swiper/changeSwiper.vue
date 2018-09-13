<template>
  <div>
    <h3>添加轮播图</h3>
    <div class="admin-wrap">
      <div class="item"><span>标题：</span>
        <el-input type="word" v-model="infoData.title"></el-input>
      </div>
      <picup v-model="infoData.img"></picup>
      <!--<div class="item"><span>图书：</span>-->
        <!--<el-input type="email" v-model="infoData.book._id"></el-input>-->
      <!--</div>-->
      <div class="item"><span>index：</span>
        <el-input-number v-model="infoData.index" :min="1"></el-input-number>
      </div>
      <div class="btn">
        <el-button type="primary" @click="handleSave">确定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import picup from '@/components/pic'

  export default {
    data() {
      return {
        infoData: {
          title: '',
          img: '',
          index: '',
        },
        id:''
      }
    },
    components: {picup},
    methods: {
      getOneSwiper() {
        let id = this.$route.query.id
        this.$axios.get(`/swiper/${id}`).then(res => {
            this.infoData = res.data
          this.id = res.data.book._id
        })
      },
      handleSave(){
        let id = this.$route.query.id
        let params = {
          ...this.infoData,
          book:this.id
        }
         console.log(params.book);
        this.$axios.put(`/swiper/${id}`,params).then(res => {
          if(res.code == 200){
           this.$message.success(res.msg)
            this.$router.push('/index/getSwiper')
          }
        })
      }
    },
    created() {
      this.getOneSwiper()
    }
  }
</script>

<style scoped lang="scss" src="@/style/admin/index.scss"></style>
