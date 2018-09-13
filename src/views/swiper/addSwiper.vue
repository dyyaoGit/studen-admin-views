<template>
  <div>
    <h3>添加轮播图</h3>
    <div class="admin-wrap">
      <div class="item"><span>标题：</span>
        <el-input type="word" v-model="infoData.title"></el-input>
      </div>
      <picup @img="getImg"></picup>
      <div class="item"><span>图书：</span>
        <el-input type="email" v-model="infoData.book"></el-input>
      </div>
      <div class="item"><span>index：</span>
        <el-input type="email" v-model="infoData.index"></el-input>
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
          book: '',
          index: ''
        }
      }
    },
    components: {picup},
    methods: {
      handleSave() {
        this.$axios.get(this.$api.getswiper, this.infoData).then(res => {
          console.log(res);
          if (res.code == 200) {
            this.$message({
              message: res.msg,
              type: 'success'
            });
          }
          this.$message.error(res.msg)
        })
      },
    },
    created() {
    }
  }
</script>

<style scoped lang="scss" src="@/style/admin/index.scss"></style>
