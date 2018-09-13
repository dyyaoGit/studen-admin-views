<template>
  <div>
    <h3>修改图书</h3>
    <div class="admin-wrap">
      <div class="item"><span>作者：</span>
        <el-input type="word" v-model="infoData.author"></el-input>
      </div>
      <picup v-model="infoData.img"></picup>
      <div class="item"><span>index：</span>
        <!--<el-input type="email" v-model="infoData.index"></el-input>-->
        <el-input-number v-model="infoData.index" :min="1"></el-input-number>
      </div>
      <div class="item"><span>标题：</span>
        <el-input type="email" v-model="infoData.title"></el-input>
      </div>
      <div class="item"><span>分类：</span>
        <el-select v-model="infoData.type" placeholder="请选择">
          <el-option
            v-for="item in list"
            :key="item.title"
            :label="item.title"
            :value="item._id">
          </el-option>
        </el-select>
      </div>
      <div class="item"><span>描述：</span>
        <el-input type="textarea" v-model="infoData.desc"></el-input>
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
          author: '',
          index: '',
          img: '',
          desc: '',
          type: '',
        },
        list:[]
      }
    },
    components: {picup},
    methods: {
      handleSave() {
        let params = {
          ...this.infoData,
          book_id:this.$route.query.bookId
        }
        this.$axios.put('/book',params).then(res => {
          if (res.code == 200) {
            this.$message.success(res.msg);
            this.$router.push('/index/books')
          }
          this.$message.error(res.msg)
        })
      },
      getbook() {
        let id = this.$route.query.bookId
        this.$axios.get(`/book/${id}`).then(res => {
          this.infoData = res.data
        })
      },
      getCategory() {
        this.$axios.get(this.$api.getLists).then(
          res => {
            console.log(res);
            this.list = res.data
          }
        )
      }
    },
    created() {
      this.getbook()
      this.getCategory()
    }
  }
</script>

<style scoped lang="scss" src="@/style/admin/index.scss"></style>
