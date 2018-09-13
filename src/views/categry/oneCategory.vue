<template>
  <div>
    <h3>分类图书列表<i title="添加分类" class="el-icon-circle-plus-outline" @click="addAdmin"></i></h3>
    <h4>{{title}}</h4>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        label="头像"
        width="180">
        <template slot-scope="scope">
          <el-popover placement="top">
            <div slot="reference" class="name-wrapper">
              <img :src="scope.row.img">
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        label="作者"
        width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>姓名: {{ scope.row.author }}</p>
            <p>描述: {{ scope.row.desc }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.author }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        label="创建日期"
        width="250">
        <template slot-scope="scope">
          <span style="margin-left: 10px">
            <i class="el-icon-time"></i>
            <timer :time="scope.row.createTime"
                   style="float: right"></timer></span>
        </template>
      </el-table-column>
      <el-table-column
        label="index"
        width="180">
        <template slot-scope="scope">
          <i class="el-icon-message"></i>
          <span style="margin-left: 10px">{{ scope.row.index }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleSwiper(scope.$index,scope.row)">生成轮播图
          </el-button>
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index,scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import timer from '../../components/timer'

  export default {
    components: {timer},
    data() {
      return {
        tableData: [],
        title: ''
      }
    },
    methods: {
      getLists() {
        let id = this.$route.query.id
        this.$axios.get(`/category/${id}`).then(res => {
          console.log(res);
        })
      },
      getBooks() {
        let id = this.$route.query.id
        this.$axios.get(`/category/${id}/books`).then(res => {
          this.tableData = res.data.books
          this.title = res.data.title
        })
      },
      handleEdit(index, row) {
        console.log(index, row);
        this.$router.push(`/index/changeBooks?bookId=${row._id}`)
      },
      addAdmin() {
        this.$router.push('/index/addBooks')
      },
      handleDelete(index, row) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          let id = this.$route.query.id
          this.$axios.delete(`/category/${id}/book/${row._id}`).then(res => {
            if (res.code == 200) {
              this.$message({
                type:'success',
                message: res.msg
              });
              this.getBooks()
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      },
      handleList() {

      },
      handleSwiper(index, row) {
        console.log(row);
        let params = {
          title: row.title,
          img: row.img,
          book: row._id,
          index: row.index
        }
        console.log(params);
        this.$axios.post(this.$api.getswiper,params).then(res=>{
          if(res.code == 200){
            this.$message.success(res.msg)
            this.$router.push('/index/getSwiper')
          }else{
            this.$message.error(res.msg)
          }
        })
      }
    },
    created() {
      this.getLists()
      this.getBooks()
    },
  }
</script>
<style scoped lang="scss">
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }

  h3 {
    i {
      margin-left: 20px;
      font-size: 20px;
      color: #888;
      vertical-align: middle;
    }
  }
</style>
<style>
  .el-table {
    text-align: center;
  }

  .el-table th > .cell {
    text-align: center;
  }
</style>
