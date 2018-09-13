<template>
  <div>
    <h3>添加图书</h3>
    <div class="admin-wrap">
      <div class="item"><span>作者：</span>
        <el-input type="word" v-model="infoData.author"></el-input>
      </div>
      <div class="admin-wrap">
       <div>
         <span>头像：</span>
         <el-switch
           v-model="value"
           active-text="上传图片链接"
           inactive-text="上传图片"
           @change="handleChange"
           style="margin-left: 50px">
         </el-switch>
         <el-input type="text"
                   v-model="infoData.img"
                   v-show="imgs"
                   style="margin-left: 80px;width:416px"
         ></el-input>
         <picup v-model="infoData.img" v-show="!imgs"></picup>
       </div>
      </div>
      <div class="item"><span>链接：</span>
        <el-input type="email" v-model="infoData.url"></el-input>
      </div>
      <div class="item"><span>分类：</span>
        <el-select v-model="infoData.typeId" placeholder="请选择">
          <el-option
            v-for="item in list"
            :key="item.title"
            :label="item.title"
            :value="item._id">
          </el-option>
        </el-select>
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
          img: '',
          typeId: '',
          url: ''
        },
        list:[],
        value:true,
        imgs:true
      }
    },
    components: {picup},
    methods: {
      getCategory() {
        this.$axios.get(this.$api.getLists).then(
          res => {
            console.log(res);
            this.list = res.data
          }
        )
      },
      handleChange(val){
        this.value = val
        this.imgs = val
      },
      handleSave() {
        this.$axios.post(this.$api.book, this.infoData).then(res => {
          console.log(res);
          if (res.code == 200) {
            this.$message.success(res.msg);
            this.$router.push('/index/books')
          }
          this.$message.error(res.msg)
        })
      },
    },
    created() {
      this.getCategory();
    }
  }
</script>

<style scoped lang="scss" src="@/style/admin/index.scss"></style>
