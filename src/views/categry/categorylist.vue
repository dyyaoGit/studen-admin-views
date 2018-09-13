<template>
  <div>
    <h3>分类列表<i title="添加分类" class="el-icon-circle-plus-outline" @click="addAdmin"></i></h3>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        label="头像"
        width="140">
        <template slot-scope="scope">
          <img :src="scope.row.icon">
        </template>
      </el-table-column>
      <el-table-column
        label="类名"
        width="120">
        <template slot-scope="scope">
          <el-tag size="medium" style="cursor: pointer">
            {{ scope.row.title }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="index"
        width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.index }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="typeId"
        width="230">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row._id }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="书的数量"
        width="140">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.books.length }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <el-button
            size="mini"
            @click="handleList(scope.$index, scope.row)">详情
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index,scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-model="pn"></pagination>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [],
        pn:1
      }
    },
    methods: {
      getLists() {
        this.$axios.get(`${this.$api.getLists}`).then(res => {
          console.log(res);
          this.tableData = res.data
        })
      },
      handleEdit(index, row) {
        this.$router.push(`/index/changeList?id=${row._id}`)
      },
      addAdmin() {
        this.$router.push('/index/addList')
      },
      handleDelete(index, row) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.$axios.delete(`/category/${row._id}`).then(res=>{
            if(res.code == 200){
              this.getLists()
              this.$message({
                type: 'success',
                message: res.msg
              });
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      },
      handleList(index, row) {
        this.$router.push(`/index/oneCategory?id=${row._id}`)
      }
    },
    created() {
      this.getLists()
    },
    watch:{
      pn(){
        this.getLists()
      }
    }
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
